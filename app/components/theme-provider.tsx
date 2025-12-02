import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children }: any) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      {children}
    </NextThemeProvider>
  );
}
