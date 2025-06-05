import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YouTube Shorts Creator - 5分で作れるプロ品質のショート動画',
  description: 'Instagram感覚で簡単に作れるショート動画作成アプリ。YouTube動画の切り抜きも簡単。',
  keywords: 'YouTube, ショート動画, 動画編集, 切り抜き動画',
  openGraph: {
    title: 'YouTube Shorts Creator',
    description: '5分で作れるプロ品質のショート動画',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="dark">
      <body className={inter.className}>
        <main className="min-h-screen bg-black">
          {children}
        </main>
      </body>
    </html>
  );
}