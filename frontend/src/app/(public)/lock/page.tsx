import type { Metadata } from 'next';
import { LockScreen } from '@/components/screens/LockScreen';

export const metadata: Metadata = {
  title: 'Nova OS — Locked',
};

export default function LockPage() {
  return <LockScreen />;
}