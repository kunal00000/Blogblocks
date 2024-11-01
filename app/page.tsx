'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout';
import { Editor } from '@/components/editor';
import { BlockSidebar } from '@/components/block-sidebar';
import { BlogBlock, blocks } from '@/types/blog';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export default function Home() {
  const [selectedBlock, setSelectedBlock] = useState<BlogBlock | null>(
    null
  );
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [selectedBlocks, setSelectedBlocks] = useState<BlogBlock[]>(
    []
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if(!over) return;

    if (over.id === 'editor-dropzone') {
      const draggedBlockId = active.id.toString().replace('block-', '');
      const block = blocks.find((t) => t.id === draggedBlockId);

      if (block && !selectedBlocks.find((t) => t.id === block.id)) {
        setSelectedBlocks((prev) => [...prev, block]);
      }
    }
    
    if (active.id !== over.id) {
      setSelectedBlocks((items) => {
        const activeIndex = items.findIndex(
          (item) => item.id === active.id.toString().replace('block-', '')
        );
        const overIndex = items.findIndex(
          (item) => item.id === over.id.toString().replace('block-', '')
        );

        if (activeIndex === -1 || overIndex === -1) return items;

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  return (
    <Layout>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex h-screen bg-background">
          <BlockSidebar
            selectedBlock={selectedBlock}
            onBlockSelect={setSelectedBlock}
            className="w-80 border-r"
          />
          <Editor
            url={url}
            content={content}
            selectedBlocks={selectedBlocks}
            setSelectedBlocks={setSelectedBlocks}
            onUrlChange={setUrl}
            onContentChange={setContent}
            className="flex-1"
          />
        </div>
      </DndContext>
    </Layout>
  );
}
