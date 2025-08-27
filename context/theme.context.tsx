import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

// ✅ Custom Lightbulb colors
const PRIMARY = "#04016C"; // Navy Blue
const ACCENT = "#EFAA2B"; // Golden Yellow
const LIGHT_BACKGROUND = "#ffffff";
const DARK_BACKGROUND = "#121212";
const LIGHT_PRIMARY = "#4744A5"; // Light primary color for light theme
const LIGHT_ACCENT = "#6966BF"; // Light accent color for light theme

// ✅ Define your brand-aware themes
const LightTheme = {
  dark: false,
  colors: {
    background: LIGHT_BACKGROUND,
    text: "#000000",
    primary: PRIMARY,
    accent: ACCENT,
    card: "#f2f2f2", // optional: used for cards/surfaces
    border: "#dddddd",
    primaryLight: LIGHT_PRIMARY,
    accentLight: LIGHT_ACCENT,
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    background: DARK_BACKGROUND,
    text: "#ffffff",
    primary: PRIMARY,
    accent: ACCENT,
    card: "#1e1e1e",
    border: "#333333",
    primaryLight: LIGHT_PRIMARY,
    accentLight: LIGHT_ACCENT,
  },
};

// ✅ Create the Theme Context
const ThemeContext = createContext({
  theme: LightTheme,
  toggleTheme: () => {},
});

// ✅ Provider that wraps your app
export const ThemeProvider = ({ children }: any) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(
    systemColorScheme === "dark" ? DarkTheme : LightTheme
  );

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("userTheme");
      if (savedTheme) {
        setTheme(savedTheme === "dark" ? DarkTheme : LightTheme);
      } else {
        setTheme(systemColorScheme === "dark" ? DarkTheme : LightTheme);
      }
    };
    loadTheme();
  }, [systemColorScheme]);

  const toggleTheme = async () => {
    const newTheme = theme === DarkTheme ? LightTheme : DarkTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem("userTheme", newTheme.dark ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ Hook to use the theme in your components
export const useTheme = () => useContext(ThemeContext);