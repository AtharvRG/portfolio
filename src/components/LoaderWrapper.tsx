"use client";

import { LoaderProvider } from "./LoaderContext";
import PageLoader from "./PageLoader";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LoaderProvider>
      <PageLoader />
      {children}
    </LoaderProvider>
  );
}
