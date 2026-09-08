import 'server-only'

import { defineLive } from 'next-sanity/live'

import { cmsClient } from './client'
import { cmsReadToken } from './token'

export const { sanityFetch: cmsLiveFetch, SanityLive: CmsSanityLive } = defineLive({
  client: cmsClient,
  serverToken: cmsReadToken || false,
  browserToken: cmsReadToken || false,
  fetchOptions: {
    revalidate: 0,
  },
})

/** @deprecated Use cmsLiveFetch */
export const liveSanityFetch = cmsLiveFetch

/** @deprecated Use CmsSanityLive */
export const SanityLive = CmsSanityLive
