"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface HeroCanvasErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface HeroCanvasErrorBoundaryState {
  hasError: boolean;
}

export class HeroCanvasErrorBoundary extends Component<
  HeroCanvasErrorBoundaryProps,
  HeroCanvasErrorBoundaryState
> {
  state: HeroCanvasErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): HeroCanvasErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[HeroCanvasErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
