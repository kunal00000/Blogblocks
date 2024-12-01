import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Blog Blocks - AI Tool for Organizing Blog Content',
  description: 'Use Blog Blocks to structure your blog content with ease. Input keywords and arrange predefined blocks to create a well-organized article layout.',
  keywords: ['Blog Blocks', 'AI blog generator', 'blog structure', 'content creation tool', 'organize blogs', 'blogging tool'],
  authors: [{ name: 'Kunal Verma' }],
  openGraph: {
    title: 'Blog Blocks - AI Tool for Organizing Blog Content',
    description: 'Easily structure your blogs using Blog Blocks. Drag and drop blocks to create the perfect layout.',
    url: 'https://blogblocks.pages.dev',
    siteName: 'Blog Blocks',
    images: [
      {
        url: 'https://blogblocks.pages.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Blog Blocks Layout Example',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Blocks - AI Tool for Organizing Blog Content',
    description: 'Effortlessly structure blogs using AI. Drag and drop predefined blocks to craft your content layout.',
    images: ['https://blogblocks.pages.dev/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://blogblocks.pages.dev',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
