"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function DarkModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const currentTheme = resolvedTheme || theme;

  return (
    <Button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="text-sm p-1 h-6"
    >
      <SunIcon
        className={cn("h-4 w-4", currentTheme === "dark" ? "fill-accent" : "")}
      />
    </Button>
  );
}
