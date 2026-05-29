import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN || '',
  }),
})
