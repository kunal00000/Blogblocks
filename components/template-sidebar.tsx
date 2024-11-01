'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BlogTemplate, templates } from '@/types/blog';
import { LayoutTemplate } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

interface TemplateSidebarProps {
  className?: string;
  selectedTemplate: BlogTemplate | null;
  onTemplateSelect: (template: BlogTemplate) => void;
}

function DraggableTemplateButton({
  template,
  isSelected,
}: {
  template: BlogTemplate;
  isSelected: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `template-${template.id}`,
    data: { template },
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
        template.color,
        isSelected && 'bg-secondary'
      )}
      style={style}
      {...attributes}
      {...listeners}
    >
      <template.icon className="mr-2 h-4 w-4" />
      {template.name}
    </Button>
  );
}

export function TemplateSidebar({
  className,
  selectedTemplate,
  onTemplateSelect,
}: TemplateSidebarProps) {
  return (
    <div className={cn('flex flex-col overflow-hidden', className)}>
      <div className="px-4 py-3 border-b">
        <h2 className="flex items-center text-lg font-semibold">
          <LayoutTemplate className="mr-2 h-5 w-5" />
          Templates
        </h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {templates.map((template) => (
            <DraggableTemplateButton
              key={template.id}
              template={template}
              isSelected={selectedTemplate?.id === template.id}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
