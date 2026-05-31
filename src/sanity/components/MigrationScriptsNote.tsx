"use client"

import { Card, Stack, Text } from "@sanity/ui"

export default function MigrationScriptsNote() {
  return (
    <Card padding={4} radius={3} border>
      <Stack space={4}>
        <Text size={2} weight="semibold">
          Content migration scripts
        </Text>
        <Text size={1} muted>
          Run these from the project root (not in Studio):
        </Text>
        <Stack space={2}>
          {[
            "npm run sanity:import — import legacy content",
            "npm run sanity:migrate-case-study-sections — migrate case study fields",
            "npm run sanity:seed-case-studies — seed demo case studies",
            "npm run sanity:seed-ai-context — seed AI brand voice document",
            "npm run sanity:typegen — regenerate TypeScript types after schema changes",
          ].map((line) => (
            <Text key={line} size={1}>
              {line}
            </Text>
          ))}
        </Stack>
      </Stack>
    </Card>
  )
}
