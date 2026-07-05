import type { Metadata } from 'next';
import { DesktopShell } from '@/components/shell/DesktopShell';

export const metadata: Metadata = {
  title: 'Nova OS — Desktop',
};

// The Phase 1 placeholder (menu bar/sidebar/dock/workspace TODO) is
// superseded now that the real desktop shell exists — its own copy said
// exactly this ("the desktop shell arrives in Phase 2").
export default function DesktopPage() {
  return <DesktopShell />;
}