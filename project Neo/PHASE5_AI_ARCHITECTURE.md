# PHASE 5: AI ARCHITECTURE

## Overview

This document provides a comprehensive AI architecture design for Project Neo's AI-native Agency Platform. The architecture covers provider abstraction, gateway, streaming, context management, memory systems, prompt engineering, agent frameworks, tool calling, and MCP (Model Context Protocol) integration.

---

## ARCHITECTURE PRINCIPLES

### 1. Provider Agnostic
- Support multiple AI providers (OpenAI, Anthropic, Google, etc.)
- Easy to add new providers
- Consistent API across providers
- Provider-specific optimizations

### 2. Streaming First
- All AI interactions support streaming
- Real-time token generation
- Progressive rendering
- Cancellation support

### 3. Context Aware
- Rich context management
- Document context
- User context
- Workspace context
- Conversation context

### 4. Memory Persistent
- Long-term memory
- Short-term memory
- Vector-based retrieval
- Hierarchical memory

### 5. Agent Orchestration
- Multi-agent systems
- Agent collaboration
- Agent delegation
- Agent supervision

### 6. Tool Calling
- Native tool calling
- Function calling
- Plugin integration
- MCP protocol

---

## PROVIDER ABSTRACTION

### Interface Design

```typescript
interface AIProvider {
  id: string;
  name: string;
  capabilities: ProviderCapabilities;
  
  // Chat completion
  chat(params: ChatParams): AsyncIterable<ChatChunk>;
  chatComplete(params: ChatParams): Promise<ChatResponse>;
  
  // Streaming
  stream(params: ChatParams): AsyncIterable<ChatChunk>;
  
  // Embeddings
  embed(params: EmbedParams): Promise<EmbedResponse>;
  embedBatch(params: EmbedBatchParams): Promise<EmbedBatchResponse>;
  
  // Tool calling
  callTool(params: ToolCallParams): Promise<ToolCallResponse>;
  
  // Context window
  getContextWindow(): number;
  getMaxTokens(): number;
  
  // Models
  listModels(): Promise<ModelInfo[]>;
  getModel(modelId: string): ModelInfo;
}

interface ProviderCapabilities {
  streaming: boolean;
  toolCalling: boolean;
  functionCalling: boolean;
  vision: boolean;
  audio: boolean;
  embeddings: boolean;
  contextWindow: number;
  maxTokens: number;
}
```

### Provider Implementations

#### OpenAI Provider
```typescript
class OpenAIProvider implements AIProvider {
  id = 'openai';
  name = 'OpenAI';
  capabilities = {
    streaming: true,
    toolCalling: true,
    functionCalling: true,
    vision: true,
    audio: true,
    embeddings: true,
    contextWindow: 128000,
    maxTokens: 4096,
  };
  
  private client: OpenAI;
  
  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }
  
  async *chat(params: ChatParams): AsyncIterable<ChatChunk> {
    const stream = await this.client.chat.completions.create({
      model: params.model,
      messages: params.messages,
      tools: params.tools,
      stream: true,
      temperature: params.temperature,
      maxTokens: params.maxTokens,
    });
    
    for await (const chunk of stream) {
      yield {
        content: chunk.choices[0]?.delta?.content || '',
        finishReason: chunk.choices[0]?.finish_reason,
        toolCalls: chunk.choices[0]?.delta?.tool_calls,
      };
    }
  }
  
  async embed(params: EmbedParams): Promise<EmbedResponse> {
    const response = await this.client.embeddings.create({
      model: params.model,
      input: params.text,
    });
    
    return {
      embedding: response.data[0].embedding,
      model: response.model,
      usage: response.usage,
    };
  }
  
  // ... other methods
}
```

#### Anthropic Provider
```typescript
class AnthropicProvider implements AIProvider {
  id = 'anthropic';
  name = 'Anthropic';
  capabilities = {
    streaming: true,
    toolCalling: true,
    functionCalling: true,
    vision: true,
    audio: false,
    embeddings: false,
    contextWindow: 200000,
    maxTokens: 4096,
  };
  
  private client: Anthropic;
  
  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }
  
  async *chat(params: ChatParams): AsyncIterable<ChatChunk> {
    const stream = await this.client.messages.create({
      model: params.model,
      messages: params.messages,
      tools: params.tools,
      max_tokens: params.maxTokens,
      stream: true,
    });
    
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta') {
        yield {
          content: chunk.delta.text,
          finishReason: null,
        };
      } else if (chunk.type === 'message_stop') {
        yield {
          content: '',
          finishReason: chunk.stop_reason,
        };
      }
    }
  }
  
  // ... other methods
}
```

#### Google Provider
```typescript
class GoogleProvider implements AIProvider {
  id = 'google';
  name = 'Google AI';
  capabilities = {
    streaming: true,
    toolCalling: true,
    functionCalling: true,
    vision: true,
    audio: false,
    embeddings: true,
    contextWindow: 1000000,
    maxTokens: 8192,
  };
  
  private client: GenerativeModel;
  
  constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.client = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }
  
  async *chat(params: ChatParams): AsyncIterable<ChatChunk> {
    const result = await this.client.generateContentStream(params.messages);
    
    for await (const chunk of result.stream) {
      yield {
        content: chunk.text(),
        finishReason: null,
      };
    }
  }
  
  // ... other methods
}
```

### Provider Registry

```typescript
class ProviderRegistry {
  private providers = new Map<string, AIProvider>();
  private defaultProvider: string;
  
  register(provider: AIProvider): void {
    this.providers.set(provider.id, provider);
  }
  
  get(id: string): AIProvider {
    const provider = this.providers.get(id);
    if (!provider) {
      throw new Error(`Provider not found: ${id}`);
    }
    return provider;
  }
  
  getDefault(): AIProvider {
    return this.get(this.defaultProvider);
  }
  
  setDefault(id: string): void {
    if (!this.providers.has(id)) {
      throw new Error(`Provider not found: ${id}`);
    }
    this.defaultProvider = id;
  }
  
  list(): AIProvider[] {
    return Array.from(this.providers.values());
  }
  
  getByCapability(capability: keyof ProviderCapabilities): AIProvider[] {
    return this.list().filter(p => p.capabilities[capability]);
  }
}

// Usage
const registry = new ProviderRegistry();
registry.register(new OpenAIProvider(process.env.OPENAI_API_KEY));
registry.register(new AnthropicProvider(process.env.ANTHROPIC_API_KEY));
registry.register(new GoogleProvider(process.env.GOOGLE_API_KEY));
registry.setDefault('openai');
```

---

## AI GATEWAY

### Gateway Architecture

The AI Gateway acts as a unified interface between the application and AI providers. It handles:

- Provider selection and routing
- Request/response transformation
- Rate limiting and quotas
- Caching
- Monitoring and observability
- Error handling and retries
- Cost tracking

### Gateway Interface

```typescript
class AIGateway {
  private registry: ProviderRegistry;
  private cache: Cache;
  private rateLimiter: RateLimiter;
  private metrics: Metrics;
  
  constructor(config: GatewayConfig) {
    this.registry = config.registry;
    this.cache = config.cache;
    this.rateLimiter = config.rateLimiter;
    this.metrics = config.metrics;
  }
  
  async chat(params: ChatRequest): Promise<ChatResponse> {
    // Check rate limit
    await this.rateLimiter.check(params.userId);
    
    // Check cache
    const cacheKey = this.getCacheKey(params);
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      this.metrics.increment('cache.hit');
      return cached;
    }
    
    // Get provider
    const provider = this.getProvider(params);
    
    // Transform request
    const transformedParams = this.transformRequest(params, provider);
    
    // Call provider
    const response = await provider.chatComplete(transformedParams);
    
    // Transform response
    const transformedResponse = this.transformResponse(response, provider);
    
    // Cache response
    await this.cache.set(cacheKey, transformedResponse);
    
    // Track metrics
    this.metrics.increment('chat.success');
    this.metrics.track('chat.tokens', response.usage.totalTokens);
    this.metrics.track('chat.cost', this.calculateCost(response, provider));
    
    return transformedResponse;
  }
  
  async *stream(params: ChatRequest): AsyncIterable<ChatChunk> {
    // Check rate limit
    await this.rateLimiter.check(params.userId);
    
    // Get provider
    const provider = this.getProvider(params);
    
    // Transform request
    const transformedParams = this.transformRequest(params, provider);
    
    // Stream from provider
    let fullContent = '';
    for await (const chunk of provider.stream(transformedParams)) {
      fullContent += chunk.content;
      yield chunk;
    }
    
    // Track metrics
    this.metrics.increment('stream.success');
    this.metrics.track('stream.tokens', fullContent.length);
  }
  
  private getProvider(params: ChatRequest): AIProvider {
    if (params.providerId) {
      return this.registry.get(params.providerId);
    }
    
    // Provider selection strategy
    return this.selectProvider(params);
  }
  
  private selectProvider(params: ChatRequest): AIProvider {
    // Strategy 1: Based on capabilities needed
    if (params.needsVision) {
      const providers = this.registry.getByCapability('vision');
      return providers[0];
    }
    
    // Strategy 2: Based on cost
    // Strategy 3: Based on performance
    // Strategy 4: Based on context window
    
    return this.registry.getDefault();
  }
  
  private transformRequest(params: ChatRequest, provider: AIProvider): ChatParams {
    // Transform messages to provider format
    // Transform tools to provider format
    // Handle context window limits
    // Handle token limits
    
    return {
      model: params.model || provider.getModel('default'),
      messages: this.transformMessages params.messages),
      tools: this.transformTools(params.tools, provider),
      temperature: params.temperature,
      maxTokens: this.calculateMaxTokens(params, provider),
    };
  }
  
  private transformResponse(response: ChatResponse, provider: AIProvider): ChatResponse {
    // Transform response to standard format
    // Handle provider-specific fields
    
    return response;
  }
  
  private getCacheKey(params: ChatRequest): string {
    return JSON.stringify({
      provider: params.providerId,
      model: params.model,
      messages: params.messages,
      tools: params.tools,
    });
  }
  
  private calculateCost(response: ChatResponse, provider: AIProvider): number {
    // Calculate cost based on provider pricing
    // Input tokens * input price + output tokens * output price
    
    return 0;
  }
}
```

### Middleware Pipeline

```typescript
interface GatewayMiddleware {
  beforeRequest?(params: ChatRequest): Promise<ChatRequest>;
  afterResponse?(response: ChatResponse, params: ChatRequest): Promise<ChatResponse>;
  onError?(error: Error, params: ChatRequest): Promise<ChatResponse>;
}

class AIGateway {
  private middlewares: GatewayMiddleware[] = [];
  
  use(middleware: GatewayMiddleware): void {
    this.middlewares.push(middleware);
  }
  
  async chat(params: ChatRequest): Promise<ChatResponse> {
    let currentParams = params;
    
    // Before request middleware
    for (const middleware of this.middlewares) {
      if (middleware.beforeRequest) {
        currentParams = await middleware.beforeRequest(currentParams);
      }
    }
    
    try {
      const response = await this.executeChat(currentParams);
      
      // After response middleware
      let currentResponse = response;
      for (const middleware of this.middlewares) {
        if (middleware.afterResponse) {
          currentResponse = await middleware.afterResponse(currentResponse, currentParams);
        }
      }
      
      return currentResponse;
    } catch (error) {
      // Error middleware
      for (const middleware of this.middlewares) {
        if (middleware.onError) {
          return await middleware.onError(error, currentParams);
        }
      }
      throw error;
    }
  }
}

// Example middleware: Logging
const loggingMiddleware: GatewayMiddleware = {
  beforeRequest: async (params) => {
    console.log('AI Request:', params);
    return params;
  },
  afterResponse: async (response, params) => {
    console.log('AI Response:', response);
    return response;
  },
  onError: async (error, params) => {
    console.error('AI Error:', error);
    throw error;
  },
};

// Example middleware: Context injection
const contextMiddleware: GatewayMiddleware = {
  beforeRequest: async (params) => {
    // Inject workspace context
    // Inject user context
    // Inject document context
    
    return {
      ...params,
      messages: [
        { role: 'system', content: getContextPrompt(params.context) },
        ...params.messages,
      ],
    };
  },
};

// Example middleware: PII redaction
const piiMiddleware: GatewayMiddleware = {
  beforeRequest: async (params) => {
    // Redact PII from messages
    const redactedMessages = params.messages.map(msg => ({
      ...msg,
      content: redactPII(msg.content),
    }));
    
    return { ...params, messages: redactedMessages };
  },
};
```

---

## STREAMING ARCHITECTURE

### Streaming Implementation

```typescript
class StreamingManager {
  private gateway: AIGateway;
  private connections = new Map<string, StreamingConnection>();
  
  async *stream(params: ChatRequest, connectionId: string): AsyncIterable<ChatChunk> {
    const connection: StreamingConnection = {
      id: connectionId,
      params,
      startTime: Date.now(),
      chunks: [],
      status: 'active',
    };
    
    this.connections.set(connectionId, connection);
    
    try {
      for await (const chunk of this.gateway.stream(params)) {
        connection.chunks.push(chunk);
        connection.lastChunkTime = Date.now();
        
        yield chunk;
        
        // Broadcast to connected clients
        this.broadcastChunk(connectionId, chunk);
      }
      
      connection.status = 'completed';
      connection.endTime = Date.now();
    } catch (error) {
      connection.status = 'error';
      connection.error = error;
      throw error;
    } finally {
      this.connections.delete(connectionId);
    }
  }
  
  cancel(connectionId: string): void {
    const connection = this.connections.get(connectionId);
    if (connection) {
      connection.status = 'cancelled';
      connection.endTime = Date.now();
    }
  }
  
  getConnection(connectionId: string): StreamingConnection | undefined {
    return this.connections.get(connectionId);
  }
  
  private broadcastChunk(connectionId: string, chunk: ChatChunk): void {
    // Broadcast via WebSocket
    // Broadcast via Server-Sent Events
    // Broadcast via WebRTC
  }
}

interface StreamingConnection {
  id: string;
  params: ChatRequest;
  startTime: number;
  endTime?: number;
  lastChunkTime?: number;
  chunks: ChatChunk[];
  status: 'active' | 'completed' | 'error' | 'cancelled';
  error?: Error;
}
```

### Progressive Rendering

```typescript
class ProgressiveRenderer {
  private element: HTMLElement;
  private chunks: string[] = [];
  
  constructor(element: HTMLElement) {
    this.element = element;
  }
  
  appendChunk(chunk: string): void {
    this.chunks.push(chunk);
    this.render();
  }
  
  private render(): void {
    const markdown = this.chunks.join('');
    const html = renderMarkdown(markdown);
    this.element.innerHTML = html;
    
    // Scroll to bottom
    this.element.scrollTop = this.element.scrollHeight;
  }
  
  complete(): void {
    // Final rendering
    // Syntax highlighting
    // Link resolution
  }
}
```

---

## CONTEXT MANAGEMENT

### Context Architecture

```typescript
interface Context {
  user: UserContext;
  workspace: WorkspaceContext;
  document?: DocumentContext;
  conversation?: ConversationContext;
  tools?: ToolContext;
}

interface UserContext {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  preferences: UserPreferences;
}

interface WorkspaceContext {
  id: string;
  name: string;
  settings: WorkspaceSettings;
  members: WorkspaceMember[];
  contentTypes: ContentType[];
}

interface DocumentContext {
  id: string;
  type: string;
  title: string;
  content: string;
  schema: Schema;
  metadata: Record<string, any>;
}

interface ConversationContext {
  id: string;
  history: Message[];
  summary?: string;
  intent?: string;
}

interface ToolContext {
  availableTools: Tool[];
  recentToolCalls: ToolCall[];
}

class ContextManager {
  private contextStore: ContextStore;
  private contextCache: Map<string, Context>;
  
  async getContext(request: ContextRequest): Promise<Context> {
    const cacheKey = this.getCacheKey(request);
    
    // Check cache
    const cached = this.contextCache.get(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Build context
    const context = await this.buildContext(request);
    
    // Cache context
    this.contextCache.set(cacheKey, context);
    
    return context;
  }
  
  private async buildContext(request: ContextRequest): Promise<Context> {
    const [user, workspace, document, conversation] = await Promise.all([
      this.getUserContext(request.userId),
      this.getWorkspaceContext(request.workspaceId),
      request.documentId ? this.getDocumentContext(request.documentId) : undefined,
      request.conversationId ? this.getConversationContext(request.conversationId) : undefined,
    ]);
    
    return {
      user,
      workspace,
      document,
      conversation,
      tools: this.getToolContext(request),
    };
  }
  
  private async getUserContext(userId: string): Promise<UserContext> {
    const user = await this.contextStore.getUser(userId);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      preferences: user.preferences,
    };
  }
  
  private async getWorkspaceContext(workspaceId: string): Promise<WorkspaceContext> {
    const workspace = await this.contextStore.getWorkspace(workspaceId);
    return {
      id: workspace.id,
      name: workspace.name,
      settings: workspace.settings,
      members: workspace.members,
      contentTypes: workspace.contentTypes,
    };
  }
  
  private async getDocumentContext(documentId: string): Promise<DocumentContext> {
    const document = await this.contextStore.getDocument(documentId);
    return {
      id: document.id,
      type: document.type,
      title: document.title,
      content: document.content,
      schema: document.schema,
      metadata: document.metadata,
    };
  }
  
  private async getConversationContext(conversationId: string): Promise<ConversationContext> {
    const conversation = await this.contextStore.getConversation(conversationId);
    return {
      id: conversation.id,
      history: conversation.messages,
      summary: conversation.summary,
      intent: conversation.intent,
    };
  }
  
  private getToolContext(request: ContextRequest): ToolContext {
    return {
      availableTools: this.getAvailableTools(request),
      recentToolCalls: this.getRecentToolCalls(request),
    };
  }
  
  invalidate(userId: string, workspaceId: string): void {
    const cacheKey = this.getCacheKey({ userId, workspaceId });
    this.contextCache.delete(cacheKey);
  }
  
  private getCacheKey(request: ContextRequest): string {
    return `${request.userId}:${request.workspaceId}:${request.documentId || ''}:${request.conversationId || ''}`;
  }
}
```

### Context Injection

```typescript
class ContextInjector {
  private contextManager: ContextManager;
  
  async inject(request: ChatRequest): Promise<ChatRequest> {
    const context = await this.contextManager.getContext({
      userId: request.userId,
      workspaceId: request.workspaceId,
      documentId: request.documentId,
      conversationId: request.conversationId,
    });
    
    const systemPrompt = this.buildSystemPrompt(context);
    
    return {
      ...request,
      messages: [
        { role: 'system', content: systemPrompt },
        ...request.messages,
      ],
      context,
    };
  }
  
  private buildSystemPrompt(context: Context): string {
    const sections = [
      this.buildUserSection(context.user),
      this.buildWorkspaceSection(context.workspace),
      context.document ? this.buildDocumentSection(context.document) : '',
      context.conversation ? this.buildConversationSection(context.conversation) : '',
      context.tools ? this.buildToolsSection(context.tools) : '',
    ].filter(Boolean);
    
    return sections.join('\n\n');
  }
  
  private buildUserSection(user: UserContext): string {
    return `You are assisting ${user.name} (${user.email}) who has the role of ${user.role} with permissions: ${user.permissions.join(', ')}.`;
  }
  
  private buildWorkspaceSection(workspace: WorkspaceContext): string {
    return `This is the ${workspace.name} workspace. Available content types: ${workspace.contentTypes.map(ct => ct.name).join(', ')}. Team members: ${workspace.members.map(m => m.name).join(', ')}.`;
  }
  
  private buildDocumentSection(document: DocumentContext): string {
    return `Current document: ${document.title} (${document.type}). Content: ${document.content.substring(0, 500)}...`;
  }
  
  private buildConversationSection(conversation: ConversationContext): string {
    return `Conversation summary: ${conversation.summary || 'No summary yet'}. Intent: ${conversation.intent || 'Unknown'}.`;
  }
  
  private buildToolsSection(tools: ToolContext): string {
    const toolDescriptions = tools.availableTools.map(tool => 
      `- ${tool.name}: ${tool.description}`
    ).join('\n');
    
    return `Available tools:\n${toolDescriptions}`;
  }
}
```

---

## MEMORY SYSTEM

### Memory Architecture

```typescript
interface Memory {
  id: string;
  type: 'short' | 'long' | 'episodic' | 'semantic';
  content: string;
  embedding?: number[];
  metadata: MemoryMetadata;
  timestamp: Date;
  userId: string;
  workspaceId: string;
}

interface MemoryMetadata {
  source: string;
  importance: number;
  accessCount: number;
  lastAccessed: Date;
  tags: string[];
  relatedIds: string[];
}

class MemorySystem {
  private shortTermStore: ShortTermStore;
  private longTermStore: LongTermStore;
  private vectorStore: VectorStore;
  private embeddingProvider: AIProvider;
  
  async store(memory: Memory): Promise<void> {
    // Generate embedding
    const embedding = await this.embeddingProvider.embed({
      text: memory.content,
      model: 'text-embedding-3-small',
    });
    
    memory.embedding = embedding.embedding;
    
    // Store in appropriate store
    if (memory.type === 'short') {
      await this.shortTermStore.store(memory);
    } else {
      await this.longTermStore.store(memory);
    }
    
    // Store in vector store for retrieval
    await this.vectorStore.store({
      id: memory.id,
      embedding: memory.embedding,
      metadata: memory.metadata,
    });
  }
  
  async retrieve(query: string, options: RetrieveOptions): Promise<Memory[]> {
    // Generate query embedding
    const embedding = await this.embeddingProvider.embed({
      text: query,
      model: 'text-embedding-3-small',
    });
    
    // Vector search
    const results = await this.vectorStore.search({
      embedding: embedding.embedding,
      limit: options.limit || 10,
      filter: options.filter,
    });
    
    // Retrieve full memories
    const memories = await Promise.all(
      results.map(result => this.longTermStore.get(result.id))
    );
    
    // Update access count
    for (const memory of memories) {
      memory.metadata.accessCount++;
      memory.metadata.lastAccessed = new Date();
      await this.longTermStore.update(memory);
    }
    
    return memories;
  }
  
  async summarize(userId: string, workspaceId: string): Promise<string> {
    // Retrieve recent memories
    const memories = await this.retrieve('', {
      filter: { userId, workspaceId },
      limit: 50,
    });
    
    // Generate summary using AI
    const summary = await this.generateSummary(memories);
    
    return summary;
  }
  
  private async generateSummary(memories: Memory[]): Promise<string> {
    const content = memories.map(m => m.content).join('\n\n');
    
    const response = await this.gateway.chat({
      messages: [
        {
          role: 'system',
          content: 'Summarize the following memories into a concise summary.',
        },
        {
          role: 'user',
          content,
        },
      ],
    });
    
    return response.content;
  }
  
  async consolidate(userId: string, workspaceId: string): Promise<void> {
    // Move short-term memories to long-term
    const shortMemories = await this.shortTermStore.list({ userId, workspaceId });
    
    for (const memory of shortMemories) {
      memory.type = 'long';
      await this.store(memory);
      await this.shortTermStore.delete(memory.id);
    }
  }
}

interface RetrieveOptions {
  limit?: number;
  filter?: {
    userId?: string;
    workspaceId?: string;
    type?: string;
    tags?: string[];
  };
}
```

### Hierarchical Memory

```typescript
class HierarchicalMemory {
  private memorySystem: MemorySystem;
  
  async store(memory: Memory, hierarchy: MemoryHierarchy): Promise<void> {
    // Store memory
    await this.memorySystem.store(memory);
    
    // Update hierarchy
    await this.updateHierarchy(memory, hierarchy);
  }
  
  async retrieve(query: string, hierarchy: MemoryHierarchy): Promise<Memory[]> {
    // Retrieve memories
    const memories = await this.memorySystem.retrieve(query, {
      filter: hierarchy.filter,
    });
    
    // Rank by hierarchy
    const ranked = this.rankByHierarchy(memories, hierarchy);
    
    return ranked;
  }
  
  private rankByHierarchy(memories: Memory[], hierarchy: MemoryHierarchy): Memory[] {
    // Implement hierarchical ranking
    // Higher hierarchy = higher rank
    // Recent = higher rank
    // Important = higher rank
    
    return memories.sort((a, b) => {
      const aScore = this.calculateScore(a, hierarchy);
      const bScore = this.calculateScore(b, hierarchy);
      return bScore - aScore;
    });
  }
  
  private calculateScore(memory: Memory, hierarchy: MemoryHierarchy): number {
    let score = 0;
    
    // Importance
    score += memory.metadata.importance * 10;
    
    // Recency
    const age = Date.now() - memory.timestamp.getTime();
    score -= age / (1000 * 60 * 60); // Decay over hours
    
    // Access count
    score += memory.metadata.accessCount * 2;
    
    // Hierarchy
    if (hierarchy.priorityIds.includes(memory.id)) {
      score += 50;
    }
    
    return score;
  }
  
  private async updateHierarchy(memory: Memory, hierarchy: MemoryHierarchy): Promise<void> {
    // Update parent-child relationships
    // Update sibling relationships
    // Update metadata
  }
}

interface MemoryHierarchy {
  priorityIds: string[];
  filter?: {
    userId?: string;
    workspaceId?: string;
    type?: string;
    tags?: string[];
  };
}
```

---

## PROMPT SYSTEM

### Prompt Templates

```typescript
class PromptTemplate {
  private template: string;
  private variables: string[];
  
  constructor(template: string) {
    this.template = template;
    this.variables = this.extractVariables(template);
  }
  
  render(values: Record<string, any>): string {
    let result = this.template;
    
    for (const variable of this.variables) {
      const value = values[variable];
      if (value === undefined) {
        throw new Error(`Missing variable: ${variable}`);
      }
      
      result = result.replace(`{{${variable}}}`, String(value));
    }
    
    return result;
  }
  
  private extractVariables(template: string): string[] {
    const matches = template.matchAll(/\{\{(\w+)\}\}/g);
    return Array.from(matches).map(m => m[1]);
  }
}

// Example templates
const contentCreationTemplate = new PromptTemplate(`
You are a content creator for {{workspaceName}}. Your role is {{role}}.

Task: {{task}}

Context:
{{context}}

Guidelines:
- Follow the brand voice: {{brandVoice}}
- Target audience: {{audience}}
- Tone: {{tone}}
- Length: {{length}}

Create content that is engaging, informative, and aligned with the brand.
`);

const codeGenerationTemplate = new PromptTemplate(`
You are a {{language}} developer. Your task is to {{task}}.

Requirements:
{{requirements}}

Context:
{{context}}

Generate clean, production-ready code with:
- Proper error handling
- Type safety
- Documentation
- Tests

Output only the code, no explanations.
`);
```

### Prompt Engineering

```typescript
class PromptEngineer {
  private templates = new Map<string, PromptTemplate>();
  
  registerTemplate(name: string, template: PromptTemplate): void {
    this.templates.set(name, template);
  }
  
  async generate(prompt: PromptRequest): Promise<string> {
    const template = this.templates.get(prompt.templateName);
    if (!template) {
      throw new Error(`Template not found: ${prompt.templateName}`);
    }
    
    const rendered = template.render(prompt.variables);
    
    // Optimize prompt
    const optimized = await this.optimizePrompt(rendered);
    
    return optimized;
  }
  
  private async optimizePrompt(prompt: string): Promise<string> {
    // Use AI to optimize prompt
    const response = await this.gateway.chat({
      messages: [
        {
          role: 'system',
          content: 'Optimize the following prompt for clarity, specificity, and effectiveness. Keep the same meaning but make it more effective.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });
    
    return response.content;
  }
  
  async evaluate(prompt: string, criteria: EvaluationCriteria): Promise<EvaluationResult> {
    // Evaluate prompt effectiveness
    const response = await this.gateway.chat({
      messages: [
        {
          role: 'system',
          content: `Evaluate the following prompt based on: ${criteria.join(', ')}. Rate each criterion from 1-10 and provide feedback.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });
    
    return this.parseEvaluation(response.content);
  }
  
  private parseEvaluation(content: string): EvaluationResult {
    // Parse evaluation response
    return {
      clarity: 0,
      specificity: 0,
      effectiveness: 0,
      feedback: '',
    };
  }
}

interface PromptRequest {
  templateName: string;
  variables: Record<string, any>;
}

interface EvaluationCriteria {
  clarity: boolean;
  specificity: boolean;
  completeness: boolean;
  conciseness: boolean;
}

interface EvaluationResult {
  clarity: number;
  specificity: number;
  effectiveness: number;
  feedback: string;
}
```

---

## AGENT FRAMEWORK

### Agent Architecture

```typescript
interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: AgentCapabilities;
  
  execute(task: AgentTask): Promise<AgentResult>;
  canHandle(task: AgentTask): boolean;
}

interface AgentCapabilities {
  tools: string[];
  contextTypes: string[];
  outputTypes: string[];
}

interface AgentTask {
  id: string;
  type: string;
  input: any;
  context: Context;
  priority: number;
}

interface AgentResult {
  success: boolean;
  output: any;
  error?: Error;
  metadata: Record<string, any>;
}

class AgentOrchestrator {
  private agents = new Map<string, Agent>();
  private taskQueue: TaskQueue;
  private executionEngine: ExecutionEngine;
  
  registerAgent(agent: Agent): void {
    this.agents.set(agent.id, agent);
  }
  
  async execute(task: AgentTask): Promise<AgentResult> {
    // Select agent
    const agent = this.selectAgent(task);
    
    // Execute task
    const result = await agent.execute(task);
    
    return result;
  }
  
  async executeMulti(tasks: AgentTask[]): Promise<AgentResult[]> {
    // Execute tasks in parallel
    const results = await Promise.all(
      tasks.map(task => this.execute(task))
    );
    
    return results;
  }
  
  async executeWorkflow(workflow: AgentWorkflow): Promise<WorkflowResult> {
    // Execute workflow steps
    const results: AgentResult[] = [];
    
    for (const step of workflow.steps) {
      const result = await this.execute(step.task);
      results.push(result);
      
      // Check for stop conditions
      if (workflow.stopCondition?.(result)) {
        break;
      }
      
      // Pass output to next step
      if (step.passOutput) {
        step.task.input = result.output;
      }
    }
    
    return {
      success: results.every(r => r.success),
      results,
    };
  }
  
  private selectAgent(task: AgentTask): Agent {
    // Find agent that can handle task
    for (const agent of this.agents.values()) {
      if (agent.canHandle(task)) {
        return agent;
      }
    }
    
    throw new Error(`No agent found for task: ${task.type}`);
  }
}

interface AgentWorkflow {
  steps: WorkflowStep[];
  stopCondition?: (result: AgentResult) => boolean;
}

interface WorkflowStep {
  task: AgentTask;
  passOutput: boolean;
}
```

### Agent Implementations

#### Content Creation Agent

```typescript
class ContentCreationAgent implements Agent {
  id = 'content-creation';
  name = 'Content Creation Agent';
  description = 'Creates content based on templates and guidelines';
  capabilities = {
    tools: ['text-generation', 'image-generation', 'content-optimization'],
    contextTypes: ['document', 'workspace', 'brand'],
    outputTypes: ['text', 'markdown', 'html'],
  };
  
  async execute(task: AgentTask): Promise<AgentResult> {
    const { input, context } = task;
    
    // Generate content
    const content = await this.generateContent(input, context);
    
    // Optimize content
    const optimized = await this.optimizeContent(content, context);
    
    return {
      success: true,
      output: optimized,
      metadata: {
        wordCount: optimized.split(' ').length,
        readingTime: Math.ceil(optimized.split(' ').length / 200),
      },
    };
  }
  
  canHandle(task: AgentTask): boolean {
    return task.type === 'content-creation';
  }
  
  private async generateContent(input: any, context: Context): Promise<string> {
    const template = new PromptTemplate(`
Create {{contentType}} about {{topic}} for {{audience}}.
Tone: {{tone}}
Length: {{length}}
Brand voice: {{brandVoice}}
`);
    
    const rendered = template.render({
      contentType: input.contentType,
      topic: input.topic,
      audience: context.workspace.settings.audience,
      tone: input.tone,
      length: input.length,
      brandVoice: context.workspace.settings.brandVoice,
    });
    
    const response = await this.gateway.chat({
      messages: [{ role: 'user', content: rendered }],
    });
    
    return response.content;
  }
  
  private async optimizeContent(content: string, context: Context): Promise<string> {
    // Optimize for SEO
    // Optimize for readability
    // Optimize for engagement
    
    return content;
  }
}
```

#### Code Generation Agent

```typescript
class CodeGenerationAgent implements Agent {
  id = 'code-generation';
  name = 'Code Generation Agent';
  description = 'Generates code based on requirements';
  capabilities = {
    tools: ['code-generation', 'code-review', 'code-optimization'],
    contextTypes: ['document', 'workspace', 'codebase'],
    outputTypes: ['code', 'typescript', 'javascript', 'python'],
  };
  
  async execute(task: AgentTask): Promise<AgentResult> {
    const { input, context } = task;
    
    // Generate code
    const code = await this.generateCode(input, context);
    
    // Review code
    const review = await this.reviewCode(code, context);
    
    return {
      success: true,
      output: code,
      metadata: {
        review,
        language: input.language,
        lines: code.split('\n').length,
      },
    };
  }
  
  canHandle(task: AgentTask): boolean {
    return task.type === 'code-generation';
  }
  
  private async generateCode(input: any, context: Context): Promise<string> {
    const template = new PromptTemplate(`
Generate {{language}} code for {{task}}.

Requirements:
{{requirements}}

Context:
{{context}}

Generate clean, production-ready code with proper error handling and documentation.
`);
    
    const rendered = template.render({
      language: input.language,
      task: input.task,
      requirements: input.requirements.join('\n'),
      context: JSON.stringify(context),
    });
    
    const response = await this.gateway.chat({
      messages: [{ role: 'user', content: rendered }],
    });
    
    return response.content;
  }
  
  private async reviewCode(code: string, context: Context): Promise<string> {
    const response = await this.gateway.chat({
      messages: [
        {
          role: 'system',
          content: 'Review the following code for quality, security, and best practices.',
        },
        {
          role: 'user',
          content: code,
        },
      ],
    });
    
    return response.content;
  }
}
```

---

## TOOL CALLING

### Tool Architecture

```typescript
interface Tool {
  id: string;
  name: string;
  description: string;
  parameters: ToolParameter[];
  execute(params: Record<string, any>): Promise<ToolResult>;
}

interface ToolParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ToolResult {
  success: boolean;
  output: any;
  error?: Error;
}

class ToolRegistry {
  private tools = new Map<string, Tool>();
  
  register(tool: Tool): void {
    this.tools.set(tool.id, tool);
  }
  
  get(id: string): Tool {
    const tool = this.tools.get(id);
    if (!tool) {
      throw new Error(`Tool not found: ${id}`);
    }
    return tool;
  }
  
  list(): Tool[] {
    return Array.from(this.tools.values());
  }
  
  async execute(toolId: string, params: Record<string, any>): Promise<ToolResult> {
    const tool = this.get(toolId);
    return await tool.execute(params);
  }
}

class ToolCaller {
  private registry: ToolRegistry;
  private gateway: AIGateway;
  
  async callWithAI(request: ChatRequest): Promise<ChatResponse> {
    // Get available tools
    const tools = this.registry.list();
    
    // Add tools to request
    const toolDefinitions = tools.map(tool => ({
      type: 'function',
      function: {
        name: tool.id,
        description: tool.description,
        parameters: {
          type: 'object',
          properties: this.toolParametersToSchema(tool.parameters),
          required: tool.parameters.filter(p => p.required).map(p => p.name),
        },
      },
    }));
    
    const response = await this.gateway.chat({
      ...request,
      tools: toolDefinitions,
    });
    
    // Handle tool calls
    if (response.toolCalls) {
      const toolResults = await Promise.all(
        response.toolCalls.map(async (toolCall) => {
          const result = await this.registry.execute(
            toolCall.function.name,
            JSON.parse(toolCall.function.arguments)
          );
          
          return {
            toolCallId: toolCall.id,
            result,
          };
        })
      );
      
      // Send tool results back to AI
      const followUpResponse = await this.gateway.chat({
        messages: [
          ...request.messages,
          ...response.messages,
          ...toolResults.map(tr => ({
            role: 'tool',
            toolCallId: tr.toolCallId,
            content: JSON.stringify(tr.result),
          })),
        ],
      });
      
      return followUpResponse;
    }
    
    return response;
  }
  
  private toolParametersToSchema(parameters: ToolParameter[]): Record<string, any> {
    const schema: Record<string, any> = {};
    
    for (const param of parameters) {
      schema[param.name] = {
        type: param.type,
        description: param.description,
      };
    }
    
    return schema;
  }
}
```

### Tool Implementations

#### Content Search Tool

```typescript
class ContentSearchTool implements Tool {
  id = 'content-search';
  name = 'Content Search';
  description = 'Search for content in the workspace';
  parameters = [
    {
      name: 'query',
      type: 'string',
      required: true,
      description: 'Search query',
    },
    {
      name: 'contentType',
      type: 'string',
      required: false,
      description: 'Content type to filter by',
    },
  ];
  
  async execute(params: Record<string, any>): Promise<ToolResult> {
    const { query, contentType } = params;
    
    // Search content
    const results = await this.searchContent(query, contentType);
    
    return {
      success: true,
      output: results,
    };
  }
  
  private async searchContent(query: string, contentType?: string): Promise<any[]> {
    // Implement search logic
    return [];
  }
}
```

#### Content Create Tool

```typescript
class ContentCreateTool implements Tool {
  id = 'content-create';
  name = 'Content Create';
  description = 'Create new content';
  parameters = [
    {
      name: 'type',
      type: 'string',
      required: true,
      description: 'Content type',
    },
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Content title',
    },
    {
      name: 'content',
      type: 'string',
      required: true,
      description: 'Content body',
    },
  ];
  
  async execute(params: Record<string, any>): Promise<ToolResult> {
    const { type, title, content } = params;
    
    // Create content
    const result = await this.createContent(type, title, content);
    
    return {
      success: true,
      output: result,
    };
  }
  
  private async createContent(type: string, title: string, content: string): Promise<any> {
    // Implement create logic
    return {};
  }
}
```

---

## MCP INTEGRATION

### MCP Architecture

```typescript
class MCPClient {
  private connections = new Map<string, MCPConnection>();
  
  async connect(serverId: string, config: MCPConfig): Promise<void> {
    const connection = new MCPConnection(serverId, config);
    await connection.connect();
    this.connections.set(serverId, connection);
  }
  
  async callTool(serverId: string, toolName: string, params: any): Promise<any> {
    const connection = this.connections.get(serverId);
    if (!connection) {
      throw new Error(`MCP connection not found: ${serverId}`);
    }
    
    return await connection.callTool(toolName, params);
  }
  
  async listTools(serverId: string): Promise<MCPTool[]> {
    const connection = this.connections.get(serverId);
    if (!connection) {
      throw new Error(`MCP connection not found: ${serverId}`);
    }
    
    return await connection.listTools();
  }
  
  async listResources(serverId: string): Promise<MCPResource[]> {
    const connection = this.connections.get(serverId);
    if (!connection) {
      throw new Error(`MCP connection not found: ${serverId}`);
    }
    
    return await connection.listResources();
  }
  
  async readResource(serverId: string, uri: string): Promise<any> {
    const connection = this.connections.get(serverId);
    if (!connection) {
      throw new Error(`MCP connection not found: ${serverId}`);
    }
    
    return await connection.readResource(uri);
  }
}

class MCPConnection {
  private serverId: string;
  private config: MCPConfig;
  private client: any;
  
  constructor(serverId: string, config: MCPConfig) {
    this.serverId = serverId;
    this.config = config;
  }
  
  async connect(): Promise<void> {
    // Connect to MCP server
    this.client = await this.createClient();
  }
  
  async callTool(toolName: string, params: any): Promise<any> {
    return await this.client.callTool({
      name: toolName,
      arguments: params,
    });
  }
  
  async listTools(): Promise<MCPTool[]> {
    const response = await this.client.listTools();
    return response.tools;
  }
  
  async listResources(): Promise<MCPResource[]> {
    const response = await this.client.listResources();
    return response.resources;
  }
  
  async readResource(uri: string): Promise<any> {
    const response = await this.client.readResource({ uri });
    return response.contents;
  }
  
  private async createClient(): Promise<any> {
    // Create MCP client based on config
    // Support stdio, SSE, WebSocket transports
    return {};
  }
}

interface MCPConfig {
  transport: 'stdio' | 'sse' | 'websocket';
  command?: string;
  args?: string[];
  url?: string;
  env?: Record<string, string>;
}

interface MCPTool {
  name: string;
  description: string;
  inputSchema: any;
}

interface MCPResource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
}
```

### MCP Tool Adapter

```typescript
class MCPToolAdapter implements Tool {
  id: string;
  name: string;
  description: string;
  parameters: ToolParameter[];
  
  private mcpClient: MCPClient;
  private serverId: string;
  private toolName: string;
  
  constructor(
    mcpClient: MCPClient,
    serverId: string,
    mcpTool: MCPTool
  ) {
    this.mcpClient = mcpClient;
    this.serverId = serverId;
    this.toolName = mcpTool.name;
    this.id = `mcp:${serverId}:${mcpTool.name}`;
    this.name = mcpTool.name;
    this.description = mcpTool.description;
    this.parameters = this.schemaToParameters(mcpTool.inputSchema);
  }
  
  async execute(params: Record<string, any>): Promise<ToolResult> {
    try {
      const output = await this.mcpClient.callTool(
        this.serverId,
        this.toolName,
        params
      );
      
      return {
        success: true,
        output,
      };
    } catch (error) {
      return {
        success: false,
        output: null,
        error: error as Error,
      };
    }
  }
  
  private schemaToParameters(schema: any): ToolParameter[] {
    // Convert JSON Schema to ToolParameter[]
    return [];
  }
}
```

---

## NEXT STEPS

1. **Design Studio UX** - Dashboard, quick actions, recent content, draft center, scheduled publishing, activity feed, team workspace, command palette, spotlight search, AI assistant, global search
2. **Design plugin architecture** - Plugin system with hooks, lifecycle, marketplace
3. **Design extension architecture** - Extension system
4. **Design permission system** - RBAC with field-level and document-level permissions
5. **Design navigation architecture** - Navigation system
6. **Design workspace system** - Workspace system
7. **Design review system** - Review system
8. **Generate full architecture** - After all research and analysis
