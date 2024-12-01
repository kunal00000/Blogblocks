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
  color: string;
  prompt: string;
}

export const blocks: TBlogBlock[] = [
  {
    id: 'hook',
    name: 'Hook',
    icon: Anchor,
    color: "amber",
    prompt:
      "Create an engaging opening that immediately captures the reader's attention.",
  },
  {
    id: 'problem-statement',
    name: 'Problem Statement',
    icon: AlertTriangle,
    color: "amber",
    prompt:
      'Clearly define the central challenge or issue the blog post will address.',
  },
  {
    id: 'joke',
    name: 'Joke',
    icon: Laugh,
    color: "amber",
    prompt:
      "Insert a relevant, light-hearted joke that connects to the blog's theme.",
  },
  {
    id: 'myth-busting',
    name: 'Myth Busting',
    color: "amber",
    icon: Ban,
    prompt: 'Identify and debunk common misconceptions related to the topic.',
  },
  {
    id: 'statistics',
    name: 'Statistics',
    icon: BarChart3,
    color: "sky",
    prompt:
      "Provide data-driven insights that support the blog's main argument.",
  },
  {
    id: 'inspirational-quote',
    name: 'Inspirational Quote',
    icon: Quote,
    color: "sky",
    prompt: "Include a motivational quote that reinforces the blog's message.",
  },
  {
    id: 'summary',
    name: 'Summary',
    icon: FileText,
    color: "sky",
    prompt: 'Provide a concise overview of the key points discussed.',
  },
  {
    id: 'personal-story',
    name: 'Personal Story',
    icon: BookOpen,
    color: "sky",
    prompt:
      'Share a brief, relatable personal experience that illustrates the topic.',
  },
  {
    id: 'testimonial',
    name: 'Testimonial',
    icon: MessageSquareQuote,
    color: "sky",
    prompt:
      'Present a credible quote or story from someone who has relevant experience.',
  },
  {
    id: 'solution',
    name: 'Solution',
    color: "sky",
    icon: Lightbulb,
    prompt: 'Offer practical, actionable solutions to the problem discussed.',
  },
  {
    id: 'resource',
    name: 'Resource',
    icon: BookMarked,
    color: "fuchsia",
    prompt: 'Recommend additional resources for readers to explore further.',
  },
  {
    id: 'call-to-action',
    name: 'Call to Action',
    icon: ArrowRight,
    color: "fuchsia",
    prompt: 'Encourage readers to take specific, meaningful steps.',
  },
  {
    id: 'conclusion',
    name: 'Conclusion',
    icon: CheckCircle,
    color: "fuchsia",
    prompt: 'Wrap up the blog with a powerful, memorable closing statement.',
  },
];
