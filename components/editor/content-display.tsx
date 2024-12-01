'use client';

import { useEffect, useRef } from 'react';
import { marked } from 'marked';

interface ContentDisplayProps {
  content: string;
}

export function ContentDisplay({ content }: ContentDisplayProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = marked(content);
    }
  }, [content]);

  return (
    <div className="mt-8">
      <div
        ref={contentRef}
        className="prose prose-sm max-w-none prose-headings:font-semibold prose-p:text-gray-700 prose-a:text-primary prose-blockquote:border-l-primary"
      />
    </div>
  );
}