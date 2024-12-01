import {
  Anchor,
  AlertTriangle,
  Laugh,
  Ban,
  BarChart3,
  Quote,
  FileText,
  BookOpen,
  MessageSquareQuote,
  Lightbulb,
  BookMarked,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export interface TBlogBlock {
  id: string;
  name: string;
  icon: any;
  prompt: string;
}

export const blocks: TBlogBlock[] = [
  {
    id: 'hook',
    name: 'Hook',
    icon: Anchor,
    prompt:
      "Create an engaging opening that immediately captures the reader's attention.",
  },
  {
    id: 'problem-statement',
    name: 'Problem Statement',
    icon: AlertTriangle,
    prompt:
      'Clearly define the central challenge or issue the blog post will address.',
  },
  {
    id: 'joke',
    name: 'Joke',
    icon: Laugh,
    prompt:
      "Insert a relevant, light-hearted joke that connects to the blog's theme.",
  },
  {
    id: 'myth-busting',
    name: 'Myth Busting',
    icon: Ban,
    prompt: 'Identify and debunk common misconceptions related to the topic.',
  },
  {
    id: 'statistics',
    name: 'Statistics',
    icon: BarChart3,
    prompt:
      "Provide data-driven insights that support the blog's main argument.",
  },
  {
    id: 'inspirational-quote',
    name: 'Inspirational Quote',
    icon: Quote,
    prompt: "Include a motivational quote that reinforces the blog's message.",
  },
  {
    id: 'summary',
    name: 'Summary',
    icon: FileText,
    prompt: 'Provide a concise overview of the key points discussed.',
  },
  {
    id: 'personal-story',
    name: 'Personal Story',
    icon: BookOpen,
    prompt:
      'Share a brief, relatable personal experience that illustrates the topic.',
  },
  {
    id: 'testimonial',
    name: 'Testimonial',
    icon: MessageSquareQuote,
    prompt:
      'Present a credible quote or story from someone who has relevant experience.',
  },
  {
    id: 'solution',
    name: 'Solution',
    icon: Lightbulb,
    prompt: 'Offer practical, actionable solutions to the problem discussed.',
  },
  {
    id: 'resource',
    name: 'Resource',
    icon: BookMarked,
    prompt: 'Recommend additional resources for readers to explore further.',
  },
  {
    id: 'call-to-action',
    name: 'Call to Action',
    icon: ArrowRight,
    prompt: 'Encourage readers to take specific, meaningful steps.',
  },
  {
    id: 'conclusion',
    name: 'Conclusion',
    icon: CheckCircle,
    prompt: 'Wrap up the blog with a powerful, memorable closing statement.',
  },
];
