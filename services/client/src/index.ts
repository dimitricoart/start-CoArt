import { init } from "@sentry/react";

import { NodeEnv } from "@framework/constants";

import { render } from "./utils/render";
import { App } from "./routes";

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
  throw new Error("[App] Router/App module failed to load. Check for missing or circular dependencies and that env (e.g. BE_URL) is set for production build.");
}

render(App);
