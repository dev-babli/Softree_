import type { AIMessage } from '@neo/types';

export interface MemoryEntry {
  id: string;
  conversationId: string;
  role: AIMessage['role'];
  content: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface ConversationSummary {
  id: string;
  conversationId: string;
  summary: string;
  lastMessageAt: Date;
}

export interface MemoryStore {
  getMessages(conversationId: string, limit?: number): Promise<MemoryEntry[]>;
  addMessage(entry: Omit<MemoryEntry, 'id' | 'createdAt'>): Promise<MemoryEntry>;
  getSummary(conversationId: string): Promise<ConversationSummary | null>;
  saveSummary(summary: Omit<ConversationSummary, 'id'>): Promise<ConversationSummary>;
}

export class InMemoryStore implements MemoryStore {
  private messages: MemoryEntry[] = [];
  private summaries: Map<string, ConversationSummary> = new Map();
  private idCounter = 0;

  async getMessages(conversationId: string, limit = 50): Promise<MemoryEntry[]> {
    return this.messages
      .filter((m) => m.conversationId === conversationId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit)
      .reverse();
  }

  async addMessage(entry: Omit<MemoryEntry, 'id' | 'createdAt'>): Promise<MemoryEntry> {
    const newEntry: MemoryEntry = {
      ...entry,
      id: `mem_${++this.idCounter}`,
      createdAt: new Date(),
    };
    this.messages.push(newEntry);
    return newEntry;
  }

  async getSummary(conversationId: string): Promise<ConversationSummary | null> {
    return this.summaries.get(conversationId) ?? null;
  }

  async saveSummary(summary: Omit<ConversationSummary, 'id'>): Promise<ConversationSummary> {
    const newSummary: ConversationSummary = {
      ...summary,
      id: `sum_${++this.idCounter}`,
    };
    this.summaries.set(summary.conversationId, newSummary);
    return newSummary;
  }
}
