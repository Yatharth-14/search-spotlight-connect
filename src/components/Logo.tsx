import React from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Logo = () => {
  const { theme } = useTheme();

  return (
    <>
      <img
        src="/lovable-uploads/c2c0e920-a554-4d65-8e05-10b2d47db13e.png"
        alt="National Trade Fair"
        className={`h-10 md:h-12 ${theme === "dark" ? "invert" : ""}`}
      />
    </>
  );
};
