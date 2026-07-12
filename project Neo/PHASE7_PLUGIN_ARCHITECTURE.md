# PHASE 7: PLUGIN ARCHITECTURE

## Overview

This document provides a comprehensive plugin architecture design for Project Neo's AI-native Agency Platform. The architecture covers plugin system design with hooks, lifecycle, marketplace, and developer experience, building on patterns from Payload, Directus, Contentful, and Raycast.

---

## ARCHITECTURE PRINCIPLES

### 1. Code-First Configuration
- Plugins defined in code (TypeScript)
- Version controlled
- Type-safe
- No click-ops

### 2. Extensibility
- Hooks for every operation
- Custom components
- Custom fields
- Custom endpoints
- Custom workflows

### 3. Isolation
- Sandboxed execution
- Resource limits
- Permission boundaries
- Error isolation

### 4. Discoverability
- Plugin marketplace
- Clear documentation
- Examples and templates
- Community contributions

### 5. Performance
- Lazy loading
- Code splitting
- Caching
- Optimized builds

---

## PLUGIN SYSTEM

### Plugin Interface

```typescript
interface Plugin {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  
  // Lifecycle hooks
  onLoad?(context: PluginContext): Promise<void> | void;
  onUnload?(context: PluginContext): Promise<void> | void;
  
  // Feature hooks
  hooks?: PluginHooks;
  
  // Components
  components?: PluginComponents;
  
  // Endpoints
  endpoints?: PluginEndpoints;
  
  // Fields
  fields?: PluginFields;
  
  // Commands
  commands?: PluginCommands;
  
  // Settings
  settings?: PluginSettings;
}

interface PluginContext {
  workspace: WorkspaceContext;
  user: UserContext;
  config: PluginConfig;
  api: PluginAPI;
  logger: Logger;
  events: EventEmitter;
}

interface PluginAPI {
  // Content API
  content: ContentAPI;
  
  // User API
  user: UserAPI;
  
  // Workspace API
  workspace: WorkspaceAPI;
  
  // Storage API
  storage: StorageAPI;
  
  // AI API
  ai: AIAPI;
  
  // UI API
  ui: UIAPI;
  
  // Hooks API
  hooks: HooksAPI;
}
```

### Plugin Registry

```typescript
class PluginRegistry {
  private plugins = new Map<string, Plugin>();
  private loadedPlugins = new Set<string>();
  private pluginStates = new Map<string, PluginState>();
  
  register(plugin: Plugin): void {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin already registered: ${plugin.id}`);
    }
    
    this.plugins.set(plugin.id, plugin);
    this.pluginStates.set(plugin.id, {
      id: plugin.id,
      status: 'registered',
      version: plugin.version,
      loadedAt: null,
      error: null,
    });
  }
  
  async load(pluginId: string, context: PluginContext): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin not found: ${pluginId}`);
    }
    
    if (this.loadedPlugins.has(pluginId)) {
      return;
    }
    
    try {
      // Call onLoad hook
      if (plugin.onLoad) {
        await plugin.onLoad(context);
      }
      
      // Register hooks
      if (plugin.hooks) {
        this.registerHooks(pluginId, plugin.hooks, context);
      }
      
      // Register components
      if (plugin.components) {
        this.registerComponents(pluginId, plugin.components, context);
      }
      
      // Register endpoints
      if (plugin.endpoints) {
        this.registerEndpoints(pluginId, plugin.endpoints, context);
      }
      
      // Register fields
      if (plugin.fields) {
        this.registerFields(pluginId, plugin.fields, context);
      }
      
      // Register commands
      if (plugin.commands) {
        this.registerCommands(pluginId, plugin.commands, context);
      }
      
      this.loadedPlugins.add(pluginId);
      this.pluginStates.set(pluginId, {
        id: pluginId,
        status: 'loaded',
        version: plugin.version,
        loadedAt: new Date(),
        error: null,
      });
      
      context.logger.info(`Plugin loaded: ${pluginId}`);
    } catch (error) {
      this.pluginStates.set(pluginId, {
        id: pluginId,
        status: 'error',
        version: plugin.version,
        loadedAt: null,
        error: error as Error,
      });
      
      context.logger.error(`Plugin failed to load: ${pluginId}`, error);
      throw error;
    }
  }
  
  async unload(pluginId: string, context: PluginContext): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin not found: ${pluginId}`);
    }
    
    if (!this.loadedPlugins.has(pluginId)) {
      return;
    }
    
    try {
      // Call onUnload hook
      if (plugin.onUnload) {
        await plugin.onUnload(context);
      }
      
      // Unregister hooks
      if (plugin.hooks) {
        this.unregisterHooks(pluginId, plugin.hooks);
      }
      
      // Unregister components
      if (plugin.components) {
        this.unregisterComponents(pluginId, plugin.components);
      }
      
      // Unregister endpoints
      if (plugin.endpoints) {
        this.unregisterEndpoints(pluginId, plugin.endpoints);
      }
      
      // Unregister fields
      if (plugin.fields) {
        this.unregisterFields(pluginId, plugin.fields);
      }
      
      // Unregister commands
      if (plugin.commands) {
        this.unregisterCommands(pluginId, plugin.commands);
      }
      
      this.loadedPlugins.delete(pluginId);
      this.pluginStates.set(pluginId, {
        id: pluginId,
        status: 'unloaded',
        version: plugin.version,
        loadedAt: null,
        error: null,
      });
      
      context.logger.info(`Plugin unloaded: ${pluginId}`);
    } catch (error) {
      context.logger.error(`Plugin failed to unload: ${pluginId}`, error);
      throw error;
    }
  }
  
  get(pluginId: string): Plugin | undefined {
    return this.plugins.get(pluginId);
  }
  
  list(): Plugin[] {
    return Array.from(this.plugins.values());
  }
  
  getState(pluginId: string): PluginState | undefined {
    return this.pluginStates.get(pluginId);
  }
  
  private registerHooks(pluginId: string, hooks: PluginHooks, context: PluginContext): void {
    // Register each hook with the hooks API
    const hooksAPI = context.api.hooks;
    
    for (const [hookName, hookFn] of Object.entries(hooks)) {
      hooksAPI.register(hookName as HookName, hookFn, { pluginId });
    }
  }
  
  private registerComponents(pluginId: string, components: PluginComponents, context: PluginContext): void {
    // Register each component with the UI API
    const uiAPI = context.api.ui;
    
    for (const [componentName, component] of Object.entries(components)) {
      uiAPI.registerComponent(componentName, component, { pluginId });
    }
  }
  
  private registerEndpoints(pluginId: string, endpoints: PluginEndpoints, context: PluginContext): void {
    // Register each endpoint with the content API
    const contentAPI = context.api.content;
    
    for (const [endpointPath, endpoint] of Object.entries(endpoints)) {
      contentAPI.registerEndpoint(endpointPath, endpoint, { pluginId });
    }
  }
  
  private registerFields(pluginId: string, fields: PluginFields, context: PluginContext): void {
    // Register each field with the content API
    const contentAPI = context.api.content;
    
    for (const [fieldName, field] of Object.entries(fields)) {
      contentAPI.registerField(fieldName, field, { pluginId });
    }
  }
  
  private registerCommands(pluginId: string, commands: PluginCommands, context: PluginContext): void {
    // Register each command with the UI API
    const uiAPI = context.api.ui;
    
    for (const [commandName, command] of Object.entries(commands)) {
      uiAPI.registerCommand(commandName, command, { pluginId });
    }
  }
  
  // Unregister methods...
}

interface PluginState {
  id: string;
  status: 'registered' | 'loading' | 'loaded' | 'unloading' | 'unloaded' | 'error';
  version: string;
  loadedAt: Date | null;
  error: Error | null;
}
```

---

## HOOKS SYSTEM

### Hook Types

```typescript
type HookName =
  // Content hooks
  | 'content:beforeCreate'
  | 'content:afterCreate'
  | 'content:beforeUpdate'
  | 'content:afterUpdate'
  | 'content:beforeDelete'
  | 'content:afterDelete'
  | 'content:beforePublish'
  | 'content:afterPublish'
  | 'content:beforeUnpublish'
  | 'content:afterUnpublish'
  
  // User hooks
  | 'user:beforeCreate'
  | 'user:afterCreate'
  | 'user:beforeUpdate'
  | 'user:afterUpdate'
  | 'user:beforeDelete'
  | 'user:afterDelete'
  | 'user:beforeLogin'
  | 'user:afterLogin'
  | 'user:beforeLogout'
  | 'user:afterLogout'
  
  // Workspace hooks
  | 'workspace:beforeCreate'
  | 'workspace:afterCreate'
  | 'workspace:beforeUpdate'
  | 'workspace:afterUpdate'
  | 'workspace:beforeDelete'
  | 'workspace:afterDelete'
  
  // AI hooks
  | 'ai:beforeGenerate'
  | 'ai:afterGenerate'
  | 'ai:beforeToolCall'
  | 'ai:afterToolCall'
  
  // UI hooks
  | 'ui:beforeRender'
  | 'ui:afterRender'
  | 'ui:beforeAction'
  | 'ui:afterAction';

interface PluginHooks {
  [key: string]: HookFunction;
}

type HookFunction = (context: HookContext) => Promise<void> | void | Promise<HookResult> | HookResult;

interface HookContext {
  event: HookEvent;
  workspace: WorkspaceContext;
  user: UserContext;
  plugin: Plugin;
  api: PluginAPI;
  logger: Logger;
}

interface HookEvent {
  type: HookName;
  data: any;
  timestamp: Date;
}

interface HookResult {
  success: boolean;
  data?: any;
  error?: Error;
  stopPropagation?: boolean;
}
```

### Hooks API

```typescript
class HooksAPI {
  private hooks = new Map<HookName, HookRegistration[]>();
  
  register(hookName: HookName, hookFn: HookFunction, options: HookOptions): void {
    const registration: HookRegistration = {
      id: `${options.pluginId}:${hookName}:${Date.now()}`,
      pluginId: options.pluginId,
      hookFn,
      priority: options.priority || 0,
      once: options.once || false,
    };
    
    if (!this.hooks.has(hookName)) {
      this.hooks.set(hookName, []);
    }
    
    const hooks = this.hooks.get(hookName)!;
    hooks.push(registration);
    
    // Sort by priority (higher priority first)
    hooks.sort((a, b) => b.priority - a.priority);
  }
  
  unregister(hookName: HookName, pluginId: string): void {
    const hooks = this.hooks.get(hookName);
    if (!hooks) {
      return;
    }
    
    const filtered = hooks.filter(h => h.pluginId !== pluginId);
    this.hooks.set(hookName, filtered);
  }
  
  async execute(hookName: HookName, context: HookContext): Promise<HookResult[]> {
    const hooks = this.hooks.get(hookName);
    if (!hooks || hooks.length === 0) {
      return [];
    }
    
    const results: HookResult[] = [];
    
    for (const registration of hooks) {
      try {
        const result = await registration.hookFn(context);
        results.push(result || { success: true });
        
        // Remove if once
        if (registration.once) {
          this.unregister(hookName, registration.pluginId);
        }
        
        // Stop propagation if requested
        if (result?.stopPropagation) {
          break;
        }
      } catch (error) {
        results.push({
          success: false,
          error: error as Error,
        });
      }
    }
    
    return results;
  }
  
  clear(): void {
    this.hooks.clear();
  }
}

interface HookRegistration {
  id: string;
  pluginId: string;
  hookFn: HookFunction;
  priority: number;
  once: boolean;
}

interface HookOptions {
  pluginId: string;
  priority?: number;
  once?: boolean;
}
```

### Hook Examples

#### Content Validation Hook

```typescript
const contentValidationPlugin: Plugin = {
  id: 'content-validation',
  name: 'Content Validation',
  version: '1.0.0',
  description: 'Validates content before publishing',
  author: 'Neo Team',
  license: 'MIT',
  
  hooks: {
    'content:beforePublish': async (context) => {
      const { data } = context.event;
      
      // Validate title
      if (!data.title || data.title.length < 10) {
        throw new Error('Title must be at least 10 characters');
      }
      
      // Validate content
      if (!data.content || data.content.length < 50) {
        throw new Error('Content must be at least 50 characters');
      }
      
      // Validate SEO
      if (!data.seoTitle || !data.seoDescription) {
        context.logger.warn('SEO fields missing');
      }
      
      return { success: true };
    },
  },
};
```

#### AI Content Enhancement Hook

```typescript
const aiContentEnhancementPlugin: Plugin = {
  id: 'ai-content-enhancement',
  name: 'AI Content Enhancement',
  version: '1.0.0',
  description: 'Enhances content using AI before publishing',
  author: 'Neo Team',
  license: 'MIT',
  
  hooks: {
    'content:beforePublish': async (context) => {
      const { data } = context.event;
      const aiAPI = context.api.ai;
      
      // Enhance content with AI
      const enhanced = await aiAPI.chat({
        messages: [
          {
            role: 'system',
            content: 'Enhance the following content for better readability and engagement.',
          },
          {
            role: 'user',
            content: data.content,
          },
        ],
      });
      
      // Update content
      data.content = enhanced.content;
      
      return { success: true, data };
    },
  },
};
```

#### Notification Hook

```typescript
const notificationPlugin: Plugin = {
  id: 'notification',
  name: 'Notification',
  version: '1.0.0',
  description: 'Sends notifications on content events',
  author: 'Neo Team',
  license: 'MIT',
  
  hooks: {
    'content:afterPublish': async (context) => {
      const { data } = context.event;
      const workspaceAPI = context.api.workspace;
      
      // Get workspace members
      const members = await workspaceAPI.getMembers(context.workspace.id);
      
      // Send notification to all members
      for (const member of members) {
        await workspaceAPI.sendNotification(member.id, {
          type: 'content_published',
          title: `New content published: ${data.title}`,
          message: data.content.substring(0, 100),
          link: `/content/${data.id}`,
        });
      }
      
      return { success: true };
    },
  },
};
```

---

## COMPONENT SYSTEM

### Component Interface

```typescript
interface PluginComponents {
  [key: string]: React.ComponentType<any>;
}

interface ComponentRegistration {
  name: string;
  component: React.ComponentType<any>;
  pluginId: string;
  props?: any;
}

class ComponentsAPI {
  private components = new Map<string, ComponentRegistration>();
  
  register(name: string, component: React.ComponentType<any>, options: ComponentOptions): void {
    const registration: ComponentRegistration = {
      name,
      component,
      pluginId: options.pluginId,
      props: options.props,
    };
    
    this.components.set(name, registration);
  }
  
  unregister(name: string): void {
    this.components.delete(name);
  }
  
  get(name: string): ComponentRegistration | undefined {
    return this.components.get(name);
  }
  
  list(): ComponentRegistration[] {
    return Array.from(this.components.values());
  }
}

interface ComponentOptions {
  pluginId: string;
  props?: any;
}
```

### Component Examples

#### Custom Field Component

```typescript
const customFieldPlugin: Plugin = {
  id: 'custom-field',
  name: 'Custom Field',
  version: '1.0.0',
  description: 'Adds custom field components',
  author: 'Neo Team',
  license: 'MIT',
  
  components: {
    ColorPicker: (props) => {
      const [color, setColor] = useState(props.value || '#000000');
      
      return (
        <div className="color-picker">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            onBlur={() => props.onChange(color)}
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            onBlur={() => props.onChange(color)}
          />
        </div>
      );
    },
    
    RichTextEditor: (props) => {
      const [content, setContent] = useState(props.value || '');
      
      return (
        <LexicalEditor
          initialConfig={{
            namespace: 'neo',
            theme: theme,
          }}
          onChange={(editorState) => {
            const text = editorState.toJSON();
            setContent(text);
            props.onChange(text);
          }}
        />
      );
    },
  },
};
```

#### Custom Dashboard Widget

```typescript
const dashboardWidgetPlugin: Plugin = {
  id: 'dashboard-widget',
  name: 'Dashboard Widget',
  version: '1.0.0',
  description: 'Adds custom dashboard widgets',
  author: 'Neo Team',
  license: 'MIT',
  
  components: {
    AnalyticsWidget: () => {
      const [data, setData] = useState(null);
      
      useEffect(() => {
        // Fetch analytics data
        fetchAnalytics().then(setData);
      }, []);
      
      return (
        <div className="analytics-widget">
          <h3>Analytics</h3>
          {data && <Chart data={data} />}
        </div>
      );
    },
    
    ActivityWidget: () => {
      const [activities, setActivities] = useState([]);
      
      useEffect(() => {
        // Fetch activities
        fetchActivities().then(setActivities);
      }, []);
      
      return (
        <div className="activity-widget">
          <h3>Recent Activity</h3>
          <ul>
            {activities.map((activity) => (
              <li key={activity.id}>{activity.message}</li>
            ))}
          </ul>
        </div>
      );
    },
  },
};
```

---

## ENDPOINT SYSTEM

### Endpoint Interface

```typescript
interface PluginEndpoints {
  [path: string]: EndpointHandler;
}

interface EndpointHandler {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  handler: (request: EndpointRequest) => Promise<EndpointResponse>;
  middleware?: Middleware[];
}

interface EndpointRequest {
  method: string;
  path: string;
  query: Record<string, any>;
  body: any;
  headers: Record<string, string>;
  user: UserContext;
  workspace: WorkspaceContext;
}

interface EndpointResponse {
  status: number;
  body: any;
  headers?: Record<string, string>;
}

class EndpointsAPI {
  private endpoints = new Map<string, EndpointRegistration>();
  
  register(path: string, endpoint: EndpointHandler, options: EndpointOptions): void {
    const registration: EndpointRegistration = {
      path,
      ...endpoint,
      pluginId: options.pluginId,
    };
    
    this.endpoints.set(`${options.pluginId}:${path}`, registration);
  }
  
  unregister(path: string, pluginId: string): void {
    this.endpoints.delete(`${pluginId}:${path}`);
  }
  
  get(path: string, pluginId?: string): EndpointRegistration | undefined {
    if (pluginId) {
      return this.endpoints.get(`${pluginId}:${path}`);
    }
    
    for (const registration of this.endpoints.values()) {
      if (registration.path === path) {
        return registration;
      }
    }
    
    return undefined;
  }
  
  list(): EndpointRegistration[] {
    return Array.from(this.endpoints.values());
  }
}

interface EndpointOptions {
  pluginId: string;
}

interface EndpointRegistration extends EndpointHandler {
  path: string;
  pluginId: string;
}
```

### Endpoint Examples

#### Custom API Endpoint

```typescript
const customEndpointPlugin: Plugin = {
  id: 'custom-endpoint',
  name: 'Custom Endpoint',
  version: '1.0.0',
  description: 'Adds custom API endpoints',
  author: 'Neo Team',
  license: 'MIT',
  
  endpoints: {
    '/api/custom/analytics': {
      method: 'GET',
      handler: async (request) => {
        const { workspace } = request;
        
        // Fetch analytics data
        const data = await fetchAnalytics(workspace.id);
        
        return {
          status: 200,
          body: data,
        };
      },
    },
    
    '/api/custom/export': {
      method: 'POST',
      handler: async (request) => {
        const { body, workspace } = request;
        
        // Generate export
        const exportData = await generateExport(body, workspace.id);
        
        return {
          status: 200,
          body: exportData,
          headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename="export.zip"`,
          },
        };
      },
    },
  },
};
```

---

## FIELD SYSTEM

### Field Interface

```typescript
interface PluginFields {
  [name: string]: FieldDefinition;
}

interface FieldDefinition {
  type: string;
  label: string;
  description?: string;
  required?: boolean;
  defaultValue?: any;
  validation?: FieldValidation;
  component?: string;
  options?: FieldOptions;
}

interface FieldValidation {
  pattern?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  custom?: (value: any) => boolean | string;
}

interface FieldOptions {
  [key: string]: any;
}

class FieldsAPI {
  private fields = new Map<string, FieldRegistration>();
  
  register(name: string, field: FieldDefinition, options: FieldAPIOptions): void {
    const registration: FieldRegistration = {
      name,
      ...field,
      pluginId: options.pluginId,
    };
    
    this.fields.set(`${options.pluginId}:${name}`, registration);
  }
  
  unregister(name: string, pluginId: string): void {
    this.fields.delete(`${pluginId}:${name}`);
  }
  
  get(name: string, pluginId?: string): FieldRegistration | undefined {
    if (pluginId) {
      return this.fields.get(`${pluginId}:${name}`);
    }
    
    for (const registration of this.fields.values()) {
      if (registration.name === name) {
        return registration;
      }
    }
    
    return undefined;
  }
  
  list(): FieldRegistration[] {
    return Array.from(this.fields.values());
  }
}

interface FieldAPIOptions {
  pluginId: string;
}

interface FieldRegistration extends FieldDefinition {
  name: string;
  pluginId: string;
}
```

### Field Examples

#### Custom Field Types

```typescript
const customFieldPlugin: Plugin = {
  id: 'custom-field',
  name: 'Custom Field',
  version: '1.0.0',
  description: 'Adds custom field types',
  author: 'Neo Team',
  license: 'MIT',
  
  fields: {
    color: {
      type: 'color',
      label: 'Color',
      description: 'Select a color',
      required: false,
      defaultValue: '#000000',
      component: 'ColorPicker',
    },
    
    richText: {
      type: 'richText',
      label: 'Rich Text',
      description: 'Rich text content',
      required: true,
      component: 'RichTextEditor',
    },
    
    slug: {
      type: 'slug',
      label: 'Slug',
      description: 'URL-friendly identifier',
      required: true,
      validation: {
        pattern: '^[a-z0-9-]+$',
        minLength: 3,
        maxLength: 100,
      },
    },
    
    rating: {
      type: 'rating',
      label: 'Rating',
      description: 'Rating from 1 to 5',
      required: false,
      defaultValue: 0,
      validation: {
        min: 0,
        max: 5,
      },
      options: {
        max: 5,
      },
    },
  },
};
```

---

## COMMAND SYSTEM

### Command Interface

```typescript
interface PluginCommands {
  [name: string]: CommandDefinition;
}

interface CommandDefinition {
  label: string;
  description: string;
  icon?: string;
  keyboardShortcut?: string;
  handler: (context: CommandContext) => Promise<void> | void;
  context?: CommandContextType[];
}

interface CommandContext {
  workspace: WorkspaceContext;
  user: UserContext;
  selection?: any;
  api: PluginAPI;
}

type CommandContextType = 'global' | 'content' | 'selection' | 'dashboard';

class CommandsAPI {
  private commands = new Map<string, CommandRegistration>();
  
  register(name: string, command: CommandDefinition, options: CommandOptions): void {
    const registration: CommandRegistration = {
      name,
      ...command,
      pluginId: options.pluginId,
    };
    
    this.commands.set(`${options.pluginId}:${name}`, registration);
  }
  
  unregister(name: string, pluginId: string): void {
    this.commands.delete(`${pluginId}:${name}`);
  }
  
  get(name: string, pluginId?: string): CommandRegistration | undefined {
    if (pluginId) {
      return this.commands.get(`${pluginId}:${name}`);
    }
    
    for (const registration of this.commands.values()) {
      if (registration.name === name) {
        return registration;
      }
    }
    
    return undefined;
  }
  
  list(context?: CommandContextType[]): CommandRegistration[] {
    const commands = Array.from(this.commands.values());
    
    if (context) {
      return commands.filter(cmd =>
        !cmd.context || cmd.context.some(c => context.includes(c))
      );
    }
    
    return commands;
  }
}

interface CommandOptions {
  pluginId: string;
}

interface CommandRegistration extends CommandDefinition {
  name: string;
  pluginId: string;
}
```

### Command Examples

#### Custom Commands

```typescript
const customCommandPlugin: Plugin = {
  id: 'custom-command',
  name: 'Custom Command',
  version: '1.0.0',
  description: 'Adds custom commands',
  author: 'Neo Team',
  license: 'MIT',
  
  commands: {
    'generate-content': {
      label: 'Generate Content with AI',
      description: 'Generate content using AI',
      icon: '✨',
      keyboardShortcut: 'Cmd+G',
      context: ['content', 'dashboard'],
      handler: async (context) => {
        const aiAPI = context.api.ai;
        
        // Open AI assistant
        await aiAPI.openAssistant({
          prompt: 'Generate content',
          context: context.selection,
        });
      },
    },
    
    'export-content': {
      label: 'Export Content',
      description: 'Export content to various formats',
      icon: '📤',
      keyboardShortcut: 'Cmd+E',
      context: ['content', 'selection'],
      handler: async (context) => {
        const contentAPI = context.api.content;
        
        // Export content
        await contentAPI.export(context.selection.id, {
          format: 'markdown',
        });
      },
    },
    
    'duplicate-content': {
      label: 'Duplicate Content',
      description: 'Duplicate selected content',
      icon: '📋',
      keyboardShortcut: 'Cmd+D',
      context: ['selection'],
      handler: async (context) => {
        const contentAPI = context.api.content;
        
        // Duplicate content
        await contentAPI.duplicate(context.selection.id);
      },
    },
  },
};
```

---

## SETTINGS SYSTEM

### Settings Interface

```typescript
interface PluginSettings {
  [key: string]: SettingDefinition;
}

interface SettingDefinition {
  type: 'string' | 'number' | 'boolean' | 'select' | 'multiselect' | 'color';
  label: string;
  description?: string;
  defaultValue?: any;
  required?: boolean;
  options?: SettingOption[];
  validation?: SettingValidation;
}

interface SettingOption {
  label: string;
  value: any;
}

interface SettingValidation {
  pattern?: string;
  min?: number;
  max?: number;
}

class SettingsAPI {
  private settings = new Map<string, SettingRegistration>();
  
  register(name: string, setting: SettingDefinition, options: SettingsOptions): void {
    const registration: SettingRegistration = {
      name,
      ...setting,
      pluginId: options.pluginId,
    };
    
    this.settings.set(`${options.pluginId}:${name}`, registration);
  }
  
  unregister(name: string, pluginId: string): void {
    this.settings.delete(`${pluginId}:${name}`);
  }
  
  get(name: string, pluginId?: string): SettingRegistration | undefined {
    if (pluginId) {
      return this.settings.get(`${pluginId}:${name}`);
    }
    
    for (const registration of this.settings.values()) {
      if (registration.name === name) {
        return registration;
      }
    }
    
    return undefined;
  }
  
  list(pluginId?: string): SettingRegistration[] {
    const settings = Array.from(this.settings.values());
    
    if (pluginId) {
      return settings.filter(s => s.pluginId === pluginId);
    }
    
    return settings;
  }
}

interface SettingsOptions {
  pluginId: string;
}

interface SettingRegistration extends SettingDefinition {
  name: string;
  pluginId: string;
}
```

### Settings Examples

#### Plugin Settings

```typescript
const settingsPlugin: Plugin = {
  id: 'settings',
  name: 'Settings',
  version: '1.0.0',
  description: 'Plugin with configurable settings',
  author: 'Neo Team',
  license: 'MIT',
  
  settings: {
    apiKey: {
      type: 'string',
      label: 'API Key',
      description: 'Your API key for external service',
      required: true,
      validation: {
        pattern: '^[a-zA-Z0-9_-]+$',
        minLength: 10,
      },
    },
    
    autoPublish: {
      type: 'boolean',
      label: 'Auto Publish',
      description: 'Automatically publish content after AI enhancement',
      defaultValue: false,
    },
    
    enhancementLevel: {
      type: 'select',
      label: 'Enhancement Level',
      description: 'Level of AI enhancement',
      defaultValue: 'medium',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Medium', value: 'medium' },
        { label: 'Heavy', value: 'heavy' },
      ],
    },
    
    maxRetries: {
      type: 'number',
      label: 'Max Retries',
      description: 'Maximum number of retries for failed operations',
      defaultValue: 3,
      validation: {
        min: 0,
        max: 10,
      },
    },
  },
};
```

---

## PLUGIN MARKETPLACE

### Marketplace Architecture

```typescript
interface MarketplacePlugin {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  repository: string;
  homepage: string;
  
  // Metadata
  category: string;
  tags: string[];
  downloads: number;
  rating: number;
  reviews: number;
  
  // Compatibility
  minPlatformVersion: string;
  maxPlatformVersion?: string;
  
  // Dependencies
  dependencies?: Record<string, string>;
  
  // Screenshots
  screenshots: string[];
  
  // Installation
  installCommand?: string;
  
  // Pricing
  pricing?: {
    type: 'free' | 'paid' | 'freemium';
    price?: number;
    currency?: string;
  };
}

class Marketplace {
  private plugins = new Map<string, MarketplacePlugin>();
  private installedPlugins = new Set<string>();
  
  async loadPlugin(pluginId: string): Promise<MarketplacePlugin> {
    // Fetch plugin from marketplace
    const plugin = await this.fetchPlugin(pluginId);
    
    this.plugins.set(pluginId, plugin);
    
    return plugin;
  }
  
  async install(pluginId: string): Promise<void> {
    const plugin = await this.loadPlugin(pluginId);
    
    // Check compatibility
    if (!this.isCompatible(plugin)) {
      throw new Error('Plugin is not compatible with current platform version');
    }
    
    // Install dependencies
    if (plugin.dependencies) {
      await this.installDependencies(plugin.dependencies);
    }
    
    // Download plugin
    const pluginCode = await this.downloadPlugin(plugin);
    
    // Load plugin
    const pluginModule = await this.loadPluginModule(pluginCode);
    
    // Register plugin
    pluginRegistry.register(pluginModule);
    
    // Mark as installed
    this.installedPlugins.add(pluginId);
  }
  
  async uninstall(pluginId: string): Promise<void> {
    // Unregister plugin
    const plugin = pluginRegistry.get(pluginId);
    if (plugin) {
      await pluginRegistry.unload(pluginId, {} as PluginContext);
    }
    
    // Remove from installed
    this.installedPlugins.delete(pluginId);
  }
  
  async search(query: string, filters?: MarketplaceFilters): Promise<MarketplacePlugin[]> {
    // Search marketplace
    const results = await this.fetchMarketplace(query, filters);
    
    return results;
  }
  
  async list(filters?: MarketplaceFilters): Promise<MarketplacePlugin[]> {
    // List all plugins
    const results = await this.fetchMarketplace('', filters);
    
    return results;
  }
  
  private async fetchPlugin(pluginId: string): Promise<MarketplacePlugin> {
    // Fetch from marketplace API
    return {} as MarketplacePlugin;
  }
  
  private async downloadPlugin(plugin: MarketplacePlugin): Promise<string> {
    // Download plugin code
    return '';
  }
  
  private async loadPluginModule(code: string): Promise<Plugin> {
    // Load plugin module
    return {} as Plugin;
  }
  
  private isCompatible(plugin: MarketplacePlugin): boolean {
    // Check version compatibility
    return true;
  }
  
  private async installDependencies(dependencies: Record<string, string>): Promise<void> {
    // Install dependencies
  }
  
  private async fetchMarketplace(query: string, filters?: MarketplaceFilters): Promise<MarketplacePlugin[]> {
    // Fetch from marketplace API
    return [];
  }
}

interface MarketplaceFilters {
  category?: string;
  tags?: string[];
  pricing?: 'free' | 'paid' | 'freemium';
  rating?: number;
}
```

### Marketplace UI

#### Plugin Listing

```
┌─────────────────────────────────────────────────────────────────┐
│  Plugin Marketplace                                    [My Plugins] │
├─────────────────────────────────────────────────────────────────┤
│  🔍 Search plugins...  [Category ▼] [Pricing ▼] [Tags ▼]      │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📦 Content Validation                 ⭐ 4.5  [Install]  │   │
│  │    Validates content before publishing                  │   │
│  │    By Neo Team • 1.2k downloads • Free                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ ✨ AI Content Enhancement           ⭐ 4.8  [Install]  │   │
│  │    Enhances content using AI before publishing           │   │
│  │    By Neo Team • 3.4k downloads • Free                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📊 Analytics Dashboard                ⭐ 4.2  [Install]  │   │
│  │    Advanced analytics dashboard with charts             │   │
│  │    By Community • 890 downloads • $9.99/mo             │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

#### Plugin Detail

```
┌─────────────────────────────────────────────────────────────────┐
│  Content Validation                                    [← Back]  │
├─────────────────────────────────────────────────────────────────┤
│  ⭐ 4.5 (23 reviews)  📦 1.2k downloads  💬 Free             │
│                                                                 │
│  Validates content before publishing with custom rules.         │
│                                                                 │
│  Features:                                                      │
│  ✓ Title validation                                            │
│  ✓ Content validation                                          │
│  ✓ SEO validation                                              │
│  ✓ Custom rules                                                │
│                                                                 │
│  Screenshots:                                                   │
│  [Screenshot 1] [Screenshot 2] [Screenshot 3]                   │
│                                                                 │
│  By Neo Team • MIT License • GitHub • Website                 │
│                                                                 │
│  [Install Plugin]                                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## DEVELOPER EXPERIENCE

### Plugin Template

```typescript
import { Plugin, PluginContext } from '@neo/plugin-sdk';

const myPlugin: Plugin = {
  id: 'my-plugin',
  name: 'My Plugin',
  version: '1.0.0',
  description: 'My awesome plugin',
  author: 'Your Name',
  license: 'MIT',
  
  async onLoad(context: PluginContext) {
    context.logger.info('My plugin loaded');
  },
  
  async onUnload(context: PluginContext) {
    context.logger.info('My plugin unloaded');
  },
  
  hooks: {
    'content:beforeCreate': async (context) => {
      // Your hook logic
    },
  },
  
  components: {
    MyComponent: (props) => {
      // Your component
    },
  },
  
  endpoints: {
    '/api/my-endpoint': {
      method: 'GET',
      handler: async (request) => {
        // Your endpoint logic
      },
    },
  },
  
  fields: {
    myField: {
      type: 'string',
      label: 'My Field',
    },
  },
  
  commands: {
    'my-command': {
      label: 'My Command',
      description: 'My command description',
      handler: async (context) => {
        // Your command logic
      },
    },
  },
  
  settings: {
    mySetting: {
      type: 'string',
      label: 'My Setting',
      defaultValue: 'default',
    },
  },
};

export default myPlugin;
```

### CLI Tool

```bash
# Create new plugin
neo plugin create my-plugin

# Build plugin
neo plugin build

# Test plugin
neo plugin test

# Install plugin
neo plugin install my-plugin

# Uninstall plugin
neo plugin uninstall my-plugin

# List plugins
neo plugin list

# Plugin info
neo plugin info my-plugin
```

### Documentation

```markdown
# Plugin Development Guide

## Getting Started

1. Create a new plugin
2. Define your plugin
3. Implement hooks
4. Test locally
5. Publish to marketplace

## Hooks Reference

### Content Hooks

- `content:beforeCreate` - Before content creation
- `content:afterCreate` - After content creation
- `content:beforeUpdate` - Before content update
- `content:afterUpdate` - After content update
- `content:beforeDelete` - Before content deletion
- `content:afterDelete` - After content deletion

## API Reference

### Content API

```typescript
const contentAPI = context.api.content;

// Create content
await contentAPI.create({ type: 'page', title: 'My Page' });

// Update content
await contentAPI.update(id, { title: 'Updated Title' });

// Delete content
await contentAPI.delete(id);

// Query content
const results = await contentAPI.query({ type: 'page' });
```

## Examples

### Content Validation Plugin

See examples/content-validation-plugin.ts

### AI Enhancement Plugin

See examples/ai-enhancement-plugin.ts

### Custom Field Plugin

See examples/custom-field-plugin.ts
```

---

## NEXT STEPS

1. **Design extension architecture** - Extension system
2. **Design permission system** - RBAC with field-level and document-level permissions
3. **Design navigation architecture** - Navigation system
4. **Design workspace system** - Workspace system
5. **Design review system** - Review system
6. **Generate full architecture** - After all research and analysis
