import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/cms/lib/client'

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN || '',
  }),
})
