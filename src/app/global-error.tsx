"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import ErrorReporter from "@/components/ErrorReporter";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        if (process.env.NODE_ENV === "production") {
            Sentry.captureException(error);
        }
    }, [error]);

    return <ErrorReporter error={error} reset={reset} />;
}
