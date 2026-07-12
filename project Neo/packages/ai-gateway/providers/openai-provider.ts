import type { AIChatRequest, AIContext, AIProvider, AIResponse, AIStreamChunk, ProviderConfig } from '..';

export class OpenAIProvider implements AIProvider {
  readonly name = 'openai';

  constructor(private config: ProviderConfig) {}

  async chat(request: AIChatRequest, _context?: AIContext): Promise<AIResponse> {
    const response = await fetch(`${this.config.baseUrl ?? 'https://api.openai.com/v1'}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: request.model ?? this.config.defaultModel,
        messages: request.messages,
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens,
        tools: request.tools,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const choice = data.choices?.[0];

    return {
      content: choice?.message?.content ?? '',
      toolCalls: choice?.message?.tool_calls?.map((t: any) => ({
        id: t.id,
        name: t.function?.name,
        arguments: t.function?.arguments ? JSON.parse(t.function.arguments) : {},
      })),
      usage: {
        promptTokens: data.usage?.prompt_tokens ?? 0,
        completionTokens: data.usage?.completion_tokens ?? 0,
        totalTokens: data.usage?.total_tokens ?? 0,
      },
      provider: this.name,
      model: request.model ?? this.config.defaultModel,
    };
  }

  async *stream(request: AIChatRequest, _context?: AIContext): AsyncIterable<AIStreamChunk> {
    const response = await fetch(`${this.config.baseUrl ?? 'https://api.openai.com/v1'}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: request.model ?? this.config.defaultModel,
        messages: request.messages,
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens,
        tools: request.tools,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI stream failed: ${response.status} ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.replace(/^data: /, '').trim();
        if (!trimmed || trimmed === '[DONE]') continue;

        try {
          const parsed = JSON.parse(trimmed);
          const delta = parsed.choices?.[0]?.delta;
          if (delta?.content) {
            yield { content: delta.content, done: false };
          }
        } catch {
          // Ignore malformed SSE chunks
        }
      }
    }

    yield { content: '', done: true };
  }

  async listModels(): Promise<string[]> {
    return ['gpt-4o', 'gpt-4o-mini', 'o1-preview', 'o1-mini'];
  }
}
