"use client";

import { TBlogBlock } from "@/types/blog";

interface DragOverlayContentProps {
  block: TBlogBlock;
}

export function DragOverlayContent({ block }: DragOverlayContentProps) {
  return (
    <div
      className={`w-[200px] p-3 border-2 drag-item-active rounded-lg shadow-lg bg-${block.color}-50 text-${block.color}-600 dark:bg-${block.color}-300/30 dark:border-${block.color}-900`}
    >
      <div className="flex items-center gap-2">
        <block.icon className="h-4 w-4" />
        <span className="truncate">{block.name}</span>
      </div>
    </div>
  );
}