# Neo Custom Studio

The custom Studio application for Neo — an AI-native Agency Platform.

## Environment Variables

Create `.env.local` with:

```
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## Development

```bash
npx turbo dev --filter=custom-studio
```

Open `http://localhost:3001`.

## Features

- Dark-first Studio shell with sidebar + top bar
- Command palette (`Cmd/Ctrl + K`)
- Workspace switcher
- Navigation with keyboard shortcuts
- AI Assistant page with prompt library
- Content list page
- Server-side AI chat API route (`/api/chat`)
