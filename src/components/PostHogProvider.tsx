'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

function reportWebVitalsToPostHog() {
  const report = ({ name, value, id }: { name: string; value: number; id: string }) => {
    posthog.capture('web_vital', {
      metric: name,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      id,
      page: window.location.pathname,
    })
  }
  onCLS(report)
  onFCP(report)
  onINP(report)
  onLCP(report)
  onTTFB(report)
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!apiKey) {
      console.warn('[PostHog] Missing NEXT_PUBLIC_POSTHOG_KEY - analytics disabled')
      return
    }

    posthog.init(apiKey, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      ui_host: 'https://us.posthog.com',
      capture_pageview: false, // handled by PostHogPageView
      capture_pageleave: true,
    })

    reportWebVitalsToPostHog()
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
