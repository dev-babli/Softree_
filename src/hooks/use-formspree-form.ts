"use client";

import { useState } from "react";

/** Default Formspree endpoint used across Softree marketing forms. */
export const DEFAULT_FORMSPREE_ENDPOINT = "https://formspree.io/f/mbdwbkad";

export type FormspreeStatus = "" | "SUCCESS" | "ERROR";

/**
 * Shared submit handler for the simple Formspree-backed marketing forms.
 *
 * Posts the form's `FormData` to the given endpoint, tracks submission
 * status/loading, resets the form on success, and auto-clears the success
 * message after a few seconds.
 */
export function useFormspreeForm(endpoint: string = DEFAULT_FORMSPREE_ENDPOINT) {
  const [status, setStatus] = useState<FormspreeStatus>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("SUCCESS");
        form.reset();
        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("ERROR");
      }
    } catch {
      setStatus("ERROR");
    } finally {
      setLoading(false);
    }
  };

  return { status, setStatus, loading, handleSubmit };
}
