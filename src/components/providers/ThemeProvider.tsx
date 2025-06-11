"use client";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import { ConfigProvider, theme } from "antd";
import { useTheme } from "next-themes";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <AntDesignThemeProvider>{children}</AntDesignThemeProvider>
    </NextThemesProvider>
  );
}

function AntDesignThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme: appTheme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          appTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#037f85",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
