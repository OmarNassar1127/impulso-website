"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Render children on the server so pages are statically prerendered (SEO);
  // the next-themes wrapper only kicks in after mount. Returning null here
  // deopted the entire app to client-side rendering. Safe because the theme is
  // forced to "light", so there is no server/client theme mismatch to hide.
  if (!mounted) {
    return <>{children}</>;
  }

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
