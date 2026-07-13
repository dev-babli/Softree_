// Core platform types

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  settings: WorkspaceSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkspaceSettings {
  theme: 'dark' | 'light' | 'system';
  aiEnabled: boolean;
  aiProvider: string;
  aiModel: string;
  defaultContentTypes: string[];
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  roleId: string;
  status: 'active' | 'pending' | 'suspended';
  joinedAt: Date;
}

export interface Role {
  id: string;
  name: string;
  description: string | null;
  permissions: Permission[];
  isSystem: boolean;
}

export interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export interface ContentDocument {
  id: string;
  workspaceId: string;
  type: string;
  title: string;
  slug: string;
  status: 'draft' | 'review' | 'published' | 'archived';
  data: Record<string, any>;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
}

export interface MediaAsset {
  id: string;
  workspaceId: string;
  name: string;
  url: string;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  altText: string | null;
  createdBy: string;
  createdAt: Date;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  shortcut?: string;
  children?: NavigationItem[];
}

export interface Notification {
  id: string;
  userId: string;
  workspaceId: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  link: string | null;
  createdAt: Date;
}

// AI types

export interface AIMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  toolCalls?: ToolCall[];
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, any>;
}

export interface AIChatRequest {
  messages: AIMessage[];
  provider?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  tools?: AITool[];
  stream?: boolean;
}

export interface AITool {
  name: string;
  description: string;
  parameters: Record<string, any>;
}

export interface AIContext {
  userId: string;
  workspaceId: string;
  documentId?: string;
  conversationId?: string;
}

export interface AIStreamChunk {
  content: string;
  toolCall?: Partial<ToolCall>;
  done: boolean;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AIResponse {
  content: string;
  toolCalls?: ToolCall[];
  usage: TokenUsage;
  provider: string;
  model: string;
}
