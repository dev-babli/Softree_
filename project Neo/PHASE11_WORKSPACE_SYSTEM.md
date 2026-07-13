# PHASE 11: WORKSPACE SYSTEM

## Overview

This document provides a comprehensive workspace system design for Project Neo's AI-native Agency Platform. The architecture covers the workspace system design, building on patterns from Linear, Notion, Arc, and modern SaaS platforms.

---

## ARCHITECTURE PRINCIPLES

### 1. Logical Isolation
- Each workspace is logically isolated
- Separate data, users, and settings
- Workspace-specific configurations
- Workspace-specific permissions

### 2. Multi-Tenancy
- Support multiple workspaces per user
- Workspace switching
- Cross-workspace visibility (optional)
- Workspace templates

### 3. Scalability
- Horizontal scaling per workspace
- Resource quotas per workspace
- Performance isolation
- Independent deployment

### 4. Flexibility
- Custom workspace configurations
- Workspace-specific branding
- Workspace-specific schemas
- Workspace-specific plugins

### 5. Collaboration
- Team management per workspace
- Role-based access per workspace
- Activity feeds per workspace
- Real-time collaboration per workspace

---

## WORKSPACE MODEL

### Workspace Definition

```typescript
interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  
  // Branding
  logo?: string;
  favicon?: string;
  theme?: WorkspaceTheme;
  
  // Configuration
  settings: WorkspaceSettings;
  features: WorkspaceFeatures;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  
  // Status
  status: 'active' | 'suspended' | 'archived';
  
  // Quotas
  quotas: WorkspaceQuotas;
  
  // Billing
  plan: WorkspacePlan;
  trialEndsAt?: Date;
}

interface WorkspaceTheme {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  customCSS?: string;
}

interface WorkspaceSettings {
  siteName: string;
  siteDescription: string;
  defaultLocale: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  
  // Content settings
  autoPublish: boolean;
  requireApproval: boolean;
  versionHistory: boolean;
  
  // Collaboration settings
  allowComments: boolean;
  allowGuests: boolean;
  guestPermissions: Permission[];
  
  // AI settings
  aiEnabled: boolean;
  aiProvider: string;
  aiModel: string;
  
  // Notification settings
  emailNotifications: boolean;
  pushNotifications: boolean;
  slackIntegration?: SlackIntegration;
}

interface WorkspaceFeatures {
  contentTypes: string[];
  plugins: string[];
  extensions: string[];
  integrations: string[];
}

interface WorkspaceQuotas {
  maxUsers: number;
  maxContent: number;
  maxStorage: number; // in bytes
  maxApiCalls: number; // per month
  maxAiTokens: number; // per month
}

interface WorkspacePlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
}

interface SlackIntegration {
  enabled: boolean;
  webhookUrl?: string;
  channels: {
    contentPublished?: string;
    contentUpdated?: string;
    userInvited?: string;
  };
}
```

---

## WORKSPACE MANAGER

### Workspace Management

```typescript
class WorkspaceManager {
  private workspaces = new Map<string, Workspace>();
  private userWorkspaces = new Map<string, Set<string>>();
  
  async create(
    name: string,
    userId: string,
    options?: CreateWorkspaceOptions
  ): Promise<Workspace> {
    // Generate unique ID and slug
    const id = generateId();
    const slug = generateSlug(name);
    
    // Create workspace
    const workspace: Workspace = {
      id,
      name,
      slug,
      description: options?.description,
      logo: options?.logo,
      favicon: options?.favicon,
      theme: options?.theme || defaultTheme,
      settings: options?.settings || defaultSettings,
      features: options?.features || defaultFeatures,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userId,
      status: 'active',
      quotas: options?.quotas || defaultQuotas,
      plan: options?.plan || freePlan,
      trialEndsAt: options?.trialEndsAt,
    };
    
    // Store workspace
    this.workspaces.set(id, workspace);
    
    // Add to user's workspaces
    if (!this.userWorkspaces.has(userId)) {
      this.userWorkspaces.set(userId, new Set());
    }
    this.userWorkspaces.get(userId)!.add(id);
    
    // Assign owner role
    await this.assignRole(userId, id, 'owner', userId);
    
    // Initialize workspace
    await this.initializeWorkspace(id);
    
    return workspace;
  }
  
  async update(id: string, updates: Partial<Workspace>): Promise<Workspace> {
    const workspace = this.workspaces.get(id);
    if (!workspace) {
      throw new Error(`Workspace not found: ${id}`);
    }
    
    const updated = {
      ...workspace,
      ...updates,
      updatedAt: new Date(),
    };
    
    this.workspaces.set(id, updated);
    
    return updated;
  }
  
  async delete(id: string): Promise<void> {
    const workspace = this.workspaces.get(id);
    if (!workspace) {
      throw new Error(`Workspace not found: ${id}`);
    }
    
    // Archive instead of delete
    await this.update(id, { status: 'archived' });
    
    // Remove from all users
    for (const [userId, workspaceIds] of this.userWorkspaces.entries()) {
      workspaceIds.delete(id);
    }
  }
  
  get(id: string): Workspace | undefined {
    return this.workspaces.get(id);
  }
  
  getBySlug(slug: string): Workspace | undefined {
    for (const workspace of this.workspaces.values()) {
      if (workspace.slug === slug) {
        return workspace;
      }
    }
    return undefined;
  }
  
  list(userId?: string): Workspace[] {
    if (userId) {
      const workspaceIds = this.userWorkspaces.get(userId);
      if (!workspaceIds) {
        return [];
      }
      
      return Array.from(workspaceIds)
        .map(id => this.workspaces.get(id))
        .filter((w): w is Workspace => w !== undefined);
    }
    
    return Array.from(this.workspaces.values());
  }
  
  async addUser(userId: string, workspaceId: string, roleId: string, addedBy: string): Promise<void> {
    // Add to user's workspaces
    if (!this.userWorkspaces.has(userId)) {
      this.userWorkspaces.set(userId, new Set());
    }
    this.userWorkspaces.get(userId)!.add(workspaceId);
    
    // Assign role
    await this.assignRole(userId, workspaceId, roleId, addedBy);
  }
  
  async removeUser(userId: string, workspaceId: string): Promise<void> {
    // Remove from user's workspaces
    const workspaceIds = this.userWorkspaces.get(userId);
    if (workspaceIds) {
      workspaceIds.delete(workspaceId);
    }
    
    // Remove role
    await this.unassignRole(userId, workspaceId);
  }
  
  private async assignRole(userId: string, workspaceId: string, roleId: string, assignedBy: string): Promise<void> {
    // Implementation in userRoleManager
  }
  
  private async unassignRole(userId: string, workspaceId: string): Promise<void> {
    // Implementation in userRoleManager
  }
  
  private async initializeWorkspace(workspaceId: string): Promise<void> {
    // Create default content types
    // Create default schemas
    // Create default settings
    // Create default roles
    // Initialize AI configuration
  }
}

interface CreateWorkspaceOptions {
  description?: string;
  logo?: string;
  favicon?: string;
  theme?: WorkspaceTheme;
  settings?: Partial<WorkspaceSettings>;
  features?: Partial<WorkspaceFeatures>;
  quotas?: Partial<WorkspaceQuotas>;
  plan?: WorkspacePlan;
  trialEndsAt?: Date;
}

const defaultTheme: WorkspaceTheme = {
  primaryColor: '#5E6AD2',
  accentColor: '#FF5757',
  backgroundColor: '#07080A',
  textColor: '#FFFFFF',
};

const defaultSettings: WorkspaceSettings = {
  siteName: 'My Workspace',
  siteDescription: '',
  defaultLocale: 'en-US',
  timezone: 'UTC',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  weekStartsOn: 0,
  autoPublish: false,
  requireApproval: false,
  versionHistory: true,
  allowComments: true,
  allowGuests: false,
  guestPermissions: [],
  aiEnabled: true,
  aiProvider: 'openai',
  aiModel: 'gpt-4',
  emailNotifications: true,
  pushNotifications: true,
};

const defaultFeatures: WorkspaceFeatures = {
  contentTypes: ['page', 'post', 'project'],
  plugins: [],
  extensions: [],
  integrations: [],
};

const defaultQuotas: WorkspaceQuotas = {
  maxUsers: 5,
  maxContent: 100,
  maxStorage: 1024 * 1024 * 1024, // 1GB
  maxApiCalls: 10000,
  maxAiTokens: 100000,
};

const freePlan: WorkspacePlan = {
  id: 'free',
  name: 'Free',
  price: 0,
  currency: 'USD',
  interval: 'monthly',
  features: ['5 users', '100 content items', '1GB storage'],
};
```

---

## WORKSPACE SWITCHING

### Switch Context

```typescript
class WorkspaceSwitcher {
  private currentWorkspace: Workspace | null = null;
  private listeners: WorkspaceListener[] = [];
  
  async switch(workspaceId: string, userId: string): Promise<Workspace> {
    // Check if user has access to workspace
    const hasAccess = await this.checkAccess(userId, workspaceId);
    if (!hasAccess) {
      throw new Error('Access denied to workspace');
    }
    
    // Get workspace
    const workspace = workspaceManager.get(workspaceId);
    if (!workspace) {
      throw new Error('Workspace not found');
    }
    
    // Check workspace status
    if (workspace.status !== 'active') {
      throw new Error('Workspace is not active');
    }
    
    // Switch workspace
    const previous = this.currentWorkspace;
    this.currentWorkspace = workspace;
    
    // Notify listeners
    this.notifyListeners(workspace, previous);
    
    return workspace;
  }
  
  getCurrent(): Workspace | null {
    return this.currentWorkspace;
  }
  
  subscribe(listener: WorkspaceListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  private async checkAccess(userId: string, workspaceId: string): Promise<boolean> {
    const userWorkspaces = workspaceManager.list(userId);
    return userWorkspaces.some(w => w.id === workspaceId);
  }
  
  private notifyListeners(current: Workspace, previous: Workspace | null): void {
    for (const listener of this.listeners) {
      listener(current, previous);
    }
  }
}

type WorkspaceListener = (current: Workspace, previous: Workspace | null) => void;
```

### Workspace Switcher UI

```
┌─────────────────────────────────────────────────────────────────┐
│  [Workspace Icon] Main Workspace                  [▼]          │
├─────────────────────────────────────────────────────────────────┤
│  Main Workspace                                    [Active]    │
│  Client A Workspace                                            │
│  Client B Workspace                                            │
│  ────────────────────────────────────────────────────────────  │
│  [+ Create Workspace]                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## WORKSPACE TEMPLATES

### Template System

```typescript
interface WorkspaceTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  
  // Configuration
  settings: Partial<WorkspaceSettings>;
  features: Partial<WorkspaceFeatures>;
  schemas: SchemaTemplate[];
  contentTypes: ContentTypeTemplate[];
  roles: RoleTemplate[];
  
  // Branding
  theme?: WorkspaceTheme;
  
  // Sample content
  sampleContent?: SampleContent[];
}

interface SchemaTemplate {
  name: string;
  schema: any;
}

interface ContentTypeTemplate {
  id: string;
  name: string;
  schema: any;
}

interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

interface SampleContent {
  type: string;
  data: any;
}

class WorkspaceTemplateManager {
  private templates = new Map<string, WorkspaceTemplate>();
  
  register(template: WorkspaceTemplate): void {
    this.templates.set(template.id, template);
  }
  
  get(id: string): WorkspaceTemplate | undefined {
    return this.templates.get(id);
  }
  
  list(): WorkspaceTemplate[] {
    return Array.from(this.templates.values());
  }
  
  async apply(workspaceId: string, templateId: string): Promise<void> {
    const template = this.get(templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }
    
    // Apply settings
    if (template.settings) {
      const workspace = workspaceManager.get(workspaceId);
      if (workspace) {
        await workspaceManager.update(workspaceId, {
          settings: { ...workspace.settings, ...template.settings },
        });
      }
    }
    
    // Apply features
    if (template.features) {
      const workspace = workspaceManager.get(workspaceId);
      if (workspace) {
        await workspaceManager.update(workspaceId, {
          features: { ...workspace.features, ...template.features },
        });
      }
    }
    
    // Apply theme
    if (template.theme) {
      const workspace = workspaceManager.get(workspaceId);
      if (workspace) {
        await workspaceManager.update(workspaceId, {
          theme: template.theme,
        });
      }
    }
    
    // Create schemas
    for (const schemaTemplate of template.schemas) {
      await this.createSchema(workspaceId, schemaTemplate);
    }
    
    // Create content types
    for (const contentTypeTemplate of template.contentTypes) {
      await this.createContentType(workspaceId, contentTypeTemplate);
    }
    
    // Create roles
    for (const roleTemplate of template.roles) {
      await this.createRole(workspaceId, roleTemplate);
    }
    
    // Create sample content
    if (template.sampleContent) {
      for (const sample of template.sampleContent) {
        await this.createSampleContent(workspaceId, sample);
      }
    }
  }
  
  private async createSchema(workspaceId: string, template: SchemaTemplate): Promise<void> {
    // Implementation
  }
  
  private async createContentType(workspaceId: string, template: ContentTypeTemplate): Promise<void> {
    // Implementation
  }
  
  private async createRole(workspaceId: string, template: RoleTemplate): Promise<void> {
    // Implementation
  }
  
  private async createSampleContent(workspaceId: string, sample: SampleContent): Promise<void> {
    // Implementation
  }
}
```

### Built-in Templates

```typescript
const builtInTemplates: WorkspaceTemplate[] = [
  {
    id: 'blank',
    name: 'Blank Workspace',
    description: 'Start from scratch',
    icon: '📄',
    settings: {},
    features: {},
    schemas: [],
    contentTypes: [],
    roles: [],
  },
  {
    id: 'agency',
    name: 'Agency Workspace',
    description: 'Perfect for digital agencies',
    icon: '🏢',
    settings: {
      siteName: 'My Agency',
      requireApproval: true,
      allowComments: true,
    },
    features: {
      contentTypes: ['page', 'post', 'project', 'case-study', 'team-member'],
      plugins: ['analytics', 'seo'],
    },
    schemas: [],
    contentTypes: [],
    roles: [
      {
        id: 'account-manager',
        name: 'Account Manager',
        description: 'Manages client relationships',
        permissions: [
          'workspace:content:create',
          'workspace:content:read',
          'workspace:content:update',
          'workspace:content:publish',
        ],
      },
    ],
  },
  {
    id: 'blog',
    name: 'Blog Workspace',
    description: 'For content creators and bloggers',
    icon: '📝',
    settings: {
      siteName: 'My Blog',
      autoPublish: false,
      requireApproval: false,
    },
    features: {
      contentTypes: ['page', 'post', 'category', 'tag'],
      plugins: ['seo', 'analytics', 'newsletter'],
    },
    schemas: [],
    contentTypes: [],
    roles: [],
  },
  {
    id: 'portfolio',
    name: 'Portfolio Workspace',
    description: 'Showcase your work',
    icon: '🎨',
    settings: {
      siteName: 'My Portfolio',
      requireApproval: false,
    },
    features: {
      contentTypes: ['page', 'project', 'skill'],
      plugins: ['analytics', 'contact-form'],
    },
    schemas: [],
    contentTypes: [],
    roles: [],
  },
];
```

---

## WORKSPACE COLLABORATION

### Team Management

```typescript
interface TeamMember {
  userId: string;
  workspaceId: string;
  roleId: string;
  joinedAt: Date;
  invitedBy: string;
  status: 'active' | 'pending' | 'suspended';
}

class TeamManager {
  private members = new Map<string, TeamMember>();
  
  async invite(
    workspaceId: string,
    email: string,
    roleId: string,
    invitedBy: string
  ): Promise<TeamMember> {
    // Check if user exists
    const user = await userManager.findByEmail(email);
    if (!user) {
      // Send invitation email
      await this.sendInvitationEmail(email, workspaceId, roleId);
      
      // Create pending member
      const member: TeamMember = {
        userId: email, // Use email as placeholder
        workspaceId,
        roleId,
        joinedAt: new Date(),
        invitedBy,
        status: 'pending',
      };
      
      this.members.set(`${workspaceId}:${email}`, member);
      
      return member;
    }
    
    // Add user to workspace
    await workspaceManager.addUser(user.id, workspaceId, roleId, invitedBy);
    
    const member: TeamMember = {
      userId: user.id,
      workspaceId,
      roleId,
      joinedAt: new Date(),
      invitedBy,
      status: 'active',
    };
    
    this.members.set(`${workspaceId}:${user.id}`, member);
    
    // Send notification
    await notificationManager.send(user.id, {
      type: 'workspace_invitation',
      title: `You've been invited to a workspace`,
      message: `You've been invited to join a workspace`,
      link: `/workspaces/${workspaceId}`,
    });
    
    return member;
  }
  
  async remove(workspaceId: string, userId: string): Promise<void> {
    await workspaceManager.removeUser(userId, workspaceId);
    this.members.delete(`${workspaceId}:${userId}`);
  }
  
  async updateRole(
    workspaceId: string,
    userId: string,
    roleId: string,
    updatedBy: string
  ): Promise<void> {
    const member = this.members.get(`${workspaceId}:${userId}`);
    if (!member) {
      throw new Error('Member not found');
    }
    
    member.roleId = roleId;
    
    // Update role in userRoleManager
    await userRoleManager.assign(userId, workspaceId, roleId, updatedBy);
  }
  
  list(workspaceId: string): TeamMember[] {
    const members: TeamMember[] = [];
    
    for (const [key, member] of this.members.entries()) {
      if (member.workspaceId === workspaceId) {
        members.push(member);
      }
    }
    
    return members;
  }
  
  private async sendInvitationEmail(email: string, workspaceId: string, roleId: string): Promise<void> {
    // Implementation
  }
}
```

### Activity Feed

```typescript
interface Activity {
  id: string;
  workspaceId: string;
  userId: string;
  type: ActivityType;
  entityType: string;
  entityId: string;
  data: Record<string, any>;
  timestamp: Date;
}

type ActivityType =
  | 'content_created'
  | 'content_updated'
  | 'content_deleted'
  | 'content_published'
  | 'user_invited'
  | 'user_joined'
  | 'user_left'
  | 'role_changed'
  | 'setting_changed';

class ActivityFeed {
  private activities = new Map<string, Activity>();
  
  async log(activity: Omit<Activity, 'id' | 'timestamp'>): Promise<Activity> {
    const id = generateId();
    const fullActivity: Activity = {
      id,
      ...activity,
      timestamp: new Date(),
    };
    
    this.activities.set(id, fullActivity);
    
    // Broadcast to workspace members
    await this.broadcast(fullActivity);
    
    return fullActivity;
  }
  
  list(workspaceId: string, options?: ActivityListOptions): Activity[] {
    let activities = Array.from(this.activities.values())
      .filter(a => a.workspaceId === workspaceId);
    
    if (options?.userId) {
      activities = activities.filter(a => a.userId === options.userId);
    }
    
    if (options?.type) {
      activities = activities.filter(a => a.type === options.type);
    }
    
    if (options?.entityType) {
      activities = activities.filter(a => a.entityType === options.entityType);
    }
    
    if (options?.from) {
      activities = activities.filter(a => a.timestamp >= options.from);
    }
    
    if (options?.to) {
      activities = activities.filter(a => a.timestamp <= options.to);
    }
    
    // Sort by timestamp descending
    activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    // Limit
    if (options?.limit) {
      activities = activities.slice(0, options.limit);
    }
    
    return activities;
  }
  
  private async broadcast(activity: Activity): Promise<void> {
    // Broadcast via WebSocket to workspace members
    const members = teamManager.list(activity.workspaceId);
    
    for (const member of members) {
      if (member.status === 'active') {
        await websocketManager.send(member.userId, {
          type: 'activity',
          data: activity,
        });
      }
    }
  }
}

interface ActivityListOptions {
  userId?: string;
  type?: ActivityType;
  entityType?: string;
  from?: Date;
  to?: Date;
  limit?: number;
}
```

---

## WORKSPACE SETTINGS

### Settings Management

```typescript
class WorkspaceSettingsManager {
  async update(
    workspaceId: string,
    settings: Partial<WorkspaceSettings>
  ): Promise<WorkspaceSettings> {
    const workspace = workspaceManager.get(workspaceId);
    if (!workspace) {
      throw new Error('Workspace not found');
    }
    
    const updated = {
      ...workspace.settings,
      ...settings,
    };
    
    await workspaceManager.update(workspaceId, {
      settings: updated,
    });
    
    return updated;
  }
  
  get(workspaceId: string): WorkspaceSettings {
    const workspace = workspaceManager.get(workspaceId);
    if (!workspace) {
      throw new Error('Workspace not found');
    }
    
    return workspace.settings;
  }
  
  reset(workspaceId: string): Promise<WorkspaceSettings> {
    return this.update(workspaceId, defaultSettings);
  }
}
```

---

## WORKSPACE QUOTAS

### Quota Management

```typescript
class QuotaManager {
  private usage = new Map<string, QuotaUsage>();
  
  async check(workspaceId: string, quotaType: QuotaType): Promise<boolean> {
    const workspace = workspaceManager.get(workspaceId);
    if (!workspace) {
      throw new Error('Workspace not found');
    }
    
    const usage = this.getUsage(workspaceId);
    const limit = workspace.quotas[quotaType];
    
    return usage[quotaType] < limit;
  }
  
  async increment(workspaceId: string, quotaType: QuotaType, amount: number = 1): Promise<void> {
    const usage = this.getUsage(workspaceId);
    usage[quotaType] += amount;
    
    // Check if over limit
    const workspace = workspaceManager.get(workspaceId);
    if (workspace) {
      const limit = workspace.quotas[quotaType];
      if (usage[quotaType] > limit) {
        throw new Error(`Quota exceeded: ${quotaType}`);
      }
    }
  }
  
  getUsage(workspaceId: string): QuotaUsage {
    if (!this.usage.has(workspaceId)) {
      this.usage.set(workspaceId, {
        users: 0,
        content: 0,
        storage: 0,
        apiCalls: 0,
        aiTokens: 0,
      });
    }
    
    return this.usage.get(workspaceId)!;
  }
  
  reset(workspaceId: string): void {
    this.usage.delete(workspaceId);
  }
}

type QuotaType = keyof WorkspaceQuotas;

interface QuotaUsage {
  users: number;
  content: number;
  storage: number;
  apiCalls: number;
  aiTokens: number;
}
```

---

## NEXT STEPS

1. **Design review system** - Review system
2. **Generate full architecture** - After all research and analysis
