'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlogTemplate } from '@/types/blog';
import { Loader2, Send, GripVertical } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

interface EditorProps {
  className?: string;
  url: string;
  content: string;
  selectedTemplates: BlogTemplate[];
  setSelectedTemplates: (templates: BlogTemplate[]) => void;
  onUrlChange: (url: string) => void;
  onContentChange: (content: string) => void;
}

function TemplateItem({ template }: { template: BlogTemplate }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: template.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-2 p-3 bg-white border rounded-lg shadow-sm z-50',
        template.color
      )}
      {...attributes}
      {...listeners}
    >
      <GripVertical className="h-4 w-4 text-gray-400" />
      <template.icon className="h-4 w-4" />
      <span>{template.name}</span>
    </div>
  );
}

export function Editor({
  className,
  url,
  content,
  selectedTemplates,
  setSelectedTemplates,
  onUrlChange,
  onContentChange,
}: EditorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { setNodeRef } = useDroppable({
    id: 'editor-dropzone',
  });

  const handleGenerate = async () => {
    if (!url) {
      toast({
        title: 'Input required',
        description: 'Please provide a URL or keywords',
        variant: 'destructive',
      });
      return;
    }

    if (selectedTemplates.length === 0) {
      toast({
        title: 'Templates required',
        description: 'Please select at least one template',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    // TODO: Implement AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onContentChange('Generated content will appear here...');
    setIsGenerating(false);
  };

  return (
    <div className={cn('p-6 space-y-6', className)}>
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">AI Blog Generator</h1>
        <p className="text-muted-foreground">
          Enter a URL or keywords, then drag templates to organize your article
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
          className="min-h-[200px] p-4 border-2 border-dashed rounded-lg bg-gray-50"
        >
          <SortableContext
            items={selectedTemplates}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {selectedTemplates.map((template) => (
                <TemplateItem key={template.id} template={template} />
              ))}
            </div>
          </SortableContext>
          {selectedTemplates.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Drag templates here to organize your article structure
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Generate Content
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
