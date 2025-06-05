import { EditorProvider } from '@/contexts/EditorContext';

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EditorProvider>{children}</EditorProvider>;
}