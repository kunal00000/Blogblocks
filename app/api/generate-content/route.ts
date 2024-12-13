import { TBlogBlock } from '@/types/blog';
import { NextRequest } from 'next/server';
import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { contentBlockSchema } from './schema';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { keywords, selectedBlocks, internalLinks } = await request.json();

    if (!keywords || !selectedBlocks || selectedBlocks.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Keywords and blocks are required' }),
        { status: 400 }
      );
    }

    // Construct block-specific guidance
    const blockGuidance = selectedBlocks
      .map((block: TBlogBlock) => `[${block.name}]: ${block.prompt}`)
      .join('\n');

    // Construct internal links guidance
    const linksGuidance = internalLinks && internalLinks.length > 0
      ? `\nInternal Links to Include:\n${internalLinks.map((link: string) => `- ${link}`).join('\n')}`
      : '';

    const prompt = `
      You are an expert blog writer. Create a comprehensive, engaging blog post.

      Keywords: ${keywords}
      ${linksGuidance}

      Blog Structure Guidelines:
      ${blockGuidance}

      Requirements:
      - Use the selected blocks in the order provided
      - Ensure smooth transitions between blocks
      - Write in a conversational, engaging style
      - Provide actionable insights
      - Aim for 800-1200 words
      - Use markdown for formatting
      - Include clear headings for each section
      - Make sure to separate sections with newlines
      ${internalLinks.length > 0 ? '- Naturally incorporate the provided internal links where relevant' : ''}

      Write the blog post now:
    `;

    const result = streamObject({
      model: google('gemini-1.5-flash-latest'),
      schema: contentBlockSchema,
      prompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Blog generation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate blog content' }),
      { status: 500 }
    );
  }
}
