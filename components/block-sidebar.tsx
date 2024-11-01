'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BlogBlock, blocks } from '@/types/blog';
import { LayoutTemplateIcon } from 'lucide-react';
import { DragOverlay, useDraggable } from '@dnd-kit/core';
import { memo, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

interface BlockSidebarProps {
  className?: string;
  selectedBlock: BlogBlock | null;
  onBlockSelect: (block: BlogBlock) => void;
}

function DraggableBlockButton({
  block,
  isSelected,
}: {
  block: BlogBlock;
  isSelected: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `block-${block.id}`,
    data: { block },
  });

  const style = useMemo(()=> transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 999 : 'auto',
      }
    : undefined ,[transform, isDragging])

  return (
    <Button
      ref={setNodeRef}
      variant={isSelected ? 'secondary' : 'ghost'}
      className={cn(
        'w-full justify-start cursor-move',
        block.color,
        isSelected && 'bg-secondary',
        isDragging && 'opacity-50'
      )}
      style={style}
      {...attributes}
      {...listeners}
    >
      <block.icon className="mr-2 h-4 w-4" />
      {block.name}
    </Button>
  );
}

export const DragOverlayContent = memo(({ block }: { block: BlogBlock }) => {
  return (
    <div className="w-[200px] p-3 bg-white border-2 rounded-lg shadow-lg">
      <div className="flex items-center gap-2">
        <block.icon className="h-4 w-4" />
        <span>{block.name}</span>
      </div>
    </div>
  );
});

export const BlockSidebar = memo(({
  className,
  selectedBlock,
  onBlockSelect,
}: BlockSidebarProps) => {
  const [draggedBlock, setDraggedBlock] = useState<BlogBlock | null>(null);

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="px-4 py-3 border-b">
        <h2 className="flex items-center text-lg font-semibold">
          <LayoutTemplateIcon className="mr-2 h-5 w-5" />
          Blocks
        </h2>
      </div>
      <ScrollArea 
        className="flex-1 p-4 overflow-x-hidden"
        scrollHideDelay={0}
      >
        <div className="space-y-2">
          {blocks.map((block) => (
            <DraggableBlockButton
              key={block.id}
              block={block}
              isSelected={selectedBlock?.id === block.id}
            />
          ))}
        </div>
      </ScrollArea>
      {typeof document !== 'undefined' &&
        createPortal(
          <DragOverlay>
            {draggedBlock && <DragOverlayContent block={draggedBlock} />}
          </DragOverlay>,
          document.body
        )}
    </div>
  );
})