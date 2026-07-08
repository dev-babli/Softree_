# RBAC roles (Sanity project)

| Role | Capabilities |
|------|----------------|
| **Administrator** | Full Studio access, schema deploy, token management |
| **Editor** | Create/edit/publish editorial documents |
| **Contributor** | Create drafts; publish blocked by `guardedPublishAction` warnings |
| **Viewer** | Read-only via Vision tool |

Configure at [sanity.io/manage](https://sanity.io/manage) → Project → API → Roles.

Softree production dataset: `production` — restrict write tokens to CI and server routes only.
