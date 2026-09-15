"use client";

import { useTheme } from "@/context/ThemeContext";
import { HiMoon, HiSun } from "react-icons/hi";

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();

    if (!mounted) {
        return <div className="w-10 h-10" />;
    }

    return (
        <button
            onClick={toggleTheme}
            type="button"
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <HiSun className="h-5 w-5" />
            ) : (
                <HiMoon className="h-5 w-5" />
            )}
        </button>
    );
}