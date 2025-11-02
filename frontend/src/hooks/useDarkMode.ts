import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DarkModeState {
  isDark: boolean;
  toggle: () => void;
  setDark: (value: boolean) => void;
}

export const useDarkModeStore = create<DarkModeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggle: () => set((state) => ({ isDark: !state.isDark })),
      setDark: (value: boolean) => set({ isDark: value }),
    }),
    {
      name: "dark-mode",
    }
  )
);

export const useDarkMode = () => {
  const { isDark, toggle, setDark } = useDarkModeStore();

  useEffect(() => {
    // Apply dark mode class to document root
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return { isDark, toggle, setDark };
};
