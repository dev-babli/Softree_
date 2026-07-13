# PHASE 9: PERMISSION SYSTEM

## Overview

This document provides a comprehensive permission system design for Project Neo's AI-native Agency Platform. The architecture covers Role-Based Access Control (RBAC) with field-level and document-level permissions, building on patterns from Linear, Notion, Payload, Directus, and Contentful.

---

## ARCHITECTURE PRINCIPLES

### 1. Defense in Depth
- Multiple layers of permission checks
- Workspace-level, document-level, field-level
- API-level, UI-level, database-level
- Fail-safe defaults (deny by default)

### 2. Principle of Least Privilege
- Users only get minimum required access
- Roles are granular and composable
- Temporary access for specific tasks
- Audit trail for all permission grants

### 3. Type Safety
- Fully typed permission system
- Auto-generated permission types
- Compile-time permission checks
- IDE autocomplete for permissions

### 4. Performance
- Cached permission checks
- Efficient permission evaluation
- Indexed permission lookups
- Batch permission queries

### 5. Flexibility
- Custom roles
- Custom permissions
- Permission inheritance
- Permission composition

---

## PERMISSION MODEL

### Permission Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    PERMISSION HIERARCHY                             │
└─────────────────────────────────────────────────────────────────┘

Workspace Level
├── Workspace Permissions
│   ├── Create Content
│   ├── Read Content
│   ├── Update Content
│   ├── Delete Content
│   ├── Publish Content
│   ├── Manage Users
│   ├── Manage Roles
│   └── Manage Settings
│
Document Level
├── Document Permissions
│   ├── Read Document
│   ├── Update Document
│   ├── Delete Document
│   ├── Publish Document
│   ├── Comment Document
│   └── Share Document
│
Field Level
├── Field Permissions
│   ├── Read Field
│   ├── Update Field
│   └── Delete Field
```

### Permission Types

```typescript
type Permission =
  // Workspace permissions
  | 'workspace:content:create'
  | 'workspace:content:read'
  | 'workspace:content:update'
  | 'workspace:content:delete'
  | 'workspace:content:publish'
  | 'workspace:users:create'
  | 'workspace:users:read'
  | 'workspace:users:update'
  | 'workspace:users:delete'
  | 'workspace:roles:create'
  | 'workspace:roles:read'
  | 'workspace:roles:update'
  | 'workspace:roles:delete'
  | 'workspace:settings:read'
  | 'workspace:settings:update'
  
  // Document permissions
  | 'document:read'
  | 'document:update'
  | 'document:delete'
  | 'document:publish'
  | 'document:comment'
  | 'document:share'
  
  // Field permissions
  | 'field:read'
  | 'field:update'
  | 'field:delete';
```

---

## ROLE SYSTEM

### Role Definition

```typescript
interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean;
  isDefault: boolean;
  inheritsFrom?: string[];
}

class RoleManager {
  private roles = new Map<string, Role>();
  
  register(role: Role): void {
    this.roles.set(role.id, role);
  }
  
  get(id: string): Role | undefined {
    return this.roles.get(id);
  }
  
  list(): Role[] {
    return Array.from(this.roles.values());
  }
  
  getPermissions(roleId: string): Permission[] {
    const role = this.get(roleId);
    if (!role) {
      return [];
    }
    
    // Get direct permissions
    let permissions = [...role.permissions];
    
    // Get inherited permissions
    if (role.inheritsFrom) {
      for (const inheritedRoleId of role.inheritsFrom) {
        const inheritedPermissions = this.getPermissions(inheritedRoleId);
        permissions = [...permissions, ...inheritedPermissions];
      }
    }
    
    return permissions;
  }
  
  hasPermission(roleId: string, permission: Permission): boolean {
    const permissions = this.getPermissions(roleId);
    return permissions.includes(permission);
  }
}
```

### System Roles

```typescript
const systemRoles: Role[] = [
  {
    id: 'owner',
    name: 'Owner',
    description: 'Full access to everything',
    permissions: [
      // All workspace permissions
      'workspace:content:create',
      'workspace:content:read',
      'workspace:content:update',
      'workspace:content:delete',
      'workspace:content:publish',
      'workspace:users:create',
      'workspace:users:read',
      'workspace:users:update',
      'workspace:users:delete',
      'workspace:roles:create',
      'workspace:roles:read',
      'workspace:roles:update',
      'workspace:roles:delete',
      'workspace:settings:read',
      'workspace:settings:update',
    ],
    isSystem: true,
    isDefault: false,
  },
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full access except user/role management',
    permissions: [
      'workspace:content:create',
      'workspace:content:read',
      'workspace:content:update',
      'workspace:content:delete',
      'workspace:content:publish',
      'workspace:users:read',
      'workspace:roles:read',
      'workspace:settings:read',
      'workspace:settings:update',
    ],
    isSystem: true,
    isDefault: false,
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Can create, read, update, and publish content',
    permissions: [
      'workspace:content:create',
      'workspace:content:read',
      'workspace:content:update',
      'workspace:content:publish',
    ],
    isSystem: true,
    isDefault: true,
  },
  {
    id: 'author',
    name: 'Author',
    description: 'Can create and update own content',
    permissions: [
      'workspace:content:create',
      'workspace:content:read',
    ],
    isSystem: true,
    isDefault: false,
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Can only read content',
    permissions: [
      'workspace:content:read',
    ],
    isSystem: true,
    isDefault: false,
  },
];
```

---

## USER ROLES

### User-Role Assignment

```typescript
interface UserRole {
  userId: string;
  roleId: string;
  workspaceId: string;
  assignedAt: Date;
  assignedBy: string;
}

class UserRoleManager {
  private assignments = new Map<string, UserRole>();
  
  assign(userId: string, roleId: string, workspaceId: string, assignedBy: string): void {
    const key = `${userId}:${workspaceId}`;
    const assignment: UserRole = {
      userId,
      roleId,
      workspaceId,
      assignedAt: new Date(),
      assignedBy,
    };
    
    this.assignments.set(key, assignment);
  }
  
  unassign(userId: string, workspaceId: string): void {
    const key = `${userId}:${workspaceId}`;
    this.assignments.delete(key);
  }
  
  getRole(userId: string, workspaceId: string): string | undefined {
    const key = `${userId}:${workspaceId}`;
    const assignment = this.assignments.get(key);
    return assignment?.roleId;
  }
  
  getRoles(userId: string): Map<string, string> {
    const roles = new Map<string, string>();
    
    for (const [key, assignment] of this.assignments.entries()) {
      if (assignment.userId === userId) {
        roles.set(assignment.workspaceId, assignment.roleId);
      }
    }
    
    return roles;
  }
  
  getUsers(roleId: string, workspaceId: string): string[] {
    const users: string[] = [];
    
    for (const [key, assignment] of this.assignments.entries()) {
      if (assignment.roleId === roleId && assignment.workspaceId === workspaceId) {
        users.push(assignment.userId);
      }
    }
    
    return users;
  }
}
```

---

## PERMISSION CHECKER

### Permission Evaluation

```typescript
class PermissionChecker {
  private roleManager: RoleManager;
  private userRoleManager: UserRoleManager;
  private documentPermissionManager: DocumentPermissionManager;
  private fieldPermissionManager: FieldPermissionManager;
  private cache: PermissionCache;
  
  async check(
    userId: string,
    workspaceId: string,
    permission: Permission,
    context?: PermissionContext
  ): Promise<boolean> {
    // Check cache
    const cacheKey = this.getCacheKey(userId, workspaceId, permission, context);
    const cached = this.cache.get(cacheKey);
    if (cached !== undefined) {
      return cached;
    }
    
    // Get user role
    const roleId = this.userRoleManager.getRole(userId, workspaceId);
    if (!roleId) {
      this.cache.set(cacheKey, false);
      return false;
    }
    
    // Check workspace permission
    const hasWorkspacePermission = this.roleManager.hasPermission(roleId, permission);
    if (!hasWorkspacePermission) {
      this.cache.set(cacheKey, false);
      return false;
    }
    
    // Check document permission if context provided
    if (context?.documentId) {
      const hasDocumentPermission = await this.documentPermissionManager.check(
        userId,
        context.documentId,
        permission
      );
      
      if (!hasDocumentPermission) {
        this.cache.set(cacheKey, false);
        return false;
      }
    }
    
    // Check field permission if context provided
    if (context?.documentId && context?.fieldId) {
      const hasFieldPermission = await this.fieldPermissionManager.check(
        userId,
        context.documentId,
        context.fieldId,
        permission
      );
      
      if (!hasFieldPermission) {
        this.cache.set(cacheKey, false);
        return false;
      }
    }
    
    this.cache.set(cacheKey, true);
    return true;
  }
  
  async checkBatch(
    userId: string,
    workspaceId: string,
    permissions: Permission[],
    context?: PermissionContext
  ): Promise<Map<Permission, boolean>> {
    const results = new Map<Permission, boolean>();
    
    for (const permission of permissions) {
      results.set(
        permission,
        await this.check(userId, workspaceId, permission, context)
      );
    }
    
    return results;
  }
  
  private getCacheKey(
    userId: string,
    workspaceId: string,
    permission: Permission,
    context?: PermissionContext
  ): string {
    return `${userId}:${workspaceId}:${permission}:${context?.documentId || ''}:${context?.fieldId || ''}`;
  }
}

interface PermissionContext {
  documentId?: string;
  fieldId?: string;
  contentType?: string;
}

class PermissionCache {
  private cache = new Map<string, boolean>();
  private ttl = 5 * 60 * 1000; // 5 minutes
  private timestamps = new Map<string, number>();
  
  get(key: string): boolean | undefined {
    const timestamp = this.timestamps.get(key);
    if (!timestamp) {
      return undefined;
    }
    
    if (Date.now() - timestamp > this.ttl) {
      this.cache.delete(key);
      this.timestamps.delete(key);
      return undefined;
    }
    
    return this.cache.get(key);
  }
  
  set(key: string, value: boolean): void {
    this.cache.set(key, value);
    this.timestamps.set(key, Date.now());
  }
  
  invalidate(userId: string, workspaceId: string): void {
    const pattern = `${userId}:${workspaceId}:`;
    
    for (const key of this.cache.keys()) {
      if (key.startsWith(pattern)) {
        this.cache.delete(key);
        this.timestamps.delete(key);
      }
    }
  }
}
```

---

## DOCUMENT PERMISSIONS

### Document-Level Access Control

```typescript
interface DocumentPermission {
  documentId: string;
  userId: string;
  permissions: Permission[];
  grantedAt: Date;
  grantedBy: string;
  expiresAt?: Date;
}

class DocumentPermissionManager {
  private permissions = new Map<string, DocumentPermission[]>();
  
  grant(
    documentId: string,
    userId: string,
    permissions: Permission[],
    grantedBy: string,
    expiresAt?: Date
  ): void {
    const key = `${documentId}:${userId}`;
    const existing = this.permissions.get(key) || [];
    
    const permission: DocumentPermission = {
      documentId,
      userId,
      permissions,
      grantedAt: new Date(),
      grantedBy,
      expiresAt,
    };
    
    this.permissions.set(key, [...existing, permission]);
  }
  
  revoke(documentId: string, userId: string): void {
    const key = `${documentId}:${userId}`;
    this.permissions.delete(key);
  }
  
  async check(userId: string, documentId: string, permission: Permission): Promise<boolean> {
    const key = `${documentId}:${userId}`;
    const permissions = this.permissions.get(key);
    
    if (!permissions || permissions.length === 0) {
      return false;
    }
    
    // Check if any permission grant has the requested permission
    for (const grant of permissions) {
      // Check if expired
      if (grant.expiresAt && new Date() > grant.expiresAt) {
        continue;
      }
      
      if (grant.permissions.includes(permission)) {
        return true;
      }
    }
    
    return false;
  }
  
  getPermissions(userId: string, documentId: string): Permission[] {
    const key = `${documentId}:${userId}`;
    const permissions = this.permissions.get(key);
    
    if (!permissions) {
      return [];
    }
    
    // Combine all permissions from all grants
    const allPermissions: Permission[] = [];
    for (const grant of permissions) {
      allPermissions.push(...grant.permissions);
    }
    
    return [...new Set(allPermissions)];
  }
}
```

---

## FIELD PERMISSIONS

### Field-Level Access Control

```typescript
interface FieldPermission {
  documentId: string;
  fieldId: string;
  userId: string;
  permissions: Permission[];
  grantedAt: Date;
  grantedBy: string;
  expiresAt?: Date;
}

class FieldPermissionManager {
  private permissions = new Map<string, FieldPermission[]>();
  
  grant(
    documentId: string,
    fieldId: string,
    userId: string,
    permissions: Permission[],
    grantedBy: string,
    expiresAt?: Date
  ): void {
    const key = `${documentId}:${fieldId}:${userId}`;
    const existing = this.permissions.get(key) || [];
    
    const permission: FieldPermission = {
      documentId,
      fieldId,
      userId,
      permissions,
      grantedAt: new Date(),
      grantedBy,
      expiresAt,
    };
    
    this.permissions.set(key, [...existing, permission]);
  }
  
  revoke(documentId: string, fieldId: string, userId: string): void {
    const key = `${documentId}:${fieldId}:${userId}`;
    this.permissions.delete(key);
  }
  
  async check(
    userId: string,
    documentId: string,
    fieldId: string,
    permission: Permission
  ): Promise<boolean> {
    const key = `${documentId}:${fieldId}:${userId}`;
    const permissions = this.permissions.get(key);
    
    if (!permissions || permissions.length === 0) {
      return false;
    }
    
    // Check if any permission grant has the requested permission
    for (const grant of permissions) {
      // Check if expired
      if (grant.expiresAt && new Date() > grant.expiresAt) {
        continue;
      }
      
      if (grant.permissions.includes(permission)) {
        return true;
      }
    }
    
    return false;
  }
  
  getPermissions(userId: string, documentId: string, fieldId: string): Permission[] {
    const key = `${documentId}:${fieldId}:${userId}`;
    const permissions = this.permissions.get(key);
    
    if (!permissions) {
      return [];
    }
    
    // Combine all permissions from all grants
    const allPermissions: Permission[] = [];
    for (const grant of permissions) {
      allPermissions.push(...grant.permissions);
    }
    
    return [...new Set(allPermissions)];
  }
}
```

---

## PERMISSION MIDDLEWARE

### API Middleware

```typescript
class PermissionMiddleware {
  private permissionChecker: PermissionChecker;
  
  constructor(permissionChecker: PermissionChecker) {
    this.permissionChecker = permissionChecker;
  }
  
  require(permission: Permission) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user.id;
      const workspaceId = req.workspace.id;
      
      const hasPermission = await this.permissionChecker.check(
        userId,
        workspaceId,
        permission
      );
      
      if (!hasPermission) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have permission to perform this action',
        });
      }
      
      next();
    };
  }
  
  requireDocument(permission: Permission) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user.id;
      const workspaceId = req.workspace.id;
      const documentId = req.params.documentId;
      
      const hasPermission = await this.permissionChecker.check(
        userId,
        workspaceId,
        permission,
        { documentId }
      );
      
      if (!hasPermission) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have permission to access this document',
        });
      }
      
      next();
    };
  }
  
  requireField(permission: Permission) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user.id;
      const workspaceId = req.workspace.id;
      const documentId = req.params.documentId;
      const fieldId = req.params.fieldId;
      
      const hasPermission = await this.permissionChecker.check(
        userId,
        workspaceId,
        permission,
        { documentId, fieldId }
      );
      
      if (!hasPermission) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have permission to access this field',
        });
      }
      
      next();
    };
  }
}
```

### UI Permission Guard

```typescript
function usePermission(permission: Permission): boolean {
  const { user, workspace } = useAuth();
  const permissionChecker = usePermissionChecker();
  
  const [hasPermission, setHasPermission] = useState(false);
  
  useEffect(() => {
    permissionChecker
      .check(user.id, workspace.id, permission)
      .then(setHasPermission);
  }, [user, workspace, permission]);
  
  return hasPermission;
}

function PermissionGuard({
  permission,
  children,
  fallback,
}: {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const hasPermission = usePermission(permission);
  
  if (!hasPermission) {
    return fallback || null;
  }
  
  return <>{children}</>;
}

// Usage
function DeleteButton({ documentId }: { documentId: string }) {
  return (
    <PermissionGuard
      permission="document:delete"
      fallback={<span>You don't have permission to delete</span>}
    >
      <button onClick={() => deleteDocument(documentId)}>Delete</button>
    </PermissionGuard>
  );
}
```

---

## PERMISSION UI

### Role Management UI

```
┌─────────────────────────────────────────────────────────────────┐
│  Roles & Permissions                                             │
├─────────────────────────────────────────────────────────────────┤
│  [+ Create Role]                                                 │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Owner                                    [Edit] [Delete]  │   │
│  │ Full access to everything                                 │   │
│  │ Permissions: 15  Users: 1                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Administrator                            [Edit] [Delete]  │   │
│  │ Full access except user/role management                  │   │
│  │ Permissions: 11  Users: 3                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Editor                                   [Edit] [Delete]  │   │
│  │ Can create, read, update, and publish content              │   │
│  │ Permissions: 4  Users: 12                                 │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Role Detail UI

```
┌─────────────────────────────────────────────────────────────────┐
│  Editor                                              [← Back]  │
├─────────────────────────────────────────────────────────────────┤
│  Name: Editor                                                   │
│  Description: Can create, read, update, and publish content     │
│                                                                 │
│  Permissions                                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ ✓ workspace:content:create                                │   │
│  │ ✓ workspace:content:read                                 │   │
│  │ ✓ workspace:content:update                                │   │
│  │ ✓ workspace:content:publish                               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Inherits From: None                                           │
│                                                                 │
│  Users (12)                                                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ @john • @sarah • @mike • ...                              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [Save Changes]                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Document Permission UI

```
┌─────────────────────────────────────────────────────────────────┐
│  Document Permissions                              [Share]    │
├─────────────────────────────────────────────────────────────────┤
│  Owner: @john                                                  │
├─────────────────────────────────────────────────────────────────┤
│  People with access                                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ @john (Owner)                           [×]             │   │
│  │ Can edit, publish, share                                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ @sarah (Editor)                         [×]             │   │
│  │ Can edit, publish                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ @mike (Viewer)                          [×]             │   │
│  │ Can view only                                               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [+ Invite people]                                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## AUDIT LOG

### Permission Audit

```typescript
interface PermissionAuditEntry {
  id: string;
  timestamp: Date;
  userId: string;
  action: 'grant' | 'revoke' | 'check';
  resourceType: 'workspace' | 'document' | 'field';
  resourceId: string;
  permission: Permission;
  grantedBy?: string;
  result: boolean;
  metadata?: Record<string, any>;
}

class PermissionAudit {
  private entries: PermissionAuditEntry[] = [];
  
  log(entry: PermissionAuditEntry): void {
    this.entries.push(entry);
  }
  
  query(filters: AuditFilters): PermissionAuditEntry[] {
    return this.entries.filter(entry => {
      if (filters.userId && entry.userId !== filters.userId) {
        return false;
      }
      
      if (filters.action && entry.action !== filters.action) {
        return false;
      }
      
      if (filters.resourceType && entry.resourceType !== filters.resourceType) {
        return false;
      }
      
      if (filters.resourceId && entry.resourceId !== filters.resourceId) {
        return false;
      }
      
      if (filters.permission && entry.permission !== filters.permission) {
        return false;
      }
      
      if (filters.from && entry.timestamp < filters.from) {
        return false;
      }
      
      if (filters.to && entry.timestamp > filters.to) {
        return false;
      }
      
      return true;
    });
  }
}

interface AuditFilters {
  userId?: string;
  action?: 'grant' | 'revoke' | 'check';
  resourceType?: 'workspace' | 'document' | 'field';
  resourceId?: string;
  permission?: Permission;
  from?: Date;
  to?: Date;
}
```

---

## NEXT STEPS

1. **Design navigation architecture** - Navigation system
2. **Design workspace system** - Workspace system
3. **Design review system** - Review system
4. **Generate full architecture** - After all research and analysis
