'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout';
import { Editor } from '@/components/editor';
import { BlockSidebar } from '@/components/block-sidebar';
import { BlogBlock, blocks } from '@/types/blog';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';

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

    if (over && over.id === 'editor-dropzone') {
      const draggedBlockId = active.id.toString().replace('block-', '');
      const block = blocks.find((t) => t.id === draggedBlockId);

      if (block && !selectedBlocks.find((t) => t.id === block.id)) {
        setSelectedBlocks((prev) => [...prev, block]);
      }
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
