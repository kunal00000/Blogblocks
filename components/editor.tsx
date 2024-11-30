"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogBlock } from "@/types/blog";
import {
  Loader2Icon,
  SendIcon,
  GripVerticalIcon,
  Trash2Icon,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { animateLayoutChanges } from "@/lib/helpers";

interface EditorProps {
  className?: string;
  url: string;
  content: string;
  selectedBlocks: BlogBlock[];
  setSelectedBlocks: React.Dispatch<React.SetStateAction<BlogBlock[]>>;
  onUrlChange: (url: string) => void;
  onContentChange: (content: string) => void;
}

function BlockItem({
  block,
  onRemove,
}: {
  block: BlogBlock;
  onRemove: (id: string) => void;
}) {
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
        "flex items-center gap-2 p-3 group bg-white border rounded-lg shadow-sm",
        isDragging && "shadow-lg"
      )}
    >
      <div
        ref={setNodeRef}
        className="flex items-center gap-2 cursor-move"
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
    id: "editor-dropzone",
  });

  const handleGenerate = useCallback(async () => {
    if (!url) {
      toast({
        title: "Input required",
        description: "Please provide a URL or keywords",
        variant: "destructive",
      });
      return;
    }

    if (selectedBlocks.length === 0) {
      toast({
        title: "Blocks required",
        description: "Please select at least one block",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // TODO: Implement AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onContentChange("Generated content will appear here...");
    setIsGenerating(false);
  }, [onContentChange, selectedBlocks.length, toast, url]);

  return (
    <div className={cn("p-6 space-y-6 overflow-y-scroll pb-12", className)}>
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
            "min-h-[200px] p-4 border-2 border-dashed rounded-lg transition-colors",
            isOver
              ? "border-primary bg-primary/10"
              : "border-gray-200 bg-gray-50",
            selectedBlocks.length > 0 && "pb-20"
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
                    setSelectedBlocks((prev: BlogBlock[]) =>
                      prev.filter((block: BlogBlock) => block.id !== blockId)
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
      </div>
    </div>
  );
}
