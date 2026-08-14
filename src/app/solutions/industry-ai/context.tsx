"use client";

import React, { createContext, useContext } from "react";
import type { IndustryPageConfig } from "./types";

const IndustryConfigContext = createContext<IndustryPageConfig | null>(null);

export function IndustryProvider({
  config,
  children,
}: {
  config: IndustryPageConfig;
  children: React.ReactNode;
}) {
  return (
    <IndustryConfigContext.Provider value={config}>
      {children}
    </IndustryConfigContext.Provider>
  );
}

export function useIndustryConfig(): IndustryPageConfig {
  const ctx = useContext(IndustryConfigContext);
  if (!ctx) {
    throw new Error("useIndustryConfig must be used within IndustryProvider");
  }
  return ctx;
}
