'use client'

import {EarthGlobeIcon} from '@sanity/icons'
import {Flex, Spinner, Text} from '@sanity/ui'
import {useEffect} from 'react'
import {useRouter} from 'sanity/router'

/** Structure sidebar shortcut — navigates to Presentation tool */
export default function PresentationShortcut() {
  const router = useRouter()

  useEffect(() => {
    router.navigateUrl({path: '/studio/presentation'})
  }, [router])

  return (
    <Flex align="center" justify="center" direction="column" gap={3} padding={5} style={{minHeight: 200}}>
      <EarthGlobeIcon style={{width: 28, height: 28, color: '#ff7a2f'}} />
      <Text size={2} weight="semibold">
        Opening Presentation…
      </Text>
      <Spinner muted />
    </Flex>
  )
}
