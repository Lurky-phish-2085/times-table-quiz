import { createContext, useContext, useLayoutEffect, useState, type PropsWithChildren } from "react";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme | null;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [
    themeSetting,
    setThemeSetting,
  ] = useLocalStorage<Theme | null>(
    "custom-theme-setting",
    null,
    {
      initializeWithValue: false,
    }
  );

  const isSystemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const systemPreferredTheme: Theme = isSystemPrefersDark ? "dark" : "light";

  const [theme, setTheme] = useState<Theme | null>(null);

  useLayoutEffect(() => {
    const themeToApply = themeSetting ?? systemPreferredTheme;

    document.documentElement.className = themeToApply;

    setTheme(themeToApply);
  }, [themeSetting, systemPreferredTheme]);


  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setThemeSetting((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider
      value={value}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return context;
};

