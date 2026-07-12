import type { AIChatRequest, AIMessage, AIResponse, AIStreamChunk, AIContext, AITool } from '@neo/types';

export interface ProviderConfig {
  name: string;
  apiKey: string;
  baseUrl?: string;
  defaultModel: string;
  enabled: boolean;
}

export interface AIProvider {
  readonly name: string;
  chat(request: AIChatRequest, context?: AIContext): Promise<AIResponse>;
  stream(request: AIChatRequest, context?: AIContext): AsyncIterable<AIStreamChunk>;
  listModels(): Promise<string[]>;
}

export type { AIContext, AIChatRequest, AIMessage, AIResponse, AIStreamChunk, AITool } from '@neo/types';

export class AIGateway {
  private providers = new Map<string, AIProvider>();
  private configs = new Map<string, ProviderConfig>();

  registerProvider(provider: AIProvider, config: ProviderConfig): void {
    this.providers.set(config.name, provider);
    this.configs.set(config.name, config);
  }

  getProvider(name?: string): AIProvider {
    const providerName = name ?? this.getDefaultProviderName();
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new Error(`AI provider "${providerName}" not found`);
    }
    return provider;
  }

  getDefaultProviderName(): string {
    for (const [name, config] of this.configs) {
      if (config.enabled) return name;
    }
    throw new Error('No AI provider configured');
  }

  async chat(request: AIChatRequest, context?: AIContext): Promise<AIResponse> {
    return this.getProvider(request.provider).chat(request, context);
  }

  async *stream(request: AIChatRequest, context?: AIContext): AsyncIterable<AIStreamChunk> {
    yield* this.getProvider(request.provider).stream(request, context);
  }

  listProviders(): { name: string; enabled: boolean; defaultModel: string }[] {
    return Array.from(this.configs.entries()).map(([name, config]) => ({
      name,
      enabled: config.enabled,
      defaultModel: config.defaultModel,
    }));
  }
}

export function createSystemPrompt(context: AIContext, basePrompt?: string): AIMessage {
  return {
    role: 'system',
    content: basePrompt ?? `You are Neo, an AI assistant for an agency content platform.`,
  };
}

export function createUserPrompt(content: string): AIMessage {
  return { role: 'user', content };
}

export { OpenAIProvider } from './providers/openai-provider';
export { AnthropicProvider } from './providers/anthropic-provider';
export {
  promptLibrary,
  getPromptTemplate,
  buildPrompt,
  listPrompts,
  type PromptTemplate,
} from './prompts';
export {
  InMemoryStore,
  type MemoryStore,
  type MemoryEntry,
  type ConversationSummary,
} from './memory';
