import React, { Component, ReactNode, CSSProperties } from "react";

interface WebGLErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<
  WebGLErrorBoundaryProps,
  WebGLErrorBoundaryState
> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("WebGL AnimatedGradient error boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export interface WebGLFallbackProps {
  className?: string;
  style?: CSSProperties;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({ className, style }) => {
  return (
    <div
      className={className}
      style={{
        background: "linear-gradient(135deg, #0a001a 0%, #1a0b2e 50%, #2e004f 100%)",
        ...style,
      }}
    />
  );
};
