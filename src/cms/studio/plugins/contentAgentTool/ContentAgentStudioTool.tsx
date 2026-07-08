"use client"

import { useCallback, useEffect, useState } from "react"
import { SparklesIcon, SearchIcon, CogIcon, EditIcon, CheckmarkCircleIcon } from "@sanity/icons"
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Label,
  Select,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Text,
  TextArea,
  TextInput,
  useToast,
} from "@sanity/ui"
import { useRouter } from "sanity/router"

import { BLOG_LAYOUT_RECIPES, type BlogLayoutRecipeId } from "@/lib/blog-layout-recipes"
import { studioApiUrl, studioFetchInit } from "@/cms/lib/studio/studioFetch"
import type { AiSystemsAuditResult } from "@/cms/lib/aiSystemsAudit"

type PipelineResult = {
  ok: boolean
  documentId?: string
  slug?: string
  url?: string
  title?: string
  layoutRecipe?: string
  error?: string
  step?: string
  arena?: { winnerId: string; rationale: string }
}

type AuditDoc = {
  _id: string
  _type: string
  title?: string
  slug?: string
  faqCount?: number
}

type AuditPayload = {
  ok: boolean
  missingMeta?: AuditDoc[]
  missingFaq?: AuditDoc[]
  missingAlt?: AuditDoc[]
  error?: string
}

type PipelineStatus = {
  ok: boolean
  ready?: boolean
  contentPipelineSecret?: boolean
  sanityWriteToken?: boolean
  perplexityResearch?: boolean
  llmReady?: boolean
  llm?: {
    llmProvider?: string
    gemini?: { configured?: boolean }
    nvidia?: { configured?: boolean }
    anthropic?: { configured?: boolean }
  }
}

type MarketTopicSuggestion = {
  topic: string
  category: string
  trend: 'rising' | 'stable' | 'seasonal'
  rationale: string
  asOf: string
}

type TopicSuggestionsPayload = {
  ok: boolean
  topics?: MarketTopicSuggestion[]
  source?: 'live-research' | 'editorial-fallback'
  refreshedAt?: string
  error?: string
}

type AiContextStatus = {
  ok: boolean
  hasDefaultDocument?: boolean
  documentId?: string | null
  title?: string | null
  usesBundledFallback?: boolean
  preview?: string
}

function studioApi(path: string) {
  return studioApiUrl(path)
}

function trendLabel(trend: MarketTopicSuggestion['trend']): string {
  if (trend === 'rising') return 'Rising'
  if (trend === 'seasonal') return 'Seasonal'
  return 'Stable'
}

function trendTone(trend: MarketTopicSuggestion['trend']): 'positive' | 'caution' | 'primary' {
  if (trend === 'rising') return 'positive'
  if (trend === 'seasonal') return 'caution'
  return 'primary'
}

export default function ContentAgentStudioTool() {
  const toast = useToast()
  const router = useRouter()
  const [tab, setTab] = useState<"generate" | "audit" | "systems">("generate")

  const [topic, setTopic] = useState("")
  const [layoutRecipe, setLayoutRecipe] = useState<BlogLayoutRecipeId | "">("")
  const [autoPublish, setAutoPublish] = useState(false)
  const [generateImages, setGenerateImages] = useState(true)
  const [useArena, setUseArena] = useState(false)
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<PipelineResult | null>(null)

  const [topicSuggestions, setTopicSuggestions] = useState<TopicSuggestionsPayload | null>(null)
  const [topicsLoading, setTopicsLoading] = useState(false)

  const [audit, setAudit] = useState<AuditPayload | null>(null)
  const [auditLoading, setAuditLoading] = useState(false)
  const [pipelineStatus, setPipelineStatus] = useState<PipelineStatus | null>(null)
  const [aiContext, setAiContext] = useState<AiContextStatus | null>(null)
  const [systemsAudit, setSystemsAudit] = useState<AiSystemsAuditResult | null>(null)
  const [systemsLoading, setSystemsLoading] = useState(false)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ""

  const loadStatus = useCallback(async () => {
    try {
      const [pipeRes, ctxRes] = await Promise.all([
        fetch(studioApi("/api/studio/pipeline-status"), studioFetchInit()),
        fetch(studioApi("/api/studio/ai-context-status"), studioFetchInit()),
      ])
      setPipelineStatus((await pipeRes.json()) as PipelineStatus)
      setAiContext((await ctxRes.json()) as AiContextStatus)
    } catch {
      /* non-blocking */
    }
  }, [])

  useEffect(() => {
    void loadStatus()
  }, [loadStatus])

  const loadTopicSuggestions = useCallback(async () => {
    setTopicsLoading(true)
    try {
      const res = await fetch(
        studioApi("/api/studio/content-pipeline/topic-suggestions"),
        studioFetchInit(),
      )
      const json = (await res.json()) as TopicSuggestionsPayload
      setTopicSuggestions(json)
      if (!json.ok) {
        toast.push({ status: "warning", title: json.error || "Could not refresh market topics" })
      }
    } catch (err) {
      toast.push({
        status: "warning",
        title: err instanceof Error ? err.message : "Could not refresh market topics",
      })
    } finally {
      setTopicsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    if (tab === "generate") void loadTopicSuggestions()
  }, [tab, loadTopicSuggestions])

  const loadAudit = useCallback(async () => {
    setAuditLoading(true)
    try {
      const res = await fetch(studioApi("/api/studio/content-audit"), studioFetchInit())
      const json = (await res.json()) as AuditPayload
      setAudit(json)
      if (!json.ok) {
        toast.push({ status: "error", title: json.error || "Audit failed" })
      }
    } catch (err) {
      toast.push({
        status: "error",
        title: err instanceof Error ? err.message : "Audit failed",
      })
    } finally {
      setAuditLoading(false)
    }
  }, [toast])

  useEffect(() => {
    if (tab === "audit") loadAudit()
  }, [tab, loadAudit])

  const loadSystemsAudit = useCallback(async () => {
    setSystemsLoading(true)
    try {
      const res = await fetch(studioApi("/api/studio/ai-systems-audit"), studioFetchInit())
      const json = (await res.json()) as AiSystemsAuditResult & { error?: string }
      setSystemsAudit(json)
      if (!json.ok) {
        toast.push({ status: "error", title: json.error || "Systems audit failed" })
      }
    } catch (err) {
      toast.push({
        status: "error",
        title: err instanceof Error ? err.message : "Systems audit failed",
      })
    } finally {
      setSystemsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    if (tab === "systems") loadSystemsAudit()
  }, [tab, loadSystemsAudit])

  const runPipeline = async (overrides?: {
    useArena?: boolean
    generateImages?: boolean
  }) => {
    if (pipelineStatus && !pipelineStatus.ready) {
      toast.push({
        status: "warning",
        title: "Pipeline not configured",
        description: "Add CONTENT_PIPELINE_SECRET, SANITY_API_WRITE_TOKEN, and an LLM API key.",
      })
      return
    }

    const arena = overrides?.useArena ?? useArena
    const images = overrides?.generateImages ?? generateImages

    setRunning(true)
    setResult(null)
    try {
      const res = await fetch(
        studioApi("/api/studio/content-pipeline/run"),
        studioFetchInit("POST", {
          topic: topic.trim() || undefined,
          autoPublish,
          generateImages: images,
          useArena: arena,
          layoutRecipe: layoutRecipe || undefined,
        }),
      )
      const json = (await res.json()) as PipelineResult
      setResult(json)
      if (json.ok) {
        toast.push({ status: "success", title: `Created: ${json.title}` })
      } else {
        toast.push({
          status: "error",
          title: json.error || `Pipeline failed (${res.status})`,
          description: json.step ? `Step: ${json.step}` : undefined,
        })
      }
    } catch (err) {
      toast.push({
        status: "error",
        title: err instanceof Error ? err.message : "Pipeline failed",
      })
    } finally {
      setRunning(false)
    }
  }

  const openInStudio = (id: string, type: string) => {
    router.navigateIntent("edit", { id: id.replace(/^drafts\./, ""), type })
  }

  const openBlogNeedsWork = () => {
    router.navigateUrl({ path: "/studio/structure/blog;postsNeedsWork" })
  }

  const openAiContext = () => {
    if (aiContext?.documentId) {
      openInStudio(aiContext.documentId, "aiContext")
      return
    }
    router.navigateUrl({ path: "/studio/structure/siteSettings;aiContext" })
  }

  const openLivePreview = (slug: string) => {
    const base = siteUrl || window.location.origin
    const url = `${base}/api/draft-mode/enable?redirect=${encodeURIComponent(`/blog/${slug}`)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const renderAuditList = (label: string, items: AuditDoc[] | undefined) => (
    <Stack space={3}>
      <Text size={1} weight="semibold">
        {label} ({items?.length ?? 0})
      </Text>
      {(items?.length ?? 0) === 0 ? (
        <Text muted size={1}>
          None — looking good.
        </Text>
      ) : (
        items?.map((doc) => (
          <Card key={doc._id} padding={3} radius={2} shadow={1}>
            <Flex align="center" justify="space-between" gap={3}>
              <Stack space={2}>
                <Text size={1} weight="medium">
                  {doc.title || "Untitled"}
                </Text>
                <Text muted size={1}>
                  {doc._type}
                  {doc.faqCount != null ? ` · ${doc.faqCount} FAQ` : ""}
                </Text>
              </Stack>
              <Button
                fontSize={1}
                mode="ghost"
                text="Open"
                onClick={() => openInStudio(doc._id, doc._type)}
              />
            </Flex>
          </Card>
        ))
      )}
    </Stack>
  )

  const pipelineReady = pipelineStatus?.ready !== false

  return (
    <Box padding={4} sizing="border" style={{ maxWidth: 760, margin: "0 auto" }}>
      <Stack space={4}>
        <Stack space={2}>
          <Text size={3} weight="semibold">
            Content Agent
          </Text>
          <Text muted size={1}>
            One-click AI blog drafts (Blog posts — not case studies) using your brand voice,
            composer sections, SEO metadata, and optional featured images. Approve in Studio before
            publishing to the live site.
          </Text>
        </Stack>

        <Card padding={4} radius={2} shadow={1} tone={pipelineReady ? "positive" : "caution"}>
          <Stack space={3}>
            <Flex align="center" justify="space-between" gap={3} wrap="wrap">
              <Text size={1} weight="semibold">
                {pipelineReady ? "Pipeline ready" : "Pipeline needs setup"}
              </Text>
              <Button icon={CogIcon} mode="ghost" text="Refresh status" onClick={loadStatus} />
            </Flex>
            {!pipelineReady && pipelineStatus ? (
              <Text size={1} muted>
                Missing:{" "}
                {[
                  !pipelineStatus.contentPipelineSecret && "CONTENT_PIPELINE_SECRET",
                  !pipelineStatus.sanityWriteToken && "SANITY_API_WRITE_TOKEN",
                  !pipelineStatus.llmReady && "LLM API key (Gemini / NVIDIA / Anthropic)",
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </Text>
            ) : null}
            {pipelineStatus?.llm?.llmProvider ? (
              <Text size={1} muted>
                LLM provider: {pipelineStatus.llm.llmProvider}
                {pipelineStatus.perplexityResearch
                  ? " · Live market research (Perplexity)"
                  : " · Market topics use editorial fallback (add PERPLEXITY_API_KEY for live trends)"}
              </Text>
            ) : null}
          </Stack>
        </Card>

        <Card padding={4} radius={2} shadow={1}>
          <Stack space={3}>
            <Flex align="center" justify="space-between" gap={3} wrap="wrap">
              <Text size={1} weight="semibold">
                AI brand voice
              </Text>
              <Button icon={EditIcon} mode="ghost" text="Edit context" onClick={openAiContext} />
            </Flex>
            <Text size={1} muted>
              {aiContext?.usesBundledFallback
                ? "Using bundled Softree style guide — add your own in Site settings → AI brand voice for richer output."
                : aiContext?.title
                  ? `Loaded: ${aiContext.title}`
                  : "Loading brand context…"}
            </Text>
            {aiContext?.preview ? (
              <TextArea readOnly rows={3} value={aiContext.preview} />
            ) : null}
            <Text size={1} muted>
              Field-level ✨ AI Assist in the editor uses the same context automatically.
            </Text>
          </Stack>
        </Card>

        <TabList space={2}>
          <Tab
            aria-controls="generate-panel"
            id="generate-tab"
            label="Generate"
            icon={SparklesIcon}
            selected={tab === "generate"}
            onClick={() => setTab("generate")}
          />
          <Tab
            aria-controls="audit-panel"
            id="audit-tab"
            label="Content audit"
            icon={SearchIcon}
            selected={tab === "audit"}
            onClick={() => setTab("audit")}
          />
          <Tab
            aria-controls="systems-panel"
            id="systems-tab"
            label="AI systems"
            icon={CheckmarkCircleIcon}
            selected={tab === "systems"}
            onClick={() => setTab("systems")}
          />
        </TabList>

        {tab === "generate" ? (
          <TabPanel aria-labelledby="generate-tab" id="generate-panel">
            <Stack space={4}>
              <Card padding={3} radius={2} shadow={1}>
                <Stack space={2}>
                  <Text size={1} weight="medium">
                    Writer flow
                  </Text>
                  <Text size={1} muted>
                    1. Pick a market topic → 2. Run pipeline → 3. Open draft under{" "}
                    <strong>Blog → Needs work</strong> → 4. Set Review status to{" "}
                    <strong>Approved</strong> → 5. Publish
                  </Text>
                  <Text size={1} muted>
                    Arena + featured images can take 2–4 minutes. Use Quick draft for a ~30s smoke
                    test.
                  </Text>
                </Stack>
              </Card>

              <Card padding={3} radius={2} shadow={1} tone="transparent">
                <Stack space={3}>
                  <Flex align="center" justify="space-between" gap={3} wrap="wrap">
                    <Stack space={2}>
                      <Text size={1} weight="semibold">
                        Topics aligned to market trends
                      </Text>
                      <Text size={1} muted>
                        {topicSuggestions?.source === "live-research"
                          ? "Refreshed from recent enterprise Microsoft news and search demand."
                          : "Editorial fallback topics — add PERPLEXITY_API_KEY for live trend research."}
                        {topicSuggestions?.refreshedAt
                          ? ` · Updated ${new Date(topicSuggestions.refreshedAt).toLocaleString()}`
                          : null}
                      </Text>
                    </Stack>
                    <Button
                      disabled={topicsLoading}
                      icon={topicsLoading ? Spinner : SparklesIcon}
                      mode="ghost"
                      text="Refresh trends"
                      onClick={loadTopicSuggestions}
                    />
                  </Flex>
                  <Stack space={2}>
                    {(topicSuggestions?.topics?.length ?? 0) === 0 ? (
                      <Text muted size={1}>
                        {topicsLoading ? "Loading market topics…" : "No topic suggestions yet."}
                      </Text>
                    ) : (
                      topicSuggestions?.topics?.map((hint) => (
                        <Card key={hint.topic} padding={3} radius={2} shadow={1}>
                          <Stack space={2}>
                            <Flex align="center" gap={2} wrap="wrap">
                              <Card padding={2} radius={2} tone={trendTone(hint.trend)}>
                                <Text size={0} weight="semibold">
                                  {trendLabel(hint.trend)}
                                </Text>
                              </Card>
                              <Card padding={2} radius={2} tone="default">
                                <Text size={0}>{hint.category}</Text>
                              </Card>
                              <Text muted size={0}>
                                {hint.asOf}
                              </Text>
                            </Flex>
                            <Button
                              fontSize={1}
                              mode="bleed"
                              text={hint.topic}
                              onClick={() => setTopic(hint.topic)}
                            />
                            <Text muted size={1}>
                              {hint.rationale}
                            </Text>
                          </Stack>
                        </Card>
                      ))
                    )}
                  </Stack>
                </Stack>
              </Card>

              <Stack space={3}>
                <Label htmlFor="topic">Topic (optional)</Label>
                <TextInput
                  id="topic"
                  placeholder="Leave empty to let AI pick from current market trends"
                  value={topic}
                  onChange={(e) => setTopic(e.currentTarget.value)}
                />
              </Stack>

              <Flex gap={2} wrap="wrap">
                <Button
                  fontSize={1}
                  mode="ghost"
                  text="Quick draft (~30s)"
                  onClick={() => {
                    setUseArena(false)
                    setGenerateImages(false)
                    void runPipeline({ useArena: false, generateImages: false })
                  }}
                />
                <Button
                  fontSize={1}
                  mode="ghost"
                  text="Full quality (Arena + image)"
                  onClick={() => {
                    setUseArena(true)
                    setGenerateImages(true)
                  }}
                />
              </Flex>

              <Stack space={3}>
                <Label htmlFor="recipe">Layout recipe</Label>
                <Select
                  id="recipe"
                  value={layoutRecipe}
                  onChange={(e) =>
                    setLayoutRecipe(e.currentTarget.value as BlogLayoutRecipeId | "")
                  }
                >
                  <option value="">Auto-detect from topic</option>
                  {BLOG_LAYOUT_RECIPES.map((recipe) => (
                    <option key={recipe.id} value={recipe.id}>
                      {recipe.title}
                    </option>
                  ))}
                </Select>
              </Stack>

              <Flex gap={4} wrap="wrap">
                <Checkbox
                  checked={useArena}
                  label="Content Arena (3 personas + judge)"
                  onChange={(e) => setUseArena(e.currentTarget.checked)}
                />
                <Checkbox
                  checked={generateImages}
                  label="Generate featured image"
                  onChange={(e) => setGenerateImages(e.currentTarget.checked)}
                />
                <Checkbox
                  checked={autoPublish}
                  label="Publish immediately (skip review)"
                  onChange={(e) => setAutoPublish(e.currentTarget.checked)}
                />
              </Flex>

              <Button
                disabled={running}
                icon={running ? Spinner : SparklesIcon}
                text={running ? "Generating… (may take several minutes)" : "Run pipeline"}
                tone="primary"
                onClick={() => runPipeline()}
              />

              {running ? (
                <Card padding={3} radius={2} tone="primary">
                  <Text size={1} muted>
                    Pipeline running — research, writing
                    {useArena ? ", Content Arena (3 personas + judge)" : ""}
                    {generateImages ? ", and image generation" : ""}. Keep this tab open until
                    complete.
                  </Text>
                </Card>
              ) : null}

              {result ? (
                <Card padding={4} radius={2} tone={result.ok ? "positive" : "critical"}>
                  {result.ok ? (
                    <Stack space={3}>
                      <Text weight="semibold">{result.title}</Text>
                      <Text size={1} muted>
                        Saved as a <strong>blog draft</strong> — find it under Blog → Needs work,
                        not Case studies.
                      </Text>
                      <Text size={1} muted>
                        Recipe: {result.layoutRecipe} · Slug: {result.slug}
                      </Text>
                      <Card padding={3} radius={2} tone="caution">
                        <Stack space={2}>
                          <Text size={1} weight="medium">
                            Before you can Publish on production
                          </Text>
                          <Text size={1} muted>
                            1. Open the draft · 2. Review content & SEO · 3. Set Review status to{" "}
                            <strong>Approved</strong> · 4. Click Publish
                          </Text>
                        </Stack>
                      </Card>
                      {result.arena ? (
                        <TextArea
                          readOnly
                          rows={3}
                          value={`Arena winner: ${result.arena.winnerId}\n${result.arena.rationale}`}
                        />
                      ) : null}
                      <Flex gap={2} wrap="wrap">
                        {result.documentId ? (
                          <Button
                            text="Open draft"
                            tone="primary"
                            onClick={() =>
                              result.documentId && openInStudio(result.documentId, "post")
                            }
                          />
                        ) : null}
                        <Button
                          text="Blog → Needs work"
                          mode="ghost"
                          onClick={openBlogNeedsWork}
                        />
                        {result.slug ? (
                          <Button
                            text="Preview on site"
                            mode="ghost"
                            onClick={() => result.slug && openLivePreview(result.slug)}
                          />
                        ) : null}
                      </Flex>
                    </Stack>
                  ) : (
                    <Stack space={2}>
                      <Text>{result.error || "Pipeline failed"}</Text>
                      {result.step ? (
                        <Text size={1} muted>
                          Failed at: {result.step}
                        </Text>
                      ) : null}
                      <Text size={1} muted>
                        Try Quick draft (Arena off, no image) to verify setup. Full quality runs
                        take 2–4 minutes — keep this tab open.
                      </Text>
                    </Stack>
                  )}
                </Card>
              ) : null}
            </Stack>
          </TabPanel>
        ) : tab === "audit" ? (
          <TabPanel aria-labelledby="audit-tab" id="audit-panel">
            <Stack space={4}>
              <Text size={1} muted>
                Published case studies and blogs missing meta, FAQ (including composer FAQ sections),
                or cover alt text.
              </Text>
              <Flex align="center" justify="space-between">
                <Text size={1} muted>
                  Fix gaps before they hurt SEO and AI answer visibility.
                </Text>
                <Button
                  disabled={auditLoading}
                  icon={auditLoading ? Spinner : SearchIcon}
                  mode="ghost"
                  text="Refresh"
                  onClick={loadAudit}
                />
              </Flex>
              {renderAuditList("Missing meta title or description", audit?.missingMeta)}
              {renderAuditList("Missing FAQ (AEO — needs 2+)", audit?.missingFaq)}
              {renderAuditList("Missing cover alt text", audit?.missingAlt)}
            </Stack>
          </TabPanel>
        ) : (
          <TabPanel aria-labelledby="systems-tab" id="systems-panel">
            <Stack space={4}>
              <Flex align="center" justify="space-between">
                <Text size={1} muted>
                  Audits Content Agent, brand voice, image API, case study layouts, and field
                  autocomplete.
                </Text>
                <Button
                  disabled={systemsLoading}
                  icon={systemsLoading ? Spinner : CheckmarkCircleIcon}
                  mode="ghost"
                  text="Refresh"
                  onClick={loadSystemsAudit}
                />
              </Flex>
              {systemsAudit ? (
                <>
                  <Card padding={3} radius={2} tone={systemsAudit.score >= 80 ? "positive" : systemsAudit.score >= 60 ? "caution" : "critical"}>
                    <Text weight="semibold">
                      Score: {systemsAudit.score}% — {systemsAudit.summary}
                    </Text>
                  </Card>
                  <Stack space={2}>
                    {systemsAudit.checks.map((check) => (
                      <Card key={check.id} padding={3} radius={2} shadow={1}>
                        <Stack space={2}>
                          <Text size={1} weight="medium">
                            {check.status === "pass" ? "✓" : check.status === "warn" ? "!" : "✗"}{" "}
                            {check.name}
                          </Text>
                          <Text size={1} muted>
                            {check.message}
                          </Text>
                          {check.fixPath && check.fixLabel ? (
                            <Button
                              fontSize={1}
                              mode="bleed"
                              text={check.fixLabel}
                              onClick={() => {
                                if (check.fixPath?.includes("aiContext")) openAiContext()
                                else if (check.fixPath)
                                  router.navigateUrl({ path: check.fixPath })
                              }}
                            />
                          ) : null}
                        </Stack>
                      </Card>
                    ))}
                  </Stack>
                </>
              ) : systemsLoading ? (
                <Flex align="center" gap={2}>
                  <Spinner />
                  <Text muted>Running AI systems audit…</Text>
                </Flex>
              ) : null}
            </Stack>
          </TabPanel>
        )}
      </Stack>
    </Box>
  )
}
