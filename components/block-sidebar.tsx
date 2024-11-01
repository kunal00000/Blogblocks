'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BlogBlock, blocks } from '@/types/blog';
import { LayoutTemplateIcon } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

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
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `block-${block.id}`,
    data: { block },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Button
      ref={setNodeRef}
      variant={isSelected ? 'secondary' : 'ghost'}
      className={cn(
        'w-full z-50 justify-start cursor-move',
        block.color,
        isSelected && 'bg-secondary'
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

export function BlockSidebar({
  className,
  selectedBlock,
  onBlockSelect,
}: BlockSidebarProps) {
  return (
    <div className={cn('flex flex-col overflow-hidden', className)}>
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
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
