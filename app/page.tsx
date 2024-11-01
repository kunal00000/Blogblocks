'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout';
import { Editor } from '@/components/editor';
import { TemplateSidebar } from '@/components/template-sidebar';
import { BlogTemplate, templates } from '@/types/blog';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<BlogTemplate | null>(
    null
  );
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [selectedTemplates, setSelectedTemplates] = useState<BlogTemplate[]>(
    []
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === 'editor-dropzone') {
      const draggedTemplateId = active.id.toString().replace('template-', '');
      const template = templates.find((t) => t.id === draggedTemplateId);

      if (template && !selectedTemplates.find((t) => t.id === template.id)) {
        setSelectedTemplates((prev) => [...prev, template]);
      }
    }
  };

  return (
    <Layout>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex h-screen bg-background">
          <TemplateSidebar
            selectedTemplate={selectedTemplate}
            onTemplateSelect={setSelectedTemplate}
            className="w-80 border-r"
          />
          <Editor
            url={url}
            content={content}
            selectedTemplates={selectedTemplates}
            setSelectedTemplates={setSelectedTemplates}
            onUrlChange={setUrl}
            onContentChange={setContent}
            className="flex-1"
          />
        </div>
      </DndContext>
    </Layout>
  );
}
