import { init } from "@sentry/react";

import { NodeEnv } from "@framework/constants";

import { render } from "./utils/render";
import { App } from "./routes";

declare global {
  interface Window {
    __COART_BOOT__?: { startedAt: number; booted: boolean; errors: Array<Record<string, unknown>> };
  }
}

try {
  init({
    dsn: process.env.NODE_ENV === NodeEnv.development ? void 0 : process.env.SENTRY_DSN,
    sendDefaultPii: true,
  });
} catch (e) {
  if (process.env.NODE_ENV !== NodeEnv.production) {
    console.warn("Sentry init failed", e);
  }
}

if (typeof App === "undefined") {
  showBootError("[App] Router/App module failed to load. Check for missing or circular dependencies and that env (e.g. BE_URL) is set for production build.");
} else {
  try {
    render(App);
    if (typeof window !== "undefined" && window.__COART_BOOT__) {
      window.__COART_BOOT__.booted = true;
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const stack = e instanceof Error ? e.stack : "";
    showBootError(msg, stack);
    throw e;
  }
}

function showBootError(message: string, stack?: string): void {
  const container = document.getElementById("app");
  if (!container) return;
  container.innerHTML =
    "<div style=\"padding:24px;font-family:system-ui;max-width:600px;\">" +
    "<h2 style=\"color:#c00;\">Application failed to start</h2>" +
    "<pre style=\"white-space:pre-wrap;word-break:break-all;\">" +
    escapeHtml(message) +
    "</pre>" +
    (stack ? "<pre style=\"font-size:11px;color:#666;\">" + escapeHtml(stack) + "</pre>" : "") +
    "</div>";
  console.error("[boot]", message, stack ?? "");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
