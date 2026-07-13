import { NextRequest, NextResponse } from 'next/server';
import { AIGateway, OpenAIProvider, AnthropicProvider } from '@neo/ai-gateway';
import type { AIChatRequest } from '@neo/types';

const gateway = new AIGateway();

if (process.env.OPENAI_API_KEY) {
  gateway.registerProvider(
    new OpenAIProvider({
      name: 'openai',
      apiKey: process.env.OPENAI_API_KEY,
      defaultModel: 'gpt-4o-mini',
      enabled: true,
    }),
    { name: 'openai', apiKey: process.env.OPENAI_API_KEY, defaultModel: 'gpt-4o-mini', enabled: true }
  );
}

if (process.env.ANTHROPIC_API_KEY) {
  gateway.registerProvider(
    new AnthropicProvider({
      name: 'anthropic',
      apiKey: process.env.ANTHROPIC_API_KEY,
      defaultModel: 'claude-3-5-sonnet-20241022',
      enabled: true,
    }),
    {
      name: 'anthropic',
      apiKey: process.env.ANTHROPIC_API_KEY,
      defaultModel: 'claude-3-5-sonnet-20241022',
      enabled: true,
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body: AIChatRequest = await request.json();

    if (body.stream) {
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of gateway.stream(body)) {
              controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(chunk)}\n\n`));
            }
            controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    const response = await gateway.chat(body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
