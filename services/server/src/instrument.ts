import { init } from "@sentry/nestjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

import { NodeEnv } from "@framework/constants";

const isProd =
  process.env.NODE_ENV === NodeEnv.production || process.env.NODE_ENV === NodeEnv.staging;

// Ensure to call this before requiring any other modules!
try {
  init({
    dsn: process.env.NODE_ENV === NodeEnv.development ? void 0 : process.env.SENTRY_DSN,
    integrations: isProd
      ? []
      : [
          // Profiling native module can cause SIGABRT in some environments (e.g. Alpine); disable in prod
          nodeProfilingIntegration(),
        ],
    tracesSampleRate: 1.0,
    profilesSampleRate: isProd ? 0 : 1.0,
    sendDefaultPii: true,
    enableLogs: true,
    debug: false,
  });
} catch (e) {
  console.warn("[instrument] Sentry init failed:", e);
}
