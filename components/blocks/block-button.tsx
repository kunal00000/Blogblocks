"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TBlogBlock } from "@/types/blog";
import { useDraggable } from "@dnd-kit/core";
import { Plus } from "lucide-react";

interface BlockButtonProps {
  block: TBlogBlock;
  isSelected: boolean;
  setSelectedBlocks: React.Dispatch<React.SetStateAction<TBlogBlock[]>>;
  isMobile: boolean;
}

export function BlockButton({
  block,
  isSelected,
  setSelectedBlocks,
  isMobile,
}: BlockButtonProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `block-${block.id}`,
    data: { block },
  });

  const handleClick = () => {
    if (isMobile) {
      setSelectedBlocks((prev) => {
        if (prev.some((b) => b.id === block.id)) return prev;
        return [...prev, block];
      });
    }
  };

  return (
    <div className="group relative">
      <Button
        variant={isSelected ? "secondary" : "ghost"}
        ref={!isMobile ? setNodeRef : undefined}
        {...(!isMobile ? { ...attributes, ...listeners } : {})}
        onClick={handleClick}
        className={cn(
          "w-full justify-start border-2",
          `bg-${block.color}-300/10 text-${block.color}-600 border-${block.color}-100`,
          isSelected && "bg-secondary",
          isDragging && "opacity-50",
          !isMobile && "drag-item",
          "transition-all duration-200"
        )}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <block.icon className="h-4 w-4 shrink-0" />
          <span className="truncate">{block.name}</span>
        </div>
        {isMobile && (
          <Plus className="h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100 ml-2" />
        )}
      </Button>
    </div>
  );
}