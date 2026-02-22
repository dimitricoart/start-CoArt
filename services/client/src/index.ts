import { init } from "@sentry/react";

import { NodeEnv } from "@framework/constants";

import { render } from "./utils/render";
import { App } from "./routes";

init({
  dsn: process.env.NODE_ENV === NodeEnv.development ? void 0 : process.env.SENTRY_DNS,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

render(App);
