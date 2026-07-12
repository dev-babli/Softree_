# PHASE 8: EXTENSION ARCHITECTURE

## Overview

This document provides a comprehensive extension architecture design for Project Neo's AI-native Agency Platform. The architecture covers the extension system design, building on patterns from Directus, Contentful, Raycast, and VS Code, while distinguishing between plugins (internal) and extensions (external/community).

---

## ARCHITECTURE PRINCIPLES

### 1. Separation of Concerns
- **Plugins**: Internal, core platform extensions
- **Extensions**: External, community-built extensions
- Different installation, permission, and isolation models

### 2. Sandboxing
- Extensions run in isolated contexts
- Resource limits and quotas
- Permission boundaries
- Error isolation

### 3. Type Safety
- Full TypeScript support
- Auto-generated types from schemas
- Extension manifest validation
- API type definitions

### 4. Developer Experience
- Hot reload during development
- Debugging tools
- Logging and monitoring
- Testing framework

### 5. Security
- Permission model
- Code signing
- Review process
- Vulnerability scanning

---

## PLUGIN VS EXTENSION DISTINCTION

### Plugins (Internal)
- Built by core team
- Full platform access
- Can modify core behavior
- Installed via code
- Version controlled with platform
- No sandboxing required
- Can access internal APIs

### Extensions (External)
- Built by community
- Limited access via permissions
- Cannot modify core behavior
- Installed via marketplace
- Independent versioning
- Sandboxed execution
- Public API only

---

## EXTENSION MANIFEST

### Manifest Structure

```typescript
interface ExtensionManifest {
  // Identification
  id: string;
  name: string;
  version: string;
  description: string;
  author: {
    name: string;
    email: string;
    website?: string;
  };
  
  // Licensing
  license: string;
  
  // Compatibility
  platformVersion: {
    min: string;
    max?: string;
  };
  
  // Entry points
  main: string;
  
  // Permissions
  permissions: ExtensionPermission[];
  
  // Capabilities
  capabilities: ExtensionCapability[];
  
  // Resources
  resources: ExtensionResources;
  
  // Contribution points
  contributes: ExtensionContributionPoints;
  
  // Activation events
  activationEvents: ActivationEvent[];
  
  // Configuration
  configuration?: ExtensionConfiguration;
}

interface ExtensionPermission {
  type: 'content' | 'user' | 'workspace' | 'api' | 'storage' | 'network' | 'ai';
  scope?: string[];
  description: string;
}

interface ExtensionCapability {
  type: 'visual' | 'command' | 'field' | 'endpoint' | 'hook' | 'component';
  description: string;
}

interface ExtensionResources {
  icons?: Record<string, string>;
  stylesheets?: string[];
  scripts?: string[];
}

interface ExtensionContributionPoints {
  commands?: CommandContribution[];
  fields?: FieldContribution[];
  components?: ComponentContribution[];
  views?: ViewContribution[];
  settings?: SettingsContribution[];
  themes?: ThemeContribution[];
  languages?: LanguageContribution[];
}

interface ExtensionConfiguration {
  properties: Record<string, ConfigProperty>;
}

interface ConfigProperty {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  default?: any;
  description?: string;
  enum?: any[];
  minimum?: number;
  maximum?: number;
}
```

### Example Manifest

```json
{
  "id": "neo.analytics-dashboard",
  "name": "Analytics Dashboard",
  "version": "1.2.0",
  "description": "Advanced analytics dashboard with custom charts",
  "author": {
    "name": "Neo Team",
    "email": "team@neo.com",
    "website": "https://neo.com"
  },
  "license": "MIT",
  "platformVersion": {
    "min": "1.0.0",
    "max": "2.0.0"
  },
  "main": "dist/index.js",
  "permissions": [
    {
      "type": "content",
      "scope": ["read"],
      "description": "Read content for analytics"
    },
    {
      "type": "workspace",
      "scope": ["read"],
      "description": "Read workspace settings"
    },
    {
      "type": "storage",
      "description": "Store analytics data"
    },
    {
      "type": "network",
      "description": "Fetch external analytics data"
    }
  ],
  "capabilities": [
    {
      "type": "visual",
      "description": "Adds dashboard view"
    },
    {
      "type": "component",
      "description": "Provides chart components"
    }
  ],
  "resources": {
    "icons": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    },
    "stylesheets": ["styles/main.css"],
    "scripts": ["scripts/main.js"]
  },
  "contributes": {
    "commands": [
      {
        "id": "analytics.open",
        "title": "Open Analytics",
        "icon": "$(icon)",
        "category": "Analytics"
      }
    ],
    "views": [
      {
        "id": "analytics.dashboard",
        "title": "Analytics Dashboard",
        "location": "sidebar",
        "icon": "$(icon)",
        "component": "Dashboard"
      }
    ],
    "settings": [
      {
        "id": "analytics.apiKey",
        "title": "API Key",
        "type": "string",
        "default": ""
      }
    ]
  },
  "activationEvents": [
    "onStartup",
    "onCommand:analytics.open"
  ],
  "configuration": {
    "properties": {
      "refreshInterval": {
        "type": "number",
        "default": 300,
        "description": "Refresh interval in seconds"
      },
      "showCharts": {
        "type": "array",
        "default": ["visitors", "pageViews"],
        "description": "Charts to display"
      }
    }
  }
}
```

---

## EXTENSION HOST

### Host Architecture

```typescript
class ExtensionHost {
  private extensions = new Map<string, Extension>();
  private sandbox: Sandbox;
  private permissionManager: PermissionManager;
  private resourceManager: ResourceManager;
  
  async load(manifest: ExtensionManifest): Promise<Extension> {
    // Validate manifest
    this.validateManifest(manifest);
    
    // Check compatibility
    this.checkCompatibility(manifest);
    
    // Check permissions
    await this.checkPermissions(manifest);
    
    // Create sandbox
    const sandbox = await this.createSandbox(manifest);
    
    // Load extension code
    const module = await this.loadExtensionCode(manifest);
    
    // Create extension instance
    const extension: Extension = {
      manifest,
      sandbox,
      module,
      state: 'loaded',
      context: this.createExtensionContext(manifest),
    };
    
    // Register contributions
    await this.registerContributions(extension);
    
    // Activate if needed
    if (this.shouldActivate(extension)) {
      await this.activate(extension);
    }
    
    this.extensions.set(manifest.id, extension);
    
    return extension;
  }
  
  async unload(extensionId: string): Promise<void> {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension not found: ${extensionId}`);
    }
    
    // Deactivate
    if (extension.state === 'active') {
      await this.deactivate(extension);
    }
    
    // Unregister contributions
    await this.unregisterContributions(extension);
    
    // Destroy sandbox
    await this.destroySandbox(extension.sandbox);
    
    // Remove from registry
    this.extensions.delete(extensionId);
  }
  
  async activate(extension: Extension): Promise<void> {
    if (extension.state === 'active') {
      return;
    }
    
    // Call activate hook
    if (extension.module.activate) {
      await extension.module.activate(extension.context);
    }
    
    extension.state = 'active';
  }
  
  async deactivate(extension: Extension): Promise<void> {
    if (extension.state !== 'active') {
      return;
    }
    
    // Call deactivate hook
    if (extension.module.deactivate) {
      await extension.module.deactivate(extension.context);
    }
    
    extension.state = 'loaded';
  }
  
  private validateManifest(manifest: ExtensionManifest): void {
    // Validate manifest structure
    // Validate required fields
    // Validate version format
    // Validate permissions
    // Validate capabilities
  }
  
  private checkCompatibility(manifest: ExtensionManifest): void {
    const platformVersion = getPlatformVersion();
    
    if (!semver.satisfies(platformVersion, `>=${manifest.platformVersion.min}`)) {
      throw new Error(
        `Extension requires platform version >= ${manifest.platformVersion.min}`
      );
    }
    
    if (manifest.platformVersion.max) {
      if (!semver.satisfies(platformVersion, `<=${manifest.platformVersion.max}`)) {
        throw new Error(
          `Extension requires platform version <= ${manifest.platformVersion.max}`
        );
      }
    }
  }
  
  private async checkPermissions(manifest: ExtensionManifest): Promise<void> {
    for (const permission of manifest.permissions) {
      const granted = await this.permissionManager.request(permission);
      if (!granted) {
        throw new Error(`Permission denied: ${permission.type}`);
      }
    }
  }
  
  private async createSandbox(manifest: ExtensionManifest): Promise<Sandbox> {
    // Create isolated execution context
    // Apply resource limits
    // Set up communication channels
    return new Sandbox(manifest);
  }
  
  private async loadExtensionCode(manifest: ExtensionManifest): Promise<any> {
    // Load main entry point
    // Execute in sandbox
    // Return module exports
    return {};
  }
  
  private createExtensionContext(manifest: ExtensionManifest): ExtensionContext {
    return {
      extensionId: manifest.id,
      version: manifest.version,
      workspace: getCurrentWorkspace(),
      user: getCurrentUser(),
      configuration: this.getConfiguration(manifest),
      api: this.createExtensionAPI(manifest),
      logger: this.createLogger(manifest),
      storage: this.createStorage(manifest),
    };
  }
  
  private createExtensionAPI(manifest: ExtensionManifest): ExtensionAPI {
    // Create API based on permissions
    // Only expose allowed capabilities
    return new ExtensionAPI(manifest.permissions);
  }
  
  private async registerContributions(extension: Extension): Promise<void> {
    const { contributes } = extension.manifest;
    
    // Register commands
    if (contributes.commands) {
      for (const command of contributes.commands) {
        await this.registerCommand(extension, command);
      }
    }
    
    // Register fields
    if (contributes.fields) {
      for (const field of contributes.fields) {
        await this.registerField(extension, field);
      }
    }
    
    // Register components
    if (contributes.components) {
      for (const component of contributes.components) {
        await this.registerComponent(extension, component);
      }
    }
    
    // Register views
    if (contributes.views) {
      for (const view of contributes.views) {
        await this.registerView(extension, view);
      }
    }
    
    // Register settings
    if (contributes.settings) {
      for (const setting of contributes.settings) {
        await this.registerSetting(extension, setting);
      }
    }
  }
  
  private async unregisterContributions(extension: Extension): Promise<void> {
    // Unregister all contributions
  }
  
  private shouldActivate(extension: Extension): boolean {
    return extension.manifest.activationEvents.includes('onStartup');
  }
}

interface Extension {
  manifest: ExtensionManifest;
  sandbox: Sandbox;
  module: any;
  state: 'loaded' | 'active' | 'error';
  context: ExtensionContext;
}
```

---

## SANDBOX

### Sandbox Implementation

```typescript
class Sandbox {
  private manifest: ExtensionManifest;
  private context: vm.Context;
  private isolation: Isolation;
  
  constructor(manifest: ExtensionManifest) {
    this.manifest = manifest;
    this.context = vm.createContext({});
    this.isolation = new Isolation(manifest);
  }
  
  async execute(code: string): Promise<any> {
    // Apply resource limits
    this.isolation.applyLimits();
    
    // Execute in isolated context
    const result = vm.runInContext(code, this.context);
    
    return result;
  }
  
  async callFunction(fnName: string, ...args: any[]): Promise<any> {
    // Call function in sandbox
    const fn = this.context[fnName];
    if (typeof fn !== 'function') {
      throw new Error(`Function not found: ${fnName}`);
    }
    
    return await fn(...args);
  }
  
  destroy(): void {
    // Clean up resources
    this.isolation.cleanup();
    vm.releaseContext(this.context);
  }
}

class Isolation {
  private manifest: ExtensionManifest;
  private limits: ResourceLimits;
  
  constructor(manifest: ExtensionManifest) {
    this.manifest = manifest;
    this.limits = this.calculateLimits(manifest);
  }
  
  applyLimits(): void {
    // CPU limits
    // Memory limits
    // Network limits
    // File system limits
  }
  
  cleanup(): void {
    // Release resources
  }
  
  private calculateLimits(manifest: ExtensionManifest): ResourceLimits {
    return {
      maxMemory: 128 * 1024 * 1024, // 128MB
      maxCpuTime: 1000, // 1 second per operation
      maxNetworkRequests: 100,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    };
  }
}

interface ResourceLimits {
  maxMemory: number;
  maxCpuTime: number;
  maxNetworkRequests: number;
  maxFileSize: number;
}
```

---

## PERMISSION SYSTEM

### Permission Model

```typescript
class PermissionManager {
  private permissions = new Map<string, PermissionGrant>();
  
  async request(permission: ExtensionPermission): Promise<boolean> {
    // Check if already granted
    const key = this.getPermissionKey(permission);
    if (this.permissions.has(key)) {
      return true;
    }
    
    // Request from user
    const granted = await this.requestFromUser(permission);
    
    if (granted) {
      this.permissions.set(key, {
        permission,
        grantedAt: new Date(),
      });
    }
    
    return granted;
  }
  
  revoke(permission: ExtensionPermission): void {
    const key = this.getPermissionKey(permission);
    this.permissions.delete(key);
  }
  
  check(permission: ExtensionPermission): boolean {
    const key = this.getPermissionKey(permission);
    return this.permissions.has(key);
  }
  
  private getPermissionKey(permission: ExtensionPermission): string {
    return `${permission.type}:${permission.scope?.join(',') || '*'}`;
  }
  
  private async requestFromUser(permission: ExtensionPermission): Promise<boolean> {
    // Show permission request dialog
    // Explain why permission is needed
    // Allow user to grant or deny
    return false;
  }
}

interface PermissionGrant {
  permission: ExtensionPermission;
  grantedAt: Date;
}
```

---

## EXTENSION API

### API Design

```typescript
class ExtensionAPI {
  private permissions: ExtensionPermission[];
  
  constructor(permissions: ExtensionPermission[]) {
    this.permissions = permissions;
  }
  
  get content(): ContentAPI {
    if (!this.hasPermission('content')) {
      throw new Error('Permission denied: content');
    }
    return new ContentAPI();
  }
  
  get user(): UserAPI {
    if (!this.hasPermission('user')) {
      throw new Error('Permission denied: user');
    }
    return new UserAPI();
  }
  
  get workspace(): WorkspaceAPI {
    if (!this.hasPermission('workspace')) {
      throw new Error('Permission denied: workspace');
    }
    return new WorkspaceAPI();
  }
  
  get storage(): StorageAPI {
    if (!this.hasPermission('storage')) {
      throw new Error('Permission denied: storage');
    }
    return new StorageAPI();
  }
  
  get network(): NetworkAPI {
    if (!this.hasPermission('network')) {
      throw new Error('Permission denied: network');
    }
    return new NetworkAPI();
  }
  
  get ai(): AIAPI {
    if (!this.hasPermission('ai')) {
      throw new Error('Permission denied: ai');
    }
    return new AIAPI();
  }
  
  get ui(): UIAPI {
    return new UIAPI();
  }
  
  private hasPermission(type: string): boolean {
    return this.permissions.some(p => p.type === type);
  }
}
```

---

## CONTRIBUTION POINTS

### Commands

```typescript
interface CommandContribution {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  category?: string;
  keyboardShortcut?: string;
  when?: string;
}

async function registerCommand(extension: Extension, command: CommandContribution): Promise<void> {
  const commandRegistry = getCommandRegistry();
  
  const handler = async (...args: any[]) => {
    // Activate extension if not active
    if (extension.state !== 'active') {
      await extensionHost.activate(extension);
    }
    
    // Call command handler
    if (extension.module.commands && extension.module.commands[command.id]) {
      return await extension.module.commands[command.id](...args);
    }
  };
  
  commandRegistry.register({
    ...command,
    handler,
    extensionId: extension.manifest.id,
  });
}
```

### Fields

```typescript
interface FieldContribution {
  id: string;
  type: string;
  label: string;
  description?: string;
  icon?: string;
  component?: string;
  config?: any;
}

async function registerField(extension: Extension, field: FieldContribution): Promise<void> {
  const fieldRegistry = getFieldRegistry();
  
  const fieldDefinition = {
    ...field,
    component: field.component ? extension.module.components[field.component] : undefined,
    extensionId: extension.manifest.id,
  };
  
  fieldRegistry.register(field.id, fieldDefinition);
}
```

### Components

```typescript
interface ComponentContribution {
  id: string;
  component: string;
  props?: any;
}

async function registerComponent(extension: Extension, component: ComponentContribution): Promise<void> {
  const componentRegistry = getComponentRegistry();
  
  const componentModule = extension.module.components[component.component];
  
  componentRegistry.register(component.id, componentModule, {
    extensionId: extension.manifest.id,
    props: component.props,
  });
}
```

### Views

```typescript
interface ViewContribution {
  id: string;
  title: string;
  location: 'sidebar' | 'main' | 'settings' | 'modal';
  icon?: string;
  component: string;
  order?: number;
  when?: string;
}

async function registerView(extension: Extension, view: ViewContribution): Promise<void> {
  const viewRegistry = getViewRegistry();
  
  const componentModule = extension.module.components[view.component];
  
  viewRegistry.register({
    ...view,
    component: componentModule,
    extensionId: extension.manifest.id,
  });
}
```

### Settings

```typescript
interface SettingsContribution {
  id: string;
  title: string;
  type: string;
  default?: any;
  description?: string;
  enum?: any[];
}

async function registerSetting(extension: Extension, setting: SettingsContribution): Promise<void> {
  const settingsRegistry = getSettingsRegistry();
  
  settingsRegistry.register({
    ...setting,
    extensionId: extension.manifest.id,
  });
}
```

---

## EXTENSION MARKETPLACE

### Marketplace Integration

```typescript
class ExtensionMarketplace {
  private api: MarketplaceAPI;
  private installedExtensions = new Set<string>();
  
  async search(query: string, filters?: MarketplaceFilters): Promise<MarketplaceExtension[]> {
    return await this.api.search(query, filters);
  }
  
  async get(extensionId: string): Promise<MarketplaceExtension> {
    return await this.api.get(extensionId);
  }
  
  async install(extensionId: string): Promise<void> {
    // Check if already installed
    if (this.installedExtensions.has(extensionId)) {
      throw new Error('Extension already installed');
    }
    
    // Get extension manifest
    const extension = await this.get(extensionId);
    
    // Download extension
    const package = await this.download(extension);
    
    // Verify package
    await this.verify(package, extension);
    
    // Install extension
    await this.installPackage(package);
    
    // Load extension
    await extensionHost.load(package.manifest);
    
    // Mark as installed
    this.installedExtensions.add(extensionId);
  }
  
  async uninstall(extensionId: string): Promise<void> {
    // Unload extension
    await extensionHost.unload(extensionId);
    
    // Remove package
    await this.removePackage(extensionId);
    
    // Mark as uninstalled
    this.installedExtensions.delete(extensionId);
  }
  
  async update(extensionId: string): Promise<void> {
    // Check for updates
    const current = await this.getInstalled(extensionId);
    const latest = await this.get(extensionId);
    
    if (semver.eq(current.version, latest.version)) {
      return; // Already up to date
    }
    
    // Uninstall current
    await this.uninstall(extensionId);
    
    // Install latest
    await this.install(extensionId);
  }
  
  private async download(extension: MarketplaceExtension): Promise<ExtensionPackage> {
    // Download extension package
    return {} as ExtensionPackage;
  }
  
  private async verify(package: ExtensionPackage, extension: MarketplaceExtension): Promise<void> {
    // Verify signature
    // Check for vulnerabilities
    // Validate manifest
  }
  
  private async installPackage(package: ExtensionPackage): Promise<void> {
    // Extract package
    // Install dependencies
    // Copy to extension directory
  }
  
  private async removePackage(extensionId: string): Promise<void> {
    // Remove extension directory
    // Clean up dependencies
  }
}

interface MarketplaceExtension {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  repository: string;
  homepage: string;
  category: string;
  tags: string[];
  downloads: number;
  rating: number;
  reviews: number;
  screenshots: string[];
  pricing?: Pricing;
}

interface MarketplaceFilters {
  category?: string;
  tags?: string[];
  pricing?: 'free' | 'paid' | 'freemium';
  rating?: number;
}

interface Pricing {
  type: 'free' | 'paid' | 'freemium';
  price?: number;
  currency?: string;
}
```

---

## DEVELOPER EXPERIENCE

### Extension Template

```typescript
// manifest.json
{
  "id": "my-extension",
  "name": "My Extension",
  "version": "1.0.0",
  "description": "My awesome extension",
  "author": {
    "name": "Your Name",
    "email": "you@example.com"
  },
  "license": "MIT",
  "platformVersion": {
    "min": "1.0.0"
  },
  "main": "dist/index.js",
  "permissions": [
    {
      "type": "content",
      "scope": ["read"],
      "description": "Read content"
    }
  ],
  "contributes": {
    "commands": [
      {
        "id": "myExtension.hello",
        "title": "Hello World",
        "icon": "$(icon)"
      }
    ]
  },
  "activationEvents": [
    "onCommand:myExtension.hello"
  ]
}

// src/index.ts
export function activate(context: ExtensionContext) {
  console.log('Extension activated!', context);
  
  // Register commands
  context.commands.register({
    id: 'myExtension.hello',
    handler: async () => {
      context.ui.showNotification('Hello from my extension!');
    },
  });
}

export function deactivate() {
  console.log('Extension deactivated');
}

export const commands = {
  'myExtension.hello': async () => {
    console.log('Hello command executed');
  },
};
```

### CLI Tool

```bash
# Create new extension
neo extension create my-extension

# Build extension
neo extension build

# Test extension
neo extension test

# Package extension
neo extension package

# Install extension (local)
neo extension install ./my-extension

# Install extension (marketplace)
neo extension install my-extension

# Uninstall extension
neo extension uninstall my-extension

# List extensions
neo extension list

# Extension info
neo extension info my-extension

# Update extension
neo extension update my-extension
```

### TypeScript Types

```typescript
import {
  ExtensionContext,
  ExtensionAPI,
  UIAPI,
  ContentAPI,
  WorkspaceAPI,
  UserAPI,
  StorageAPI,
  NetworkAPI,
  AIAPI,
} from '@neo/extension-sdk';

export function activate(context: ExtensionContext) {
  const { api, logger, storage } = context;
  
  // Use APIs
  const content = api.content;
  const ui = api.ui;
  
  // Log
  logger.info('Extension activated');
  
  // Store data
  await storage.set('key', 'value');
  
  // Register command
  context.commands.register({
    id: 'myCommand',
    handler: async () => {
      const data = await content.query({ type: 'page' });
      ui.showNotification(`Found ${data.length} pages`);
    },
  });
}
```

---

## NEXT STEPS

1. **Design permission system** - RBAC with field-level and document-level permissions
2. **Design navigation architecture** - Navigation system
3. **Design workspace system** - Workspace system
4. **Design review system** - Review system
5. **Generate full architecture** - After all research and analysis
