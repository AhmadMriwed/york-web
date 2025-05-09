"use client";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AntDProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render the theme-dependent parts until we're on the client side
  if (!mounted) {
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#037f85",
          },
        }}
      >
        {children}
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#037f85",
        },
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      <div className={theme}>{children}</div>
    </ConfigProvider>
  );
}
