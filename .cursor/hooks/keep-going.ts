#!/usr/bin/env bun

// Registered as a "stop" hook in .cursor/hooks.json.
// Cursor calls this every time the agent tries to end its turn.
//
// Cursor's documented common hook schema includes conversation_id,
// generation_id, model, hook_event_name, cursor_version, workspace_roots,
// user_email, and transcript_path. It does not guarantee status/loop_count,
// so this hook tracks iterations and progress per conversation_id on disk.

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

const MAX_ITERATIONS = 12
const STAGNATION_WINDOW = 2
const SCRATCHPAD = join(process.cwd(), ".cursor", "scratchpad.md")
const STATE_DIR = join(process.cwd(), ".cursor", "hooks", "state")

type StopHookInput = {
  conversation_id?: string
  generation_id?: string
  model?: string
  hook_event_name?: string
  cursor_version?: string
  workspace_roots?: string[]
  user_email?: string | null
  transcript_path?: string | null
}

type ConversationState = {
  iterations: number
  history: number[]
  forceAllowNextStop?: boolean
}

function safeConversationId(conversationId: string): string {
  return conversationId.replace(/[^a-zA-Z0-9._-]/g, "_")
}

function statePath(conversationId: string): string {
  return join(STATE_DIR, `${safeConversationId(conversationId)}.json`)
}

function loadState(conversationId: string): ConversationState {
  const path = statePath(conversationId)
  if (!existsSync(path)) return { iterations: 0, history: [] }

  try {
    return JSON.parse(readFileSync(path, "utf8")) as ConversationState
  } catch {
    return { iterations: 0, history: [] }
  }
}

function saveState(conversationId: string, state: ConversationState) {
  mkdirSync(STATE_DIR, { recursive: true })
  writeFileSync(statePath(conversationId), `${JSON.stringify(state, null, 2)}\n`)
}

function clearState(conversationId: string) {
  const path = statePath(conversationId)
  if (existsSync(path)) rmSync(path)
}

function ensureScratchpad() {
  if (existsSync(SCRATCHPAD)) return

  mkdirSync(dirname(SCRATCHPAD), { recursive: true })
  writeFileSync(
    SCRATCHPAD,
    [
      "# Task Checklist",
      "",
      "Replace this placeholder with concrete, independently-verifiable completion criteria.",
      "",
    ].join("\n"),
  )
}

function countChecklist(text: string) {
  const checked = text.match(/^\s*-\s*\[[xX]\]\s+\S.*$/gm)?.length ?? 0
  const unchecked = text.match(/^\s*-\s*\[\s\]\s+\S.*$/gm)?.length ?? 0
  return { checked, unchecked, total: checked + unchecked }
}

async function readStdin(): Promise<string> {
  return await new Promise((resolve) => {
    let input = ""
    process.stdin.setEncoding("utf8")
    process.stdin.on("data", (chunk) => {
      input += chunk
    })
    process.stdin.on("end", () => resolve(input))
    process.stdin.on("error", () => resolve(input))
  })
}

function allowStop() {
  process.stdout.write("{}")
}

function followup(message: string) {
  process.stdout.write(JSON.stringify({ followup_message: message }))
}

const raw = await readStdin()
let input: StopHookInput = {}

try {
  input = raw.trim() ? (JSON.parse(raw) as StopHookInput) : {}
} catch {
  allowStop()
  process.exit(0)
}

if (input.hook_event_name && input.hook_event_name !== "stop") {
  allowStop()
  process.exit(0)
}

const conversationId = input.conversation_id || "default"
const state = loadState(conversationId)

if (state.forceAllowNextStop) {
  clearState(conversationId)
  allowStop()
  process.exit(0)
}

ensureScratchpad()

const text = readFileSync(SCRATCHPAD, "utf8")
const counts = countChecklist(text)

if (counts.total === 0) {
  followup(
    [
      "You are not allowed to stop yet.",
      "",
      "Create a real checklist in `.cursor/scratchpad.md` with concrete, independently-verifiable completion criteria for this task.",
      "Use `- [ ]` items. Do not mark an item checked until it is verified with a tool result, file path, test/lint/build output, route check, screenshot/diff artifact, or explicit user evidence.",
      "After writing the checklist, continue working through it.",
    ].join("\n"),
  )
  process.exit(0)
}

state.iterations += 1
state.history.push(counts.checked)
saveState(conversationId, state)

if (counts.unchecked === 0) {
  clearState(conversationId)
  allowStop()
  process.exit(0)
}

if (state.iterations >= MAX_ITERATIONS) {
  state.forceAllowNextStop = true
  saveState(conversationId, state)
  followup(
    [
      `Iteration budget (${MAX_ITERATIONS}) reached.`,
      `Checklist is still incomplete (${counts.checked}/${counts.total}).`,
      "Stop working now. Write a short status note at the top of `.cursor/scratchpad.md`: what is done, what is not, and why. Then end your turn.",
    ].join("\n"),
  )
  process.exit(0)
}

const recent = state.history.slice(-STAGNATION_WINDOW)
const stagnant =
  recent.length === STAGNATION_WINDOW && recent.every((value) => value === recent[0])

if (stagnant) {
  state.forceAllowNextStop = true
  saveState(conversationId, state)
  followup(
    [
      `Progress has been stuck at ${counts.checked}/${counts.total} for ${STAGNATION_WINDOW} iterations.`,
      "Stop retrying the same approach. Write in `.cursor/scratchpad.md` exactly what blocks the remaining items and what is needed to unblock it, then end your turn.",
    ].join("\n"),
  )
  process.exit(0)
}

followup(
  [
    `[Iteration ${state.iterations}/${MAX_ITERATIONS}] ${counts.checked}/${counts.total} checklist items verified in \`.cursor/scratchpad.md\`.`,
    "Continue on the unchecked items. Do not mark an item checked unless you actually ran or verified it this turn.",
  ].join("\n"),
)
