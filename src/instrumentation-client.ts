// Client Sentry init — skipped in local development to cut compile + parse cost.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const sentryEnabled = process.env.NODE_ENV === "production";

export const onRouterTransitionStart = sentryEnabled
  ? (...args: Parameters<
      typeof import("@sentry/nextjs")["captureRouterTransitionStart"]
    >) => {
      void import("@sentry/nextjs").then((Sentry) => {
        Sentry.captureRouterTransitionStart(...args);
      });
    }
  : () => undefined;

if (sentryEnabled) {
  void import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn: "https://b20e8b19b6dc57b1f2afa851450a5605@o4511435691065344.ingest.us.sentry.io/4511435692310528",
      integrations: [Sentry.replayIntegration()],
      enabled: true,
      tracesSampleRate: 0.1,
      enableLogs: true,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      sendDefaultPii: true,
    });
  });
}
