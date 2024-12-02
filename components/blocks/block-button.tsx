"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TBlogBlock } from "@/types/blog";
import { useDraggable } from "@dnd-kit/core";
import { Check, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface BlockButtonProps {
  block: TBlogBlock;
  isSelected: boolean;
  isAdded: boolean;
  setSelectedBlocks: React.Dispatch<React.SetStateAction<TBlogBlock[]>>;
  isMobile: boolean;
}

export function BlockButton({
  block,
  isSelected,
  isAdded,
  setSelectedBlocks,
  isMobile,
}: BlockButtonProps) {
  // Use client-side only rendering for DnD elements
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `block-${block.id}`,
    data: { block },
    disabled: isAdded || isMobile,
  });

  const handleClick = () => {
    if (isMobile && !isAdded) {
      setSelectedBlocks((prev) => {
        if (prev.some((b) => b.id === block.id)) return prev;
        return [...prev, block];
      });
    }
  };

  const buttonClassNames = cn(
    "w-full justify-start border-2",
    `bg-${block.color}-300/10 text-${block.color}-600 border-${block.color}-100`,
    isSelected && "bg-secondary",
    isDragging && "opacity-50",
    !isMobile && !isAdded && "drag-item",
    isAdded && "opacity-50 cursor-not-allowed",
    "transition-all duration-200"
  );

  const dragProps = !isMobile && isMounted ? {
    ref: setNodeRef,
    ...attributes,
    ...listeners,
  } : {};

  return (
    <div className="group relative">
      <Button
        variant={isSelected ? "secondary" : "ghost"}
        onClick={handleClick}
        disabled={isAdded}
        className={buttonClassNames}
        {...dragProps}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <block.icon className="h-4 w-4 shrink-0" />
          <span className="truncate">{block.name}</span>
        </div>
        {isMobile && !isAdded && (
          <Plus className="h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100 ml-2" />
        )}
        {isAdded && (
          <Check className="h-4 w-4 shrink-0 opacity-70 ml-2" />
        )}
      </Button>
    </div>
  );
}