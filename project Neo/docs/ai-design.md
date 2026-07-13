# AI Design

**Date**: July 8, 2026
**AI Architect**: Cascade AI
**Purpose**: Comprehensive AI system design for Neo's AI-native Agency Platform

---

## AI System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       NEO AI SYSTEM                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        AI GATEWAY                                 │
│  - Provider selection, fallback, load balancing                   │
│  - Request normalization, response formatting                     │
│  - Cost tracking, rate limiting, caching                          │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   OpenAI     │    │  Anthropic   │    │    Google    │
│   Provider   │    │   Provider   │    │   Provider   │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CONTEXT ENGINE                               │
│  - User context                                                   │
│  - Workspace context                                              │
│  - Document context                                               │
│  - Conversation context                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       MEMORY SYSTEM                               │
│  - Short-term memory                                              │
│  - Long-term memory                                               │
│  - Episodic memory                                                │
│  - Semantic memory                                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PROMPT LIBRARY                               │
│  - Templates                                                      │
│  - Variables                                                      │
│  - Versioning                                                     │
│  - Optimization                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      TOOL CALLING                                 │
│  - Native tools                                                   │
│  - MCP tools                                                      │
│  - Custom tools                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       AGENT FRAMEWORK                             │
│  - Agent definitions                                              │
│  - Orchestration                                                  │
│  - Multi-agent workflows                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. AI Gateway

### Purpose
The AI Gateway is the single entry point for all AI operations in Neo. It abstracts provider differences, handles streaming, manages costs, and enforces rate limits.

### Responsibilities

1. **Provider Selection**: Choose the best provider for a request
2. **Fallback Logic**: Switch providers if one fails
3. **Load Balancing**: Distribute requests across providers
4. **Request Normalization**: Convert Neo requests to provider-specific formats
5. **Response Formatting**: Convert provider responses to Neo format
6. **Cost Tracking**: Track token usage and costs per workspace
7. **Rate Limiting**: Enforce workspace AI quotas
8. **Caching**: Cache common AI responses

### Interface

```typescript
interface AIGateway {
  chat(params: ChatRequest, context: AIContext): Promise<AIResponse>;
  stream(params: ChatRequest, context: AIContext): AsyncGenerator<AIStreamChunk>;
  generate(params: GenerateRequest, context: AIContext): Promise<AIResponse>;
  embed(params: EmbedRequest, context: AIContext): Promise<EmbedResponse>;
  executeTool(toolId: string, params: any, context: AIContext): Promise<ToolResult>;
  executeAgent(agentId: string, params: any, context: AIContext): Promise<AgentResult>;
}

interface ChatRequest {
  messages: Message[];
  provider?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  tools?: Tool[];
  stream?: boolean;
}

interface AIContext {
  userId: string;
  workspaceId: string;
  documentId?: string;
  conversationId?: string;
}

interface AIResponse {
  content: string;
  toolCalls?: ToolCall[];
  usage: TokenUsage;
  provider: string;
  model: string;
}

interface AIStreamChunk {
  content: string;
  toolCall?: Partial<ToolCall>;
  done: boolean;
}
```

### Provider Selection Strategy

```typescript
interface ProviderStrategy {
  // Default provider per feature
  features: Record<string, string>;
  
  // Fallback order
  fallbackOrder: string[];
  
  // Cost optimization
  preferCheaper: boolean;
  
  // Quality optimization
  preferQuality: boolean;
}

const defaultStrategy: ProviderStrategy = {
  features: {
    'chat': 'openai',
    'coding': 'anthropic',
    'creative': 'anthropic',
    'vision': 'google',
    'embedding': 'openai',
  },
  fallbackOrder: ['openai', 'anthropic', 'google'],
  preferCheaper: true,
  preferQuality: false,
};
```

---

## 2. Providers

### Supported Providers

| Provider | Models | Strengths | Use Cases |
|----------|--------|-----------|-----------|
| OpenAI | GPT-4o, o3, etc. | Fast, reliable, tools | General chat, content generation |
| Anthropic | Claude 3.5/4 Sonnet, Opus | Reasoning, long context | Complex reasoning, coding, analysis |
| Google | Gemini 2.5 Pro, Flash | Multimodal, cost | Vision, large context, cost-sensitive |

### Provider Adapter Interface

```typescript
interface AIProvider {
  id: string;
  name: string;
  models: Model[];
  
  chat(params: ChatRequest): Promise<AIResponse>;
  stream(params: ChatRequest): AsyncGenerator<AIStreamChunk>;
  embed(params: EmbedRequest): Promise<EmbedResponse>;
  
  normalizeRequest(params: ChatRequest): any;
  normalizeResponse(response: any): AIResponse;
  normalizeStreamChunk(chunk: any): AIStreamChunk;
}
```

### Configuration

```typescript
interface ProviderConfig {
  id: string;
  apiKey: string;
  baseUrl?: string;
  defaultModel: string;
  enabled: boolean;
  rateLimit: {
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
}
```

---

## 3. Context Engine

### Purpose
The Context Engine assembles relevant context for each AI request so responses are personalized, workspace-aware, and document-aware.

### Context Layers

**User Context**:
```typescript
interface UserContext {
  userId: string;
  name: string;
  role: string;
  preferences: UserPreferences;
  recentActions: RecentAction[];
}
```

**Workspace Context**:
```typescript
interface WorkspaceContext {
  workspaceId: string;
  name: string;
  settings: WorkspaceSettings;
  contentTypes: string[];
  brandVoice?: string;
  recentContent: ContentSummary[];
}
```

**Document Context**:
```typescript
interface DocumentContext {
  documentId: string;
  type: string;
  title: string;
  content: string;
  fields: Record<string, any>;
  history: DocumentVersion[];
  comments: CommentSummary[];
}
```

**Conversation Context**:
```typescript
interface ConversationContext {
  conversationId: string;
  messages: Message[];
  summary: string;
}
```

### Context Assembly

```typescript
class ContextEngine {
  async buildContext(request: AIContextRequest): Promise<AIContext> {
    const [user, workspace, document, conversation] = await Promise.all([
      this.getUserContext(request.userId),
      this.getWorkspaceContext(request.workspaceId),
      request.documentId ? this.getDocumentContext(request.documentId) : null,
      request.conversationId ? this.getConversationContext(request.conversationId) : null,
    ]);

    return { user, workspace, document, conversation };
  }
}
```

---

## 4. Memory System

### Purpose
The Memory System stores and retrieves information across sessions, enabling personalized and contextually aware AI responses.

### Memory Types

**Short-Term Memory**:
- Current session only
- In-memory storage
- Expires after session ends

**Long-Term Memory**:
- Persists across sessions
- User preferences, facts, patterns
- Vector database storage

**Episodic Memory**:
- Specific past events
- Content creation history
- AI interaction history

**Semantic Memory**:
- Concepts and knowledge
- Brand voice, content patterns
- Workspace-wide knowledge

### Memory Interface

```typescript
interface MemorySystem {
  store(memory: MemoryItem): Promise<void>;
  recall(query: string, filters?: MemoryFilters): Promise<MemoryItem[]>;
  forget(memoryId: string): Promise<void>;
  summarize(topic: string): Promise<string>;
}

interface MemoryItem {
  id: string;
  type: 'short' | 'long' | 'episodic' | 'semantic';
  content: string;
  embedding?: number[];
  userId?: string;
  workspaceId?: string;
  documentId?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}
```

---

## 5. Prompt Library

### Purpose
The Prompt Library provides versioned, optimized prompt templates that ensure consistent, high-quality AI output.

### Prompt Structure

```typescript
interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  version: string;
  
  // Template with variables
  template: string;
  
  // Variable definitions
  variables: PromptVariable[];
  
  // Default parameters
  defaults: PromptDefaults;
  
  // Category and tags
  category: string;
  tags: string[];
}

interface PromptVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required: boolean;
  description: string;
}

interface PromptDefaults {
  provider?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}
```

### Built-in Prompts

| Prompt | Purpose | Variables |
|--------|---------|-----------|
| content-generate | Generate new content | topic, type, tone, length |
| content-continue | Continue from cursor | context, style |
| content-rewrite | Rewrite existing content | content, instructions |
| content-improve | Improve writing quality | content, focus |
| content-summarize | Summarize content | content, length |
| seo-generate | Generate SEO metadata | title, content, keywords |
| alt-generate | Generate alt text | imageDescription |
| translate | Translate content | content, targetLanguage |
| brand-voice | Apply brand voice | content, brandGuidelines |

### Prompt Optimization

- **Chain-of-thought**: Encourage reasoning for complex tasks
- **Few-shot examples**: Include examples for consistent output
- **Output format**: Specify desired format (JSON, markdown, etc.)
- **Constraints**: Add length, tone, and style constraints
- **System prompts**: Define AI persona and workspace context

---

## 6. Tool Calling

### Purpose
Tool Calling allows the AI to perform actions in Neo, such as querying content, updating fields, or calling external services.

### Native Tools

| Tool | Description |
|------|-------------|
| content_query | Search and retrieve content |
| content_create | Create new content |
| content_update | Update existing content |
| media_search | Search media library |
| seo_analyze | Analyze SEO score |
| publish_schedule | Schedule publishing |

### MCP Integration

Model Context Protocol (MCP) enables integration with external tools:

```typescript
interface MCPServer {
  id: string;
  name: string;
  url: string;
  tools: MCPTool[];
}

interface MCPTool {
  name: string;
  description: string;
  parameters: JSONSchema;
}
```

### Tool Execution Flow

```
1. AI decides to use a tool
2. Gateway validates tool call
3. Tool executes with permission check
4. Result returned to AI
5. AI generates final response
```

---

## 7. Streaming

### Purpose
Streaming provides real-time AI responses, making the experience feel fast and interactive.

### Streaming Architecture

```typescript
interface StreamingManager {
  createStream(params: ChatRequest, context: AIContext): AIStream;
  registerStream(streamId: string, generator: AsyncGenerator): void;
  closeStream(streamId: string): void;
}

interface AIStream {
  id: string;
  subscribe(callback: StreamCallback): () => void;
  abort(): void;
}

type StreamCallback = (chunk: AIStreamChunk) => void;
```

### Streaming UI States

| State | Visual |
|-------|--------|
| Connecting | Subtle pulse |
| Generating | Shimmer gradient, tokens appearing |
| Tool Call | Tool card with spinner |
| Complete | Fade to final state |
| Error | Red error message |

---

## 8. Editor AI

### Purpose
Editor AI embeds AI directly into the content editing experience.

### Features

**Inline Commands**:
- `/ai` or `@AI` in editor
- Context menu with AI actions
- Slash command integration

**AI Actions**:
| Action | Trigger |
|--------|---------|
| Continue writing | Cursor at end of paragraph |
| Improve writing | Select text + command |
| Make shorter | Select text + command |
| Make longer | Select text + command |
| Change tone | Select text + tone option |
| Fix grammar | Select text + command |
| Generate SEO | In SEO panel |
| Generate alt text | In media panel |

**AI Inline Diff**:
```
Original: "The quick brown fox jumps over the lazy dog."
Suggested: "The quick brown fox leaps gracefully over the lazy dog."
[Accept] [Reject] [Regenerate]
```

---

## 9. Agent Framework

### Purpose
Agents are specialized AI workflows that can perform multi-step tasks autonomously.

### Agent Types

| Agent | Task |
|-------|------|
| Content Creation Agent | Research, outline, write, review content |
| SEO Agent | Analyze and optimize content for search |
| Publishing Agent | Schedule, publish, and promote content |
| Review Agent | Check content quality, grammar, accessibility |
| Research Agent | Gather information and summarize |

### Agent Definition

```typescript
interface Agent {
  id: string;
  name: string;
  description: string;
  
  // Steps the agent performs
  workflow: AgentStep[];
  
  // Tools available to the agent
  tools: string[];
  
  // Input/output schemas
  inputSchema: JSONSchema;
  outputSchema: JSONSchema;
}

interface AgentStep {
  id: string;
  name: string;
  type: 'prompt' | 'tool' | 'decision' | 'human_approval';
  config: Record<string, any>;
}
```

---

## 10. Security & Privacy

### Data Handling

1. **No training on user data**: Provider agreements prohibit training
2. **Workspace isolation**: Context never leaks between workspaces
3. **Field-level permissions**: AI respects content permissions
4. **Audit logging**: All AI interactions logged
5. **Data retention**: Configurable retention for AI memory

### Quotas & Cost Control

```typescript
interface AIQuota {
  maxTokensPerMonth: number;
  maxRequestsPerMinute: number;
  maxConcurrentStreams: number;
}
```

---

## API Surface

### Frontend SDK

```typescript
import { ai } from '@neo/ai';

// Generate content
const result = await ai.generate({
  prompt: 'Write a blog post about AI in marketing',
  context: { userId, workspaceId },
});

// Stream response
for await (const chunk of ai.stream({
  messages: [{ role: 'user', content: 'Continue writing' }],
  context: { userId, workspaceId, documentId },
})) {
  console.log(chunk.content);
}
```

### Backend SDK

```typescript
import { AIGateway } from '@neo/ai/server';

const gateway = new AIGateway(config);
const response = await gateway.chat(request, context);
```

---

## Next Steps

1. Move to Phase 5 (Implementation)
2. Set up project foundation
3. Build AI module first or in parallel with core platform
4. Implement provider adapters
5. Implement context engine and memory system
