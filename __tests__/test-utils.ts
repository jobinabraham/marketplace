import {
  queries,
  Queries,
  render,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import React, { ReactChild, ReactChildren } from "react";

// Wrap this in provider if needed to
const Providers: React.JSXElementConstructor<{
  children: React.ReactElement;
}> = ({ children }: { children: React.ReactElement }) => {
  return children;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";

export { customRender as render };
