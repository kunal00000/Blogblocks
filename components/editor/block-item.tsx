'use client';

import { cn } from '@/lib/utils';
import { TBlogBlock } from '@/types/blog';
import { GripVerticalIcon, Trash2Icon } from 'lucide-react';
import { useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { animateLayoutChanges } from '@/lib/helpers';

interface BlockItemProps {
  block: TBlogBlock;
  onRemove: (id: string) => void;
}

export function BlockItem({ block, onRemove }: BlockItemProps) {
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
      style={style}
      className={cn(
        'flex items-center gap-2 p-3 group bg-white border rounded-lg shadow-sm',
        isDragging && 'shadow-lg'
      )}
    >
      <div
        ref={setNodeRef}
        className="flex items-center drag-item gap-2"
        {...attributes}
        {...listeners}
      >
        <GripVerticalIcon className="h-4 w-4 text-gray-400" />
        <block.icon className="h-4 w-4" />
        <span>{block.name}</span>
      </div>

      <span
        onClick={() => onRemove(block.id)}
        className="p-1.5 ml-auto rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:bg-red-500/10"
      >
        <Trash2Icon className="h-5 w-5 text-red-500 cursor-pointer" />
      </span>
    </div>
  );
}