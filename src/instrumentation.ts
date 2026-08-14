export async function register() {
  // Sentry adds large compile/runtime cost in local `next dev`.
  if (process.env.NODE_ENV !== "production") return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

export async function onRequestError(
  ...args: Parameters<
    NonNullable<typeof import("@sentry/nextjs")["captureRequestError"]>
  >
) {
  if (process.env.NODE_ENV !== "production") return;
  const Sentry = await import("@sentry/nextjs");
  return Sentry.captureRequestError(...args);
}
