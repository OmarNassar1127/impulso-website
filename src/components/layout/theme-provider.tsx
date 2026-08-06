"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Always render children so every page is fully server-rendered into the
  // static HTML (critical for Google and no-JS AI crawlers). The theme is
  // forced to light, so there is no hydration mismatch to guard against;
  // <html> already carries suppressHydrationWarning.
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
