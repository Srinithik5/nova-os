import type { ReactNode } from 'react';
import { AmbientBackground } from '@/components/primitives/AmbientBackground';

// Not actually access-controlled yet — real JWT-based protection is a
// Phase 3 concern (blueprint §8). This exists now only so /desktop has
// somewhere to render with the same shared background as the boot screens.
export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <AmbientBackground>{children}</AmbientBackground>;
}