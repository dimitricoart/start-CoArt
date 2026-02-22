import { ComponentClass, FunctionComponent } from "react";
import { createRoot } from "react-dom/client";

export const render = (App: ComponentClass<any> | FunctionComponent<any>): void => {
  const container = document.getElementById("app");
  if (!container) {
    throw new Error("[render] #app root element not found.");
  }
  const root = createRoot(container);
  root.render(<App />);
};
