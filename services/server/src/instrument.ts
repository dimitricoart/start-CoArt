import { init } from "@sentry/nestjs";

import { NodeEnv } from "@framework/constants";

const isProd =
  process.env.NODE_ENV === NodeEnv.production || process.env.NODE_ENV === NodeEnv.staging;

// Do not import @sentry/profiling-node at top level — it loads native code and can cause SIGABRT in Alpine/prod.
function getProfilingIntegration(): unknown {
  if (isProd) return undefined;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { nodeProfilingIntegration } = require("@sentry/profiling-node");
    return nodeProfilingIntegration();
  } catch {
    return undefined;
  }
}

try {
  const profiling = getProfilingIntegration();
  init({
    dsn: process.env.NODE_ENV === NodeEnv.development ? void 0 : process.env.SENTRY_DSN,
    // Profiling is only loaded in dev; in prod the array is empty and this avoids loading native module
    integrations: (profiling ? [profiling] : []) as Parameters<typeof init>[0] extends { integrations?: infer I } ? I : never,
    tracesSampleRate: 1.0,
    profilesSampleRate: isProd ? 0 : 1.0,
    sendDefaultPii: true,
    enableLogs: true,
    debug: false,
  });
} catch (e) {
  console.warn("[instrument] Sentry init failed:", e);
}
