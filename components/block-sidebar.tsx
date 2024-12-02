"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TBlogBlock, blocks } from "@/types/blog";
import { LayoutTemplateIcon, X } from "lucide-react";
import { DragOverlay } from "@dnd-kit/core";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
import { BlockButton } from "@/components/blocks/block-button";
import { DragOverlayContent } from "@/components/blocks/drag-overlay-content";

interface BlockSidebarProps {
  className?: string;
  selectedBlock: TBlogBlock | null;
  onBlockSelect: (block: TBlogBlock) => void;
  setSelectedBlocks: React.Dispatch<React.SetStateAction<TBlogBlock[]>>;
  selectedBlocks: TBlogBlock[];
  onClose?: () => void;
}

export function BlockSidebar({
  className,
  selectedBlock,
  onBlockSelect,
  setSelectedBlocks,
  selectedBlocks,
  onClose,
}: BlockSidebarProps) {
  const [draggedBlock, setDraggedBlock] = useState<TBlogBlock | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className={cn("flex flex-col w-full h-full", className)}>
      <div className="px-4 py-3 border-b flex justify-between items-center bg-background sticky top-0 z-10">
        <h2 className="flex items-center text-lg font-semibold tracking-tight">
          <LayoutTemplateIcon className="mr-2 h-5 w-5" />
          Blocks
        </h2>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="grid gap-2">
          {blocks.map((block) => (
            <BlockButton
              key={block.id}
              block={block}
              isSelected={selectedBlock?.id === block.id}
              isAdded={selectedBlocks.some(b => b.id === block.id)}
              setSelectedBlocks={setSelectedBlocks}
              isMobile={isMobile}
            />
          ))}
        </div>
      </ScrollArea>
      {typeof document !== "undefined" &&
        createPortal(
          <DragOverlay dropAnimation={null}>
            {draggedBlock && <DragOverlayContent block={draggedBlock} />}
          </DragOverlay>,
          document.body
        )}
    </div>
  );
}