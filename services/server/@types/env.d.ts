import { NodeEnv } from "@framework/constants";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: NodeEnv;
    }
  }
}

export = NodeJS;
