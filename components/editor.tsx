'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TBlogBlock } from '@/types/blog';
import { useCompletion, experimental_useObject as useObject } from 'ai/react';
import { Loader2Icon, SendIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { BlockItem } from './editor/block-item';
import { ContentDisplay } from './editor/content-display';
import { contentBlockSchema } from '@/app/api/generate-content/schema';

interface EditorProps {
  className?: string;
  url: string;
  content: string;
  selectedBlocks: TBlogBlock[];
  setSelectedBlocks: React.Dispatch<React.SetStateAction<TBlogBlock[]>>;
  onUrlChange: (url: string) => void;
  onContentChange: (content: string) => void;
}

export function Editor({
  className,
  url,
  content,
  selectedBlocks,
  setSelectedBlocks,
  onUrlChange,
  onContentChange,
}: EditorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { setNodeRef, isOver } = useDroppable({
    id: 'editor-dropzone',
  });

  const { object, submit } = useObject({
    api: '/api/generate-content',
    schema: contentBlockSchema,
    onFinish: () => {
      setIsGenerating(false);
    },
    onError: (error) => {
      setIsGenerating(false);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
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
    submit({ keywords: url, selectedBlocks });
    onContentChange('Generating content...');
  }, [onContentChange, selectedBlocks, submit, toast, url]);

  return (
    <div className={cn('p-6 space-y-6 overflow-y-scroll pb-12', className)}>
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
            isOver
              ? 'border-primary bg-primary/10'
              : 'border-gray-200 bg-gray-50',
            selectedBlocks.length > 0 && 'pb-20'
          )}
        >
          <SortableContext
            items={selectedBlocks}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {selectedBlocks.map((block) => (
                <BlockItem
                  key={block.id}
                  block={block}
                  onRemove={(blockId: string) => {
                    setSelectedBlocks((prev: TBlogBlock[]) =>
                      prev.filter((block: TBlogBlock) => block.id !== blockId)
                    );
                  }}
                />
              ))}
            </div>
          </SortableContext>
          {selectedBlocks.length === 0 && (
            <p className="text-center text-gray-500 py-20">
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

        {object?.contentBlocks?.map((cb, index) => (
          <div key={index}>
            <p>{cb?.blockName}</p>
            <ContentDisplay content={cb?.content as string} />
          </div>
        ))}
      </div>
    </div>
  );
}
