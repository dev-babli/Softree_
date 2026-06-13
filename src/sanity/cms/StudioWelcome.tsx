'use client'

import { CaseIcon, DocumentTextIcon, EarthGlobeIcon, SparklesIcon } from '@sanity/icons'
import { Box, Button, Card, Flex, Grid, Stack, Text } from '@sanity/ui'
import { useRouter } from 'sanity/router'

export default function StudioWelcome() {
  const router = useRouter()

  const go = (path: string) => router.navigateUrl({ path })

  return (
    <Box padding={5} sizing="border">
      <Stack space={5}>
        <Stack space={2}>
          <Text size={4} weight="bold">
            Softree Studio
          </Text>
          <Text size={2} muted style={{ maxWidth: '36rem', lineHeight: 1.55 }}>
            Build pages without code. Stack sections, use AI to write copy, and preview on the
            live site in real time.
          </Text>
        </Stack>

        <Grid columns={[1, 1, 3]} gap={3}>
          <Card padding={4} radius={3} border>
            <Stack space={3}>
              <CaseIcon />
              <Text size={2} weight="semibold">
                Case studies
              </Text>
              <Text size={1} muted>
                Client stories with metrics, galleries, and testimonials.
              </Text>
              <Button
                fontSize={1}
                text="New case study"
                tone="primary"
                onClick={() => go('/studio/intent/create/template=caseStudy-composer;type=caseStudy')}
              />
            </Stack>
          </Card>

          <Card padding={4} radius={3} border>
            <Stack space={3}>
              <DocumentTextIcon />
              <Text size={2} weight="semibold">
                Blog
              </Text>
              <Text size={1} muted>
                Articles with classic or section-based layouts.
              </Text>
              <Button
                fontSize={1}
                text="New article"
                tone="primary"
                onClick={() => go('/studio/intent/create/template=post-article;type=post')}
              />
            </Stack>
          </Card>

          <Card padding={4} radius={3} border>
            <Stack space={3}>
              <EarthGlobeIcon />
              <Text size={2} weight="semibold">
                Live preview
              </Text>
              <Text size={1} muted>
                Edit and see changes on your website instantly.
              </Text>
              <Button fontSize={1} text="Open Presentation" onClick={() => go('/studio/presentation')} />
            </Stack>
          </Card>
        </Grid>

        <Card padding={4} radius={3} tone="transparent" border>
          <Flex align="center" gap={2}>
            <SparklesIcon />
            <Text size={1}>
              Tip: Click ✨ on any text field for AI writing help. Browse 100+ visual effects under{' '}
              <strong>React Bits</strong> in the top tool menu.
            </Text>
          </Flex>
        </Card>
      </Stack>
    </Box>
  )
}
