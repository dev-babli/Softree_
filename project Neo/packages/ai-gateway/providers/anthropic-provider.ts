import type { AIChatRequest, AIContext, AIProvider, AIResponse, AIStreamChunk, ProviderConfig } from '..';

export class AnthropicProvider implements AIProvider {
  readonly name = 'anthropic';

  constructor(private config: ProviderConfig) {}

  async chat(request: AIChatRequest, _context?: AIContext): Promise<AIResponse> {
    const response = await fetch(`${this.config.baseUrl ?? 'https://api.anthropic.com'}/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: request.model ?? this.config.defaultModel,
        messages: request.messages.map((m) => ({
          role: m.role === 'system' ? 'user' : m.role,
          content: m.content,
        })),
        max_tokens: request.maxTokens ?? 4096,
        temperature: request.temperature ?? 0.7,
        tools: request.tools?.map((t) => ({
          name: t.name,
          description: t.description,
          input_schema: t.parameters,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.content?.find((c: any) => c.type === 'text')?.text ?? '';

    return {
      content,
      usage: {
        promptTokens: data.usage?.input_tokens ?? 0,
        completionTokens: data.usage?.output_tokens ?? 0,
        totalTokens: (data.usage?.input_tokens ?? 0) + (data.usage?.output_tokens ?? 0),
      },
      provider: this.name,
      model: request.model ?? this.config.defaultModel,
    };
  }

  async *stream(request: AIChatRequest, _context?: AIContext): AsyncIterable<AIStreamChunk> {
    const response = await fetch(`${this.config.baseUrl ?? 'https://api.anthropic.com'}/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: request.model ?? this.config.defaultModel,
        messages: request.messages.map((m) => ({
          role: m.role === 'system' ? 'user' : m.role,
          content: m.content,
        })),
        max_tokens: request.maxTokens ?? 4096,
        temperature: request.temperature ?? 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic stream failed: ${response.status} ${response.statusText}`);
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
        if (!trimmed) continue;

        try {
          const parsed = JSON.parse(trimmed);
          const delta = parsed.delta;
          if (delta?.text) {
            yield { content: delta.text, done: false };
          }
        } catch {
          // Ignore malformed SSE chunks
        }
      }
    }

    yield { content: '', done: true };
  }

  async listModels(): Promise<string[]> {
    return ['claude-3-5-sonnet-20241022', 'claude-3-opus-20240229', 'claude-3-haiku-20240307'];
  }
}
