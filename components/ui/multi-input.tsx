"use client";

import { X } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { isValidUrl } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface MultiInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiInput({
  value,
  onChange,
  placeholder = "Add a link...",
  className,
  disabled
}: MultiInputProps) {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLink();
    }
  };

  const handleAddLink = () => {
    const newValue = inputValue.trim();
    
    if (!newValue) return;

    if (!isValidUrl(newValue)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive",
      });
      return;
    }

    if (value.includes(newValue)) {
      toast({
        title: "Duplicate URL",
        description: "This URL has already been added",
        variant: "destructive",
      });
      return;
    }

    onChange([...value, newValue]);
    setInputValue("");
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="button"
          onClick={handleAddLink}
          disabled={disabled || !inputValue.trim()}
          variant="secondary"
        >
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm group hover:bg-secondary/80 transition-colors"
          >
            <a 
              href={item} 
              target="_blank" 
              rel="noopener noreferrer"
              className="max-w-[200px] truncate hover:underline"
            >
              {item}
            </a>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-4 w-4 opacity-50 group-hover:opacity-100 hover:bg-destructive/20 hover:text-destructive"
              onClick={() => handleRemove(index)}
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
