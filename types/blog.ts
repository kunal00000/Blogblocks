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
} from "lucide-react";

export interface BlogBlock {
  id: string;
  name: string;
  icon: any;
}

export const blocks: BlogBlock[] = [
  {
    id: "hook",
    name: "Hook",
    icon: Anchor,
  },
  {
    id: "problem-statement",
    name: "Problem Statement",
    icon: AlertTriangle,
  },
  {
    id: "joke",
    name: "Joke",
    icon: Laugh,
  },
  {
    id: "myth-busting",
    name: "Myth Busting",
    icon: Ban,
  },
  {
    id: "statistics",
    name: "Statistics",
    icon: BarChart3,
  },
  {
    id: "inspirational-quote",
    name: "Inspirational Quote",
    icon: Quote,
  },
  {
    id: "summary",
    name: "Summary",
    icon: FileText,
  },
  {
    id: "personal-story",
    name: "Personal Story",
    icon: BookOpen,
  },
  {
    id: "testimonial",
    name: "Testimonial",
    icon: MessageSquareQuote,
  },
  {
    id: "solution",
    name: "Solution",
    icon: Lightbulb,
  },
  {
    id: "resource",
    name: "Resource",
    icon: BookMarked,
  },
  {
    id: "call-to-action",
    name: "Call to Action",
    icon: ArrowRight,
  },
  {
    id: "conclusion",
    name: "Conclusion",
    icon: CheckCircle,
  },
];