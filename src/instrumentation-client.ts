// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const sentryEnabled = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: "https://b20e8b19b6dc57b1f2afa851450a5605@o4511435691065344.ingest.us.sentry.io/4511435692310528",

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  enabled: sentryEnabled,
  tracesSampleRate: sentryEnabled ? 0.1 : 0,
  // Enable logs to be sent to Sentry
  enableLogs: sentryEnabled,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: sentryEnabled ? 0.1 : 0,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: sentryEnabled ? 1.0 : 0,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: sentryEnabled,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
