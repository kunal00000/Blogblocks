"use client";

import { cn } from "@/lib/utils";
import { TBlogBlock } from "@/types/blog";
import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { animateLayoutChanges } from "@/lib/helpers";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";

interface BlockItemProps {
  block: TBlogBlock;
  onRemove: (id: string) => void;
}

export function BlockItem({ block, onRemove }: BlockItemProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    animateLayoutChanges,
    disabled: isMobile,
  });

  const style = useMemo(
    () => ({
      transform: CSS.Translate.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
      zIndex: isDragging ? 999 : 1,
    }),
    [isDragging, transform, transition]
  );

  return (
    <div
      className={cn(
        "flex items-center gap-2 group border rounded-lg shadow-sm",
        `bg-${block.color}-50 text-${block.color}-600 border-${block.color}-100`,
        isDragging && "shadow-lg",
        "transition-all duration-200"
      )}
    >
      <div
        style={style}
        ref={setNodeRef}
        className="flex items-center py-3 pl-3 grow gap-2 flex-1 min-w-0"
        {...(!isMobile ? { ...attributes, ...listeners } : {})}
        >
        {!isMobile && (
          <GripVerticalIcon className="h-4 w-4 text-gray-400 shrink-0" />
        )}
        <block.icon className="h-4 w-4 shrink-0" />
        <span className="truncate">{block.name}</span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(block.id)}
        className="h-8 w-8 mr-3 my-3 opacity-70 hover:opacity-100 hover:bg-red-500/10 transition-all duration-200"
      >
        <Trash2Icon className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}
