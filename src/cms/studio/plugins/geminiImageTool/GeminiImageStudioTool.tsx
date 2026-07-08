"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { ImageIcon } from "@sanity/icons"
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Label,
  Select,
  Spinner,
  Stack,
  Text,
  TextArea,
  useToast,
} from "@sanity/ui"
import { useClient } from "sanity"
import { apiVersion } from "@/cms/env"
import { studioApiUrl, studioFetchInit } from "@/cms/lib/studio/studioFetch"
import {
  GEMINI_ASPECT_RATIOS,
  GEMINI_PROMPT_TEMPLATES,
} from "./promptTemplates"

type GeneratedImage = {
  imageData: string
  mimeType: string
}

type CatalogModel = {
  id: string
  provider: "gemini" | "nvidia"
  modelId: string
  label: string
  description: string
  capabilities: string[]
  available: boolean
}

type CatalogResponse = {
  providers: Array<{
    id: "gemini" | "nvidia"
    label: string
    configured: boolean
    envVars: string[]
  }>
  models: CatalogModel[]
}

function resolveApiUrl(path: string): string {
  if (typeof window === "undefined") return path
  return `${window.location.origin}${path}`
}

function base64ToBlob(base64: string, mimeType: string): Blob {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new Blob([bytes], { type: mimeType })
}

const FALLBACK_MODELS: CatalogModel[] = [
  {
    id: "gemini-2.5-flash-image",
    provider: "gemini",
    modelId: "gemini-2.5-flash-image",
    label: "Gemini 2.5 Flash Image",
    description: "Fast default",
    capabilities: ["text-to-image", "image-edit"],
    available: true,
  },
]

export default function GeminiImageStudioTool() {
  const client = useClient({ apiVersion })
  const toast = useToast()

  const [catalog, setCatalog] = useState<CatalogResponse | null>(null)
  const [catalogLoading, setCatalogLoading] = useState(true)

  const [provider, setProvider] = useState<"gemini" | "nvidia">("gemini")
  const [modelKey, setModelKey] = useState("gemini-2.5-flash-image")
  const [prompt, setPrompt] = useState("")
  const [aspectRatio, setAspectRatio] = useState<string>("16:9")
  const [templateKey, setTemplateKey] = useState("")
  const [generating, setGenerating] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<GeneratedImage | null>(null)
  const [assetId, setAssetId] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(studioApiUrl("/api/studio/generate-image"), studioFetchInit())
        if (!res.ok) throw new Error("Could not load model catalog")
        const data = (await res.json()) as CatalogResponse
        if (!cancelled) setCatalog(data)
      } catch {
        if (!cancelled) setCatalog(null)
      } finally {
        if (!cancelled) setCatalogLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const models = catalog?.models ?? FALLBACK_MODELS
  const providers = catalog?.providers ?? [
    {
      id: "gemini" as const,
      label: "Google Gemini",
      configured: true,
      envVars: ["GEMINI_API_KEY", "GOOGLE_GENAI_API_KEY"],
    },
    {
      id: "nvidia" as const,
      label: "NVIDIA NIM",
      configured: false,
      envVars: ["NVIDIA_API_KEY", "NVAPI_API_KEY"],
    },
  ]

  const providerModels = useMemo(
    () =>
      models.filter(
        (m) =>
          m.provider === provider &&
          m.capabilities.includes("text-to-image"),
      ),
    [models, provider],
  )

  const selectedModel = useMemo(
    () => models.find((m) => m.id === modelKey),
    [models, modelKey],
  )

  const providerConfigured = useMemo(() => {
    const gemini = providers.find((p) => p.id === "gemini")
    const nvidia = providers.find((p) => p.id === "nvidia")
    if (provider === "gemini") {
      return Boolean(gemini?.configured || nvidia?.configured)
    }
    return Boolean(nvidia?.configured)
  }, [providers, provider])

  useEffect(() => {
    const first =
      providerModels.find((m) => m.available) ?? providerModels[0]
    if (first && !providerModels.some((m) => m.id === modelKey)) {
      setModelKey(first.id)
    }
  }, [provider, providerModels, modelKey])

  const templateOptions = useMemo(
    () => [
      { value: "", label: "Choose a template…" },
      ...GEMINI_PROMPT_TEMPLATES.map((t) => ({
        value: t.title,
        label: t.title,
      })),
    ],
    [],
  )

  const applyTemplate = useCallback((title: string) => {
    const template = GEMINI_PROMPT_TEMPLATES.find((t) => t.title === title)
    if (!template) return
    setPrompt(template.prompt)
    setAspectRatio(template.aspectRatio)
    setTemplateKey(title)
    setResult(null)
    setAssetId(null)
  }, [])

  const generate = useCallback(async () => {
    const trimmed = prompt.trim()
    if (!trimmed) {
      toast.push({
        status: "warning",
        title: "Add a prompt",
        description: "Describe the image you want to generate.",
      })
      return
    }

    if (!providerConfigured) {
      const p = providers.find((x) => x.id === provider)
      toast.push({
        status: "error",
        title: "API key missing",
        description: `Set ${p?.envVars.join(" or ") ?? "API keys"} on the server.`,
      })
      return
    }

    setGenerating(true)
    setResult(null)
    setAssetId(null)

    try {
      const response = await fetch(
        studioApiUrl("/api/studio/generate-image"),
        studioFetchInit("POST", {
          provider,
          modelKey,
          prompt: trimmed,
          aspectRatio,
        }),
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Generation failed (${response.status})`)
      }

      if (!data.imageData) {
        throw new Error("No image data returned from API")
      }

      setResult({
        imageData: data.imageData,
        mimeType: data.mimeType || "image/png",
      })
      const fallbackNote = data.fallbackUsed
        ? `Gemini unavailable — generated with NVIDIA (${data.modelId ?? "FLUX"})`
        : (selectedModel?.label ?? modelKey)

      toast.push({
        status: data.fallbackUsed ? "warning" : "success",
        title: data.fallbackUsed ? "Image generated (NVIDIA fallback)" : "Image generated",
        description: fallbackNote,
      })
    } catch (error) {
      toast.push({
        status: "error",
        title: "Generation failed",
        description:
          error instanceof Error ? error.message : "Check API keys on the server.",
      })
    } finally {
      setGenerating(false)
    }
  }, [
    prompt,
    aspectRatio,
    provider,
    modelKey,
    providerConfigured,
    providers,
    selectedModel,
    toast,
  ])

  const uploadToSanity = useCallback(async () => {
    if (!result) return

    setUploading(true)
    try {
      const blob = base64ToBlob(result.imageData, result.mimeType)
      const extension = result.mimeType.includes("jpeg") ? "jpg" : "png"
      const asset = await client.assets.upload("image", blob, {
        filename: `softree-ai-${provider}-${Date.now()}.${extension}`,
        contentType: result.mimeType,
      })

      setAssetId(asset._id)
      toast.push({
        status: "success",
        title: "Uploaded to Media Library",
        description: asset._id,
      })
    } catch (error) {
      toast.push({
        status: "error",
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Could not upload asset",
      })
    } finally {
      setUploading(false)
    }
  }, [client, result, provider, toast])

  const previewSrc = result
    ? `data:${result.mimeType};base64,${result.imageData}`
    : null

  const providerLabel =
    provider === "gemini" ? "Google Gemini" : "NVIDIA NIM"

  return (
    <Box padding={4} sizing="border">
      <Stack space={5}>
        <Flex align="center" gap={3} wrap="wrap">
          <Text size={4} weight="semibold">
            <span style={{ marginRight: 8 }}>✦</span>
            AI Image Studio
          </Text>
          <Text size={1} muted>
            Gemini + NVIDIA — choose provider and model
          </Text>
        </Flex>

        <Grid columns={[1, 1, 2]} gap={4}>
          <Card padding={4} radius={3} shadow={1}>
            <Stack space={4}>
              <Stack space={3}>
                <Label htmlFor="ai-provider">Provider</Label>
                <Select
                  id="ai-provider"
                  value={provider}
                  onChange={(event) => {
                    setProvider(
                      event.currentTarget.value as "gemini" | "nvidia",
                    )
                    setResult(null)
                    setAssetId(null)
                  }}
                >
                  <option value="gemini">Google Gemini</option>
                  <option value="nvidia">NVIDIA NIM</option>
                </Select>
                {!providerConfigured ? (
                  <Text size={1} style={{ color: "var(--card-badge-caution-fg-color)" }}>
                    {providerLabel} key not detected on server.
                  </Text>
                ) : null}
              </Stack>

              <Stack space={3}>
                <Label htmlFor="ai-model">Model</Label>
                <Select
                  id="ai-model"
                  value={modelKey}
                  disabled={catalogLoading || providerModels.length === 0}
                  onChange={(event) =>
                    setModelKey(event.currentTarget.value)
                  }
                >
                  {providerModels.map((m) => (
                    <option key={m.id} value={m.id} disabled={!m.available}>
                      {m.label}
                      {!m.available ? " (no API key)" : ""}
                    </option>
                  ))}
                </Select>
                {selectedModel?.description ? (
                  <Text size={1} muted>
                    {selectedModel.description}
                  </Text>
                ) : null}
              </Stack>

              <Stack space={3}>
                <Label htmlFor="gemini-template">Prompt template</Label>
                <Select
                  id="gemini-template"
                  value={templateKey}
                  onChange={(event) => {
                    const value = event.currentTarget.value
                    setTemplateKey(value)
                    if (value) applyTemplate(value)
                  }}
                >
                  {templateOptions.map((opt) => (
                    <option key={opt.value || "empty"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </Stack>

              <Stack space={3}>
                <Label htmlFor="gemini-prompt">Prompt</Label>
                <TextArea
                  id="gemini-prompt"
                  value={prompt}
                  onChange={(event) => setPrompt(event.currentTarget.value)}
                  rows={7}
                  placeholder="Describe the image for case studies, blog heroes, or social assets…"
                />
              </Stack>

              <Stack space={3}>
                <Label htmlFor="gemini-aspect">Aspect ratio</Label>
                <Select
                  id="gemini-aspect"
                  value={aspectRatio}
                  onChange={(event) =>
                    setAspectRatio(event.currentTarget.value)
                  }
                >
                  {GEMINI_ASPECT_RATIOS.map((ratio) => (
                    <option key={ratio} value={ratio}>
                      {ratio}
                    </option>
                  ))}
                </Select>
              </Stack>

              <Flex gap={3} wrap="wrap">
                <Button
                  text={generating ? "Generating…" : "Generate image"}
                  tone="primary"
                  icon={ImageIcon}
                  disabled={
                    generating ||
                    uploading ||
                    catalogLoading ||
                    !providerConfigured
                  }
                  onClick={generate}
                />
                <Button
                  text={uploading ? "Uploading…" : "Save to Media Library"}
                  mode="ghost"
                  disabled={!result || uploading || generating}
                  onClick={uploadToSanity}
                />
              </Flex>

              <Card padding={3} radius={2} tone="transparent" border>
                <Text size={1} muted>
                  <strong>Gemini:</strong> <code>GEMINI_API_KEY</code> or{" "}
                  <code>GOOGLE_GENAI_API_KEY</code>
                  <br />
                  <strong>NVIDIA:</strong> <code>NVIDIA_API_KEY</code> or{" "}
                  <code>NVAPI_API_KEY</code> (from{" "}
                  <a
                    href="https://build.nvidia.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    build.nvidia.com
                  </a>
                  ). With both set, **Gemini is tried first**; if it fails (quota, error), Studio **automatically uses NVIDIA FLUX.1 schnell**.
                </Text>
              </Card>
            </Stack>
          </Card>

          <Card padding={4} radius={3} shadow={1}>
            <Stack space={4}>
              <Text size={2} weight="medium">
                Preview
              </Text>
              <Box
                style={{
                  minHeight: 280,
                  borderRadius: 12,
                  overflow: "hidden",
                  background:
                    "linear-gradient(135deg, #f3f0ee 0%, #e8eeff 50%, #fdeee4 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {generating ? (
                  <Flex align="center" gap={3} direction="column">
                    <Spinner />
                    <Text size={1} muted>
                      Generating with {selectedModel?.label ?? providerLabel}…
                    </Text>
                  </Flex>
                ) : previewSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewSrc}
                    alt="Generated preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "min(52vh, 480px)",
                      objectFit: "contain",
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <Text size={1} muted align="center">
                    Generated images appear here. Pick a provider, model, and
                    prompt, then click Generate.
                  </Text>
                )}
              </Box>
              {assetId ? (
                <Card padding={3} radius={2} tone="positive">
                  <Stack space={2}>
                    <Text size={1} weight="semibold">
                      Asset saved
                    </Text>
                    <Text size={1} style={{ fontFamily: "monospace" }}>
                      {assetId}
                    </Text>
                  </Stack>
                </Card>
              ) : null}
            </Stack>
          </Card>
        </Grid>
      </Stack>
    </Box>
  )
}
