import { z } from 'zod';

export const contentBlockSchema = z.object({
  contentBlocks: z.array(
    z.object({
      blockName: z.string().describe('Name of a block for blog.'),
      content: z
        .string()
        .describe('Content of blog for this particular block.'),
    })
  ),
});
