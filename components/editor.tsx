'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlogBlock } from '@/types/blog';
import { Loader2Icon, SendIcon, GripVerticalIcon } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface EditorProps {
  className?: string;
  url: string;
  content: string;
  selectedBlocks: BlogBlock[];
  setSelectedBlocks: (blocks: BlogBlock[]) => void;
  onUrlChange: (url: string) => void;
  onContentChange: (content: string) => void;
}

const BlockItem = ({ block }: { block: BlogBlock }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
  });

  const style = useMemo(()=>({
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 1,
  }),[])

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-2 p-3 bg-white border rounded-lg shadow-sm',
        block.color,
        isDragging && 'shadow-lg'
      )}
      {...attributes}
      {...listeners}
    >
      <GripVerticalIcon className="h-4 w-4 text-gray-400" />
      <block.icon className="h-4 w-4" />
      <span>{block.name}</span>
    </div>
  );
}

export const Editor = ({
  className,
  url,
  content,
  selectedBlocks,
  setSelectedBlocks,
  onUrlChange,
  onContentChange,
}: EditorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { setNodeRef, isOver } = useDroppable({
    id: 'editor-dropzone',
  });

  const handleGenerate = useCallback(async () => {
    if (!url) {
      toast({
        title: 'Input required',
        description: 'Please provide a URL or keywords',
        variant: 'destructive',
      });
      return;
    }

    if (selectedBlocks.length === 0) {
      toast({
        title: 'Blocks required',
        description: 'Please select at least one block',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    // TODO: Implement AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onContentChange('Generated content will appear here...');
    setIsGenerating(false);
  }, [])

  return (
    <div className={cn('p-6 space-y-6', className)}>
      <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">AI Blog Generator</h1>
        <p className="text-muted-foreground">
          Enter a URL or keywords, then drag blocks to organize your article
          structure
        </p>

        <Input
          placeholder="Enter article URL or keywords..."
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          disabled={isGenerating}
        />

        <div
          ref={setNodeRef}
          className={cn(
            'min-h-[200px] p-4 border-2 border-dashed rounded-lg transition-colors',
            isOver ? 'border-primary bg-primary/10' : 'border-gray-200 bg-gray-50'
          )}
        >
          <SortableContext
            items={selectedBlocks}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {selectedBlocks.map((block) => (
                <BlockItem key={block.id} block={block} />
              ))}
            </div>
          </SortableContext>
          {selectedBlocks.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Drag blocks here to organize your article structure
            </p>
          )}
        </div>
        
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <SendIcon className="mr-2 h-4 w-4" />
              Generate Content
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
