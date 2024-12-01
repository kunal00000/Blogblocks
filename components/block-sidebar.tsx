"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {TBlogBlock, blocks } from "@/types/blog";
import { LayoutTemplateIcon } from "lucide-react";
import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { createPortal } from "react-dom";

interface BlockSidebarProps {
  className?: string;
  selectedBlock: TBlogBlock | null;
  onBlockSelect: (block: TBlogBlock) => void;
  setSelectedBlocks: React.Dispatch<React.SetStateAction<TBlogBlock[]>>;
}

function DraggableBlockButton({
  block,
  isSelected,
  setSelectedBlocks,
}: {
  block: TBlogBlock;
  isSelected: boolean;
  setSelectedBlocks: React.Dispatch<React.SetStateAction<TBlogBlock[]>>;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `block-${block.id}`,
    data: { block },
  });

  return (
    <Button
      variant={isSelected ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start",
        isSelected && "bg-secondary",
        isDragging && "opacity-50"
      )}
      onClick={() => {
        setSelectedBlocks((prev) => {
          if (prev.some((b) => b.id === block.id)) {
            return prev;
          }
          return [...prev, block];
        });
      }}
    >
      <div
        ref={setNodeRef}
        className="flex items-center gap-2 drag-item"
        {...attributes}
        {...listeners}
      >
        <block.icon className="mr-2 h-4 w-4" />
        {block.name}
      </div>
    </Button>
  );
}

export function DragOverlayContent({ block }: { block: TBlogBlock }) {
  return (
    <div className="w-[200px] p-3 bg-white border-2 drag-item-active rounded-lg shadow-lg">
      <div className="flex items-center gap-2">
        <block.icon className="h-4 w-4" />
        <span>{block.name}</span>
      </div>
    </div>
  );
}

export function BlockSidebar({
  className,
  selectedBlock,
  onBlockSelect,
  setSelectedBlocks,
}: BlockSidebarProps) {
  const [draggedBlock, setDraggedBlock] = useState<TBlogBlock | null>(null);

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div className="px-4 py-3 border-b">
        <h2 className="flex items-center text-lg font-semibold">
          <LayoutTemplateIcon className="mr-2 h-5 w-5" />
          Blocks
        </h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {blocks.map((block) => (
            <DraggableBlockButton
              key={block.id}
              block={block}
              isSelected={selectedBlock?.id === block.id}
              setSelectedBlocks={setSelectedBlocks}
            />
          ))}
        </div>
      </ScrollArea>
      {typeof document !== "undefined" &&
        createPortal(
          <DragOverlay>
            {draggedBlock && <DragOverlayContent block={draggedBlock} />}
          </DragOverlay>,
          document.body
        )}
    </div>
  );
}
