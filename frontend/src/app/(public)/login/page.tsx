import type { Metadata } from 'next';
import { LoginScreen } from '@/components/screens/LoginScreen';

export const metadata: Metadata = {
  title: 'Nova OS — Sign in',
};

export default function LoginPage() {
  return <LoginScreen />;
}