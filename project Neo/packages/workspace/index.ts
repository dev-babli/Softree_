import type { Workspace, WorkspaceMember, Role, Permission, User } from '@neo/types';

export interface WorkspaceContext {
  workspace: Workspace;
  member: WorkspaceMember;
  role: Role;
  user: User;
}

export class PermissionChecker {
  constructor(private role: Role) {}

  can(resource: string, action: string, conditions?: Record<string, any>): boolean {
    return this.role.permissions.some((permission) => {
      const resourceMatch = permission.resource === '*' || permission.resource === resource;
      const actionMatch = permission.action === '*' || permission.action === action;
      const conditionsMatch = conditions
        ? Object.entries(conditions).every(([key, value]) => permission.conditions?.[key] === value)
        : true;
      return resourceMatch && actionMatch && conditionsMatch;
    });
  }

  canCreate(resource: string): boolean {
    return this.can(resource, 'create');
  }

  canRead(resource: string): boolean {
    return this.can(resource, 'read');
  }

  canUpdate(resource: string, conditions?: Record<string, any>): boolean {
    return this.can(resource, 'update', conditions);
  }

  canDelete(resource: string): boolean {
    return this.can(resource, 'delete');
  }
}

export class WorkspaceManager {
  private workspaces = new Map<string, Workspace>();
  private currentWorkspaceId: string | null = null;

  addWorkspace(workspace: Workspace): void {
    this.workspaces.set(workspace.id, workspace);
  }

  getWorkspace(id: string): Workspace | undefined {
    return this.workspaces.get(id);
  }

  setCurrentWorkspace(id: string): void {
    if (!this.workspaces.has(id)) {
      throw new Error(`Workspace ${id} not found`);
    }
    this.currentWorkspaceId = id;
  }

  getCurrentWorkspace(): Workspace | null {
    return this.currentWorkspaceId ? this.workspaces.get(this.currentWorkspaceId) ?? null : null;
  }

  listWorkspaces(): Workspace[] {
    return Array.from(this.workspaces.values());
  }
}

export function createAdminRole(): Role {
  return {
    id: 'admin',
    name: 'Admin',
    description: 'Full workspace access',
    isSystem: true,
    permissions: [{ resource: '*', action: '*' }],
  };
}

export function createEditorRole(): Role {
  return {
    id: 'editor',
    name: 'Editor',
    description: 'Can create and edit content',
    isSystem: true,
    permissions: [
      { resource: 'content', action: 'read' },
      { resource: 'content', action: 'create' },
      { resource: 'content', action: 'update' },
      { resource: 'media', action: 'read' },
      { resource: 'media', action: 'create' },
      { resource: 'media', action: 'update' },
    ],
  };
}

export function createViewerRole(): Role {
  return {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access',
    isSystem: true,
    permissions: [
      { resource: 'content', action: 'read' },
      { resource: 'media', action: 'read' },
    ],
  };
}

export { Permission, Role, Workspace, WorkspaceMember, User } from '@neo/types';
