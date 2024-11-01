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

export interface BlogTemplate {
  id: string;
  name: string;
  icon: any;
  color: string;
}

export const templates: BlogTemplate[] = [
  {
    id: "hook",
    name: "Hook",
    icon: Anchor,
    color: "text-yellow-500 hover:text-yellow-600",
  },
  {
    id: "problem-statement",
    name: "Problem Statement",
    icon: AlertTriangle,
    color: "text-red-500 hover:text-red-600",
  },
  {
    id: "joke",
    name: "Joke",
    icon: Laugh,
    color: "text-green-500 hover:text-green-600",
  },
  {
    id: "myth-busting",
    name: "Myth Busting",
    icon: Ban,
    color: "text-purple-500 hover:text-purple-600",
  },
  {
    id: "statistics",
    name: "Statistics",
    icon: BarChart3,
    color: "text-blue-500 hover:text-blue-600",
  },
  {
    id: "inspirational-quote",
    name: "Inspirational Quote",
    icon: Quote,
    color: "text-indigo-500 hover:text-indigo-600",
  },
  {
    id: "summary",
    name: "Summary",
    icon: FileText,
    color: "text-gray-500 hover:text-gray-600",
  },
  {
    id: "personal-story",
    name: "Personal Story",
    icon: BookOpen,
    color: "text-pink-500 hover:text-pink-600",
  },
  {
    id: "testimonial",
    name: "Testimonial",
    icon: MessageSquareQuote,
    color: "text-orange-500 hover:text-orange-600",
  },
  {
    id: "solution",
    name: "Solution",
    icon: Lightbulb,
    color: "text-yellow-600 hover:text-yellow-700",
  },
  {
    id: "resource",
    name: "Resource",
    icon: BookMarked,
    color: "text-teal-500 hover:text-teal-600",
  },
  {
    id: "call-to-action",
    name: "Call to Action",
    icon: ArrowRight,
    color: "text-red-600 hover:text-red-700",
  },
  {
    id: "conclusion",
    name: "Conclusion",
    icon: CheckCircle,
    color: "text-green-600 hover:text-green-700",
  },
];