import { init } from "@sentry/nestjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

import { NodeEnv } from "@framework/constants";

// Ensure to call this before requiring any other modules!
init({
  dsn: process.env.NODE_ENV === NodeEnv.development ? void 0 : process.env.SENTRY_DSN,
  integrations: [
    // Add our Profiling integration
    nodeProfilingIntegration(),
  ],

  // Add Tracing by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Set sampling rate for profiling
  // This is relative to tracesSampleRate
  profilesSampleRate: 1.0,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
