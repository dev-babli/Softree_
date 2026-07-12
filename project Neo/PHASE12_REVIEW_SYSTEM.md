# PHASE 12: REVIEW SYSTEM

## Overview

This document provides a comprehensive review system design for Project Neo's AI-native Agency Platform. The architecture covers the review system design, building on patterns from Linear, Notion, GitHub, and modern collaboration platforms.

---

## ARCHITECTURE PRINCIPLES

### 1. Collaborative Review
- Multiple reviewers per content
- Inline comments and suggestions
- Threaded discussions
- Resolution workflow

### 2. Version Control
- Track all changes
- Compare versions
- Revert to previous versions
- Branch and merge

### 3. Approval Workflow
- Required approvals
- Approval chains
- Conditional approvals
- Auto-approval rules

### 4. Transparency
- Clear review status
- Review history
- Activity feed
- Notifications

### 5. Flexibility
- Custom review workflows
- Custom approval rules
- Custom notification settings
- Integration with other systems

---

## REVIEW MODEL

### Review Definition

```typescript
interface Review {
  id: string;
  contentId: string;
  contentType: string;
  workspaceId: string;
  
  // Status
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'changes_requested';
  
  // Reviewers
  reviewers: Reviewer[];
  requiredApprovals: number;
  
  // Timeline
  createdAt: Date;
  updatedAt: Date;
  dueAt?: Date;
  completedAt?: Date;
  
  // Metadata
  createdBy: string;
  title: string;
  description?: string;
  
  // Changes
  changes: ReviewChange[];
  
  // Comments
  comments: ReviewComment[];
}

interface Reviewer {
  userId: string;
  status: 'pending' | 'approved' | 'rejected' | 'changes_requested';
  reviewedAt?: Date;
  comment?: string;
}

interface ReviewChange {
  id: string;
  type: 'create' | 'update' | 'delete';
  field: string;
  oldValue?: any;
  newValue?: any;
  timestamp: Date;
  userId: string;
}

interface ReviewComment {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
  replies?: ReviewComment[];
  position?: CommentPosition;
}

interface CommentPosition {
  type: 'inline' | 'general';
  line?: number;
  field?: string;
  offset?: number;
  length?: number;
}
```

---

## REVIEW WORKFLOW

### Workflow States

```
┌─────────────────────────────────────────────────────────────────┐
│                    REVIEW WORKFLOW                                │
└─────────────────────────────────────────────────────────────────┘

Draft
  ↓ Request Review
Pending Review
  ↓ All Required Approvals
Approved
  ↓ Publish
Published
  ↓ Request Changes
Changes Requested
  ↓ Resubmit
Pending Review
  ↓ Reject
Rejected
```

### Workflow Implementation

```typescript
class ReviewWorkflow {
  private reviews = new Map<string, Review>();
  
  async create(
    contentId: string,
    contentType: string,
    workspaceId: string,
    createdBy: string,
    options?: CreateReviewOptions
  ): Promise<Review> {
    const id = generateId();
    
    const review: Review = {
      id,
      contentId,
      contentType,
      workspaceId,
      status: 'draft',
      reviewers: options?.reviewers || [],
      requiredApprovals: options?.requiredApprovals || 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueAt: options?.dueAt,
      createdBy,
      title: options?.title || `Review for ${contentType}`,
      description: options?.description,
      changes: [],
      comments: [],
    };
    
    this.reviews.set(id, review);
    
    // Log activity
    await activityFeed.log({
      workspaceId,
      userId: createdBy,
      type: 'review_created',
      entityType: 'review',
      entityId: id,
      data: { contentId, contentType },
    });
    
    return review;
  }
  
  async requestReview(reviewId: string, requestedBy: string): Promise<Review> {
    const review = this.reviews.get(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }
    
    review.status = 'pending';
    review.updatedAt = new Date();
    
    // Set reviewers to pending
    for (const reviewer of review.reviewers) {
      reviewer.status = 'pending';
    }
    
    // Notify reviewers
    for (const reviewer of review.reviewers) {
      await notificationManager.send(reviewer.userId, {
        type: 'review_requested',
        title: 'Review requested',
        message: `You have been requested to review: ${review.title}`,
        link: `/reviews/${reviewId}`,
      });
    }
    
    // Log activity
    await activityFeed.log({
      workspaceId: review.workspaceId,
      userId: requestedBy,
      type: 'review_requested',
      entityType: 'review',
      entityId: reviewId,
      data: { title: review.title },
    });
    
    return review;
  }
  
  async approve(
    reviewId: string,
    userId: string,
    comment?: string
  ): Promise<Review> {
    const review = this.reviews.get(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }
    
    // Find reviewer
    const reviewer = review.reviewers.find(r => r.userId === userId);
    if (!reviewer) {
      throw new Error('User is not a reviewer');
    }
    
    // Update reviewer status
    reviewer.status = 'approved';
    reviewer.reviewedAt = new Date();
    reviewer.comment = comment;
    
    review.updatedAt = new Date();
    
    // Check if all required approvals received
    const approvedCount = review.reviewers.filter(r => r.status === 'approved').length;
    if (approvedCount >= review.requiredApprovals) {
      review.status = 'approved';
      review.completedAt = new Date();
      
      // Notify creator
      await notificationManager.send(review.createdBy, {
        type: 'review_approved',
        title: 'Review approved',
        message: `Your review has been approved: ${review.title}`,
        link: `/reviews/${reviewId}`,
      });
      
      // Log activity
      await activityFeed.log({
        workspaceId: review.workspaceId,
        userId,
        type: 'review_approved',
        entityType: 'review',
        entityId: reviewId,
        data: { title: review.title },
      });
    }
    
    return review;
  }
  
  async reject(
    reviewId: string,
    userId: string,
    comment: string
  ): Promise<Review> {
    const review = this.reviews.get(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }
    
    // Find reviewer
    const reviewer = review.reviewers.find(r => r.userId === userId);
    if (!reviewer) {
      throw new Error('User is not a reviewer');
    }
    
    // Update reviewer status
    reviewer.status = 'rejected';
    reviewer.reviewedAt = new Date();
    reviewer.comment = comment;
    
    review.status = 'rejected';
    review.updatedAt = new Date();
    review.completedAt = new Date();
    
    // Notify creator
    await notificationManager.send(review.createdBy, {
      type: 'review_rejected',
      title: 'Review rejected',
      message: `Your review has been rejected: ${review.title}`,
      link: `/reviews/${reviewId}`,
    });
    
    // Log activity
    await activityFeed.log({
      workspaceId: review.workspaceId,
      userId,
      type: 'review_rejected',
      entityType: 'review',
      entityId: reviewId,
      data: { title: review.title, comment },
    });
    
    return review;
  }
  
  async requestChanges(
    reviewId: string,
    userId: string,
    comment: string
  ): Promise<Review> {
    const review = this.reviews.get(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }
    
    // Find reviewer
    const reviewer = review.reviewers.find(r => r.userId === userId);
    if (!reviewer) {
      throw new Error('User is not a reviewer');
    }
    
    // Update reviewer status
    reviewer.status = 'changes_requested';
    reviewer.reviewedAt = new Date();
    reviewer.comment = comment;
    
    review.status = 'changes_requested';
    review.updatedAt = new Date();
    
    // Notify creator
    await notificationManager.send(review.createdBy, {
      type: 'review_changes_requested',
      title: 'Changes requested',
      message: `Changes have been requested for: ${review.title}`,
      link: `/reviews/${reviewId}`,
    });
    
    // Log activity
    await activityFeed.log({
      workspaceId: review.workspaceId,
      userId,
      type: 'review_changes_requested',
      entityType: 'review',
      entityId: reviewId,
      data: { title: review.title, comment },
    });
    
    return review;
  }
  
  async resubmit(reviewId: string, userId: string): Promise<Review> {
    const review = this.reviews.get(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }
    
    review.status = 'pending';
    review.updatedAt = new Date();
    
    // Reset reviewers to pending
    for (const reviewer of review.reviewers) {
      reviewer.status = 'pending';
      reviewer.reviewedAt = undefined;
    }
    
    // Notify reviewers
    for (const reviewer of review.reviewers) {
      await notificationManager.send(reviewer.userId, {
        type: 'review_resubmitted',
        title: 'Review resubmitted',
        message: `Review has been resubmitted: ${review.title}`,
        link: `/reviews/${reviewId}`,
      });
    }
    
    // Log activity
    await activityFeed.log({
      workspaceId: review.workspaceId,
      userId,
      type: 'review_resubmitted',
      entityType: 'review',
      entityId: reviewId,
      data: { title: review.title },
    });
    
    return review;
  }
  
  get(id: string): Review | undefined {
    return this.reviews.get(id);
  }
  
  list(filters?: ReviewFilters): Review[] {
    let reviews = Array.from(this.reviews.values());
    
    if (filters?.contentId) {
      reviews = reviews.filter(r => r.contentId === filters.contentId);
    }
    
    if (filters?.contentType) {
      reviews = reviews.filter(r => r.contentType === filters.contentType);
    }
    
    if (filters?.workspaceId) {
      reviews = reviews.filter(r => r.workspaceId === filters.workspaceId);
    }
    
    if (filters?.status) {
      reviews = reviews.filter(r => r.status === filters.status);
    }
    
    if (filters?.createdBy) {
      reviews = reviews.filter(r => r.createdBy === filters.createdBy);
    }
    
    if (filters?.reviewer) {
      reviews = reviews.filter(r => r.reviewers.some(rev => rev.userId === filters.reviewer));
    }
    
    // Sort by updated date descending
    reviews.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    
    return reviews;
  }
}

interface CreateReviewOptions {
  title?: string;
  description?: string;
  reviewers?: Reviewer[];
  requiredApprovals?: number;
  dueAt?: Date;
}

interface ReviewFilters {
  contentId?: string;
  contentType?: string;
  workspaceId?: string;
  status?: Review['status'];
  createdBy?: string;
  reviewer?: string;
}
```

---

## INLINE COMMENTS

### Comment System

```typescript
class CommentSystem {
  private comments = new Map<string, ReviewComment>();
  
  async add(
    reviewId: string,
    userId: string,
    content: string,
    position?: CommentPosition
  ): Promise<ReviewComment> {
    const id = generateId();
    
    const comment: ReviewComment = {
      id,
      userId,
      content,
      timestamp: new Date(),
      resolved: false,
      position,
      replies: [],
    };
    
    this.comments.set(id, comment);
    
    // Add to review
    const review = reviewWorkflow.get(reviewId);
    if (review) {
      review.comments.push(comment);
      review.updatedAt = new Date();
    }
    
    // Notify reviewers
    if (review) {
      for (const reviewer of review.reviewers) {
        if (reviewer.userId !== userId) {
          await notificationManager.send(reviewer.userId, {
            type: 'comment_added',
            title: 'New comment',
            message: `New comment on: ${review.title}`,
            link: `/reviews/${reviewId}#comment-${id}`,
          });
        }
      }
    }
    
    return comment;
  }
  
  async reply(
    commentId: string,
    userId: string,
    content: string
  ): Promise<ReviewComment> {
    const parentComment = this.comments.get(commentId);
    if (!parentComment) {
      throw new Error('Comment not found');
    }
    
    const id = generateId();
    
    const reply: ReviewComment = {
      id,
      userId,
      content,
      timestamp: new Date(),
      resolved: false,
      replies: [],
    };
    
    if (!parentComment.replies) {
      parentComment.replies = [];
    }
    
    parentComment.replies.push(reply);
    
    // Notify parent comment author
    await notificationManager.send(parentComment.userId, {
      type: 'comment_replied',
      title: 'Reply to your comment',
      message: `Someone replied to your comment`,
      link: `/reviews/#comment-${commentId}`,
    });
    
    return reply;
  }
  
  async resolve(commentId: string, userId: string): Promise<ReviewComment> {
    const comment = this.comments.get(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }
    
    comment.resolved = true;
    comment.resolvedBy = userId;
    comment.resolvedAt = new Date();
    
    return comment;
  }
  
  async unresolve(commentId: string): Promise<ReviewComment> {
    const comment = this.comments.get(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }
    
    comment.resolved = false;
    comment.resolvedBy = undefined;
    comment.resolvedAt = undefined;
    
    return comment;
  }
  
  get(id: string): ReviewComment | undefined {
    return this.comments.get(id);
  }
  
  list(reviewId: string): ReviewComment[] {
    const review = reviewWorkflow.get(reviewId);
    if (!review) {
      return [];
    }
    
    return review.comments;
  }
}
```

---

## VERSION CONTROL

### Version Tracking

```typescript
interface ContentVersion {
  id: string;
  contentId: string;
  contentType: string;
  version: number;
  data: any;
  createdAt: Date;
  createdBy: string;
  comment?: string;
}

class VersionControl {
  private versions = new Map<string, ContentVersion[]>();
  
  async save(
    contentId: string,
    contentType: string,
    data: any,
    userId: string,
    comment?: string
  ): Promise<ContentVersion> {
    const id = generateId();
    
    // Get existing versions
    const existing = this.versions.get(contentId) || [];
    const version = existing.length + 1;
    
    const contentVersion: ContentVersion = {
      id,
      contentId,
      contentType,
      version,
      data,
      createdAt: new Date(),
      createdBy: userId,
      comment,
    };
    
    existing.push(contentVersion);
    this.versions.set(contentId, existing);
    
    return contentVersion;
  }
  
  get(contentId: string, version?: number): ContentVersion | undefined {
    const versions = this.versions.get(contentId);
    if (!versions) {
      return undefined;
    }
    
    if (version) {
      return versions.find(v => v.version === version);
    }
    
    // Return latest
    return versions[versions.length - 1];
  }
  
  list(contentId: string): ContentVersion[] {
    return this.versions.get(contentId) || [];
  }
  
  compare(contentId: string, versionA: number, versionB: number): VersionDiff {
    const versions = this.versions.get(contentId);
    if (!versions) {
      throw new Error('No versions found');
    }
    
    const a = versions.find(v => v.version === versionA);
    const b = versions.find(v => v.version === versionB);
    
    if (!a || !b) {
      throw new Error('Version not found');
    }
    
    return this.computeDiff(a.data, b.data);
  }
  
  async revert(
    contentId: string,
    version: number,
    userId: string
  ): Promise<ContentVersion> {
    const targetVersion = this.get(contentId, version);
    if (!targetVersion) {
      throw new Error('Version not found');
    }
    
    // Save current state before reverting
    const current = this.get(contentId);
    if (current) {
      await this.save(
        contentId,
        current.contentType,
        current.data,
        userId,
        `Pre-revert backup (version ${current.version})`
      );
    }
    
    // Revert to target version
    await contentManager.update(contentId, targetVersion.data);
    
    // Save as new version
    return await this.save(
      contentId,
      targetVersion.contentType,
      targetVersion.data,
      userId,
      `Reverted to version ${version}`
    );
  }
  
  private computeDiff(dataA: any, dataB: any): VersionDiff {
    // Compute diff between two versions
    return {
      added: [],
      removed: [],
      modified: [],
    };
  }
}

interface VersionDiff {
  added: string[];
  removed: string[];
  modified: DiffChange[];
}

interface DiffChange {
  field: string;
  oldValue: any;
  newValue: any;
}
```

---

## REVIEW UI

### Review List UI

```
┌─────────────────────────────────────────────────────────────────┐
│  Reviews                                        [+ Request Review] │
├─────────────────────────────────────────────────────────────────┤
│  Filter: [All ▼] [Status ▼] [Content Type ▼]                    │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ About Us Review                              Approved     │   │
│  │ Created by @john  2 days ago  2/2 approvals              │   │
│  │ Reviewers: @sarah ✓, @mike ✓                              │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Blog Post #3 Review                       Changes Req   │   │
│  │ Created by @sarah  1 day ago  1/2 approvals              │   │
│  │ Reviewers: @john ✓, @mike ⏳                              │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Review Detail UI

```
┌─────────────────────────────────────────────────────────────────┐
│  About Us Review                                    [← Back]     │
├─────────────────────────────────────────────────────────────────┤
│  Status: Approved  Created by @john  2 days ago                  │
│                                                                 │
│  Reviewers (2/2 required)                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ @sarah ✓ Approved  "Looks great!"  2 days ago            │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ @mike ✓ Approved  "LGTM"  1 day ago                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Comments (3)                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ @john: "Can we add more details to the hero section?"     │   │
│  │        [Reply] [Resolve]  2 days ago                     │   │
│  │   @sarah: "Sure, I'll add that."                          │   │
│  │        [Reply] [Resolve]  2 days ago                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Changes                                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ • Updated hero section                                    │   │
│  │ • Added call to action                                    │   │
│  │ • Fixed typo in description                              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [Approve] [Request Changes] [Reject]                          │
└─────────────────────────────────────────────────────────────────┘
```

### Inline Comment UI

```
┌─────────────────────────────────────────────────────────────────┐
│  Content Editor                                                 │
├─────────────────────────────────────────────────────────────────┤
│  The quick brown fox jumps over the lazy dog.                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ @john: Can we make this more engaging?                     │   │
│  │ [Reply] [Resolve]                                         │   │
│  └──────────────────────────────────────────────────────────┘   │
│  The quick brown fox jumps over the lazy dog.                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## APPROVAL RULES

### Rule Engine

```typescript
interface ApprovalRule {
  id: string;
  name: string;
  description: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  enabled: boolean;
}

interface RuleCondition {
  type: 'content_type' | 'field_value' | 'user_role' | 'workspace_setting';
  field?: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: any;
}

interface RuleAction {
  type: 'require_approval' | 'auto_approve' | 'notify' | 'add_reviewer';
  reviewers?: string[];
  requiredApprovals?: number;
}

class ApprovalRuleEngine {
  private rules = new Map<string, ApprovalRule>();
  
  register(rule: ApprovalRule): void {
    this.rules.set(rule.id, rule);
  }
  
  async evaluate(
    contentId: string,
    contentType: string,
    data: any,
    workspaceId: string
  ): Promise<RuleEvaluationResult> {
    const results: RuleEvaluationResult = {
      requiredReviewers: [],
      requiredApprovals: 1,
      autoApprove: false,
      notifications: [],
    };
    
    for (const rule of this.rules.values()) {
      if (!rule.enabled) {
        continue;
      }
      
      // Check conditions
      const conditionsMet = this.checkConditions(rule.conditions, {
        contentId,
        contentType,
        data,
        workspaceId,
      });
      
      if (conditionsMet) {
        // Execute actions
        for (const action of rule.actions) {
          switch (action.type) {
            case 'require_approval':
              if (action.reviewers) {
                results.requiredReviewers.push(...action.reviewers);
              }
              if (action.requiredApprovals) {
                results.requiredApprovals = action.requiredApprovals;
              }
              break;
            
            case 'auto_approve':
              results.autoApprove = true;
              break;
            
            case 'notify':
              if (action.reviewers) {
                results.notifications.push(...action.reviewers);
              }
              break;
            
            case 'add_reviewer':
              if (action.reviewers) {
                results.requiredReviewers.push(...action.reviewers);
              }
              break;
          }
        }
      }
    }
    
    return results;
  }
  
  private checkConditions(
    conditions: RuleCondition[],
    context: RuleContext
  ): boolean {
    for (const condition of conditions) {
      const met = this.checkCondition(condition, context);
      if (!met) {
        return false;
      }
    }
    return true;
  }
  
  private checkCondition(condition: RuleCondition, context: RuleContext): boolean {
    switch (condition.type) {
      case 'content_type':
        return this.compare(context.contentType, condition.operator, condition.value);
      
      case 'field_value':
        if (!condition.field) return false;
        const fieldValue = context.data[condition.field];
        return this.compare(fieldValue, condition.operator, condition.value);
      
      case 'user_role':
        // Check user role
        return true;
      
      case 'workspace_setting':
        // Check workspace setting
        return true;
      
      default:
        return false;
    }
  }
  
  private compare(value: any, operator: string, expected: any): boolean {
    switch (operator) {
      case 'equals':
        return value === expected;
      case 'not_equals':
        return value !== expected;
      case 'contains':
        return String(value).includes(String(expected));
      case 'greater_than':
        return Number(value) > Number(expected);
      case 'less_than':
        return Number(value) < Number(expected);
      default:
        return false;
    }
  }
}

interface RuleContext {
  contentId: string;
  contentType: string;
  data: any;
  workspaceId: string;
}

interface RuleEvaluationResult {
  requiredReviewers: string[];
  requiredApprovals: number;
  autoApprove: boolean;
  notifications: string[];
}
```

### Built-in Rules

```typescript
const builtInRules: ApprovalRule[] = [
  {
    id: 'high-risk-content',
    name: 'High-Risk Content',
    description: 'Require approval for high-risk content types',
    conditions: [
      {
        type: 'content_type',
        operator: 'equals',
        value: 'legal',
      },
    ],
    actions: [
      {
        type: 'require_approval',
        reviewers: ['legal-team'],
        requiredApprovals: 2,
      },
      {
        type: 'notify',
        reviewers: ['legal-team'],
      },
    ],
    enabled: true,
  },
  {
    id: 'seo-content',
    name: 'SEO Content',
    description: 'Require SEO review for published content',
    conditions: [
      {
        type: 'content_type',
        operator: 'equals',
        value: 'post',
      },
      {
        type: 'field_value',
        field: 'publish',
        operator: 'equals',
        value: true,
      },
    ],
    actions: [
      {
        type: 'require_approval',
        reviewers: ['seo-team'],
        requiredApprovals: 1,
      },
    ],
    enabled: true,
  },
  {
    id: 'minor-updates',
    name: 'Minor Updates',
    description: 'Auto-approve minor typo fixes',
    conditions: [
      {
        type: 'field_value',
        field: 'changeType',
        operator: 'equals',
        value: 'typo',
      },
    ],
    actions: [
      {
        type: 'auto_approve',
      },
    ],
    enabled: true,
  },
];
```

---

## NEXT STEPS

1. **Generate full architecture** - After all research and analysis
