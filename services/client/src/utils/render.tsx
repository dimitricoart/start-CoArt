import { Component, type ComponentClass, type ErrorInfo, type FunctionComponent, type ReactNode } from "react";
import { createRoot } from "react-dom/client";

class RootErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[RootErrorBoundary]", error, errorInfo.componentStack);
  }

  render() {
    if (this.state.error) {
      const e = this.state.error;
      return (
        <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 600 }}>
          <h2 style={{ color: "#c00" }}>Application error</h2>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{e.message}</pre>
          {e.stack && <pre style={{ fontSize: 11, color: "#666" }}>{e.stack}</pre>}
        </div>
      );
    }
    return this.props.children;
  }
}

export const render = (App: ComponentClass<any> | FunctionComponent<any>): void => {
  const container = document.getElementById("app");
  if (!container) {
    throw new Error("[render] #app root element not found.");
  }
  const root = createRoot(container);
  root.render(
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  );
};
