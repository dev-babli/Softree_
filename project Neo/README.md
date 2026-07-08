# Project Neo

AI-native Agency Platform - CMS Replacement

## Setup

### Prerequisites
- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

```bash
# Install dependencies
npm install

# Start development servers
npm run dev
```

### Workspaces

- **frontend**: Next.js 16 frontend with Cache Components
- **studio**: Sanity Studio v6.2.0

### Scripts

```bash
# Development
npm run dev              # Start all workspaces
npm run dev:frontend     # Start frontend only
npm run dev:studio       # Start studio only

# Build
npm run build            # Build all workspaces
npm run build:frontend   # Build frontend only
npm run build:studio     # Build studio only

# Linting
npm run lint             # Lint all workspaces
npm run lint:frontend    # Lint frontend only
npm run lint:studio      # Lint studio only

# Type Checking
npm run typecheck        # Type check all workspaces
npm run typecheck:frontend # Type check frontend only
npm run typecheck:studio   # Type check studio only

# Clean
npm run clean            # Clean all build artifacts
```

## Tech Stack

- **Framework**: Next.js 16.2.9
- **React**: 19.2.7
- **CMS**: Sanity v6.2.0
- **Styling**: Tailwind CSS 4.1
- **Components**: shadcn/ui
- **TypeScript**: 5.9.3
- **Monorepo**: Turbo

## Design System

Based on Raycast-inspired dark theme:
- Canvas: #07080a
- Surface: #0d0d0d
- Accent: #ff5757
- Typography: Inter with ss03 font-feature-settings
