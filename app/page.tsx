"use client";

import { useCallback, useMemo, useState } from "react";
import { Editor } from "@/components/editor";
import { BlockSidebar, DragOverlayContent } from "@/components/block-sidebar";
import { TBlogBlock, blocks } from "@/types/blog";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { MEASURING_CONFIG } from "@/lib/helpers";

export default function Home() {
  // State management with TypeScript
  const [selectedBlock, setSelectedBlock] = useState<TBlogBlock | null>(null);
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [selectedBlocks, setSelectedBlocks] = useState<TBlogBlock[]>([]);
  const [draggedBlock, setDraggedBlock] = useState<TBlogBlock | null>(null);

  // Memoized drag modifiers
  const modifiers = useMemo(() => [restrictToWindowEdges], []);

  // Optimized handlers with useCallback
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const blockId = active.id.toString().replace("block-", "");
    const block = blocks.find((b) => b.id === blockId);
    if (block) {
      setDraggedBlock(block);
    }
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedBlock(null);

    if (!over) return;

    // Handle dropping into editor zone
    if (over.id === "editor-dropzone") {
      const draggedBlockId = active.id.toString().replace("block-", "");
      const block = blocks.find((b) => b.id === draggedBlockId);

      if (block) {
        setSelectedBlocks((prev) => {
          if (prev.some((b) => b.id === block.id)) return prev;
          return [...prev, block];
        });
      }
      return;
    }

    // Handle reordering
    if (active.id !== over.id) {
      setSelectedBlocks((items) => {
        const activeIndex = items.findIndex(
          (item) => item.id === active.id.toString().replace("block-", "")
        );
        const overIndex = items.findIndex(
          (item) => item.id === over.id.toString().replace("block-", "")
        );

        if (activeIndex === -1 || overIndex === -1) return items;
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }, []);

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={modifiers}
      measuring={MEASURING_CONFIG}
    >
      <div className="flex h-screen bg-background">
        <BlockSidebar
          selectedBlock={selectedBlock}
          onBlockSelect={setSelectedBlock}
          setSelectedBlocks={setSelectedBlocks}
          className="w-80 border-r"
        />
        <Editor
          url={url}
          content={content}
          selectedBlocks={selectedBlocks}
          setSelectedBlocks={setSelectedBlocks}
          onUrlChange={setUrl}
          onContentChange={setContent}
          className="flex-1 bg-gray-400/10"
        />
      </div>

      {/* Drag Overlay Portal */}
      {typeof document !== "undefined" &&
        createPortal(
          <DragOverlay dropAnimation={null}>
            {draggedBlock && <DragOverlayContent block={draggedBlock} />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
