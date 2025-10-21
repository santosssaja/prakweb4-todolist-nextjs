"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDark(saved);
  }, []);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="absolute top-3 right-3 text-sm text-gray-600 dark:text-gray-300"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
