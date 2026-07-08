'use client'

import { NextStudio } from 'next-sanity/studio'

import config from '../../../../cms.config'

/** Softree CMS v2 — canonical config at cms.config.ts */
export default function Studio() {
  return <NextStudio config={config} />
}
