import type { ReactNode } from 'react';
import { AmbientBackground } from '@/components/primitives/AmbientBackground';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <AmbientBackground>{children}</AmbientBackground>;
}