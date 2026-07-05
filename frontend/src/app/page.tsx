import { redirect } from 'next/navigation';

// The Phase 0 foundation/connectivity check is superseded now that the
// real boot flow exists (blueprint §14, Phase 1) — "/" sends visitors
// straight into it, matching the routing strategy in §6. The health check
// itself (src/lib/api.ts, getHealth) is untouched and still available.
export default function RootPage() {
  redirect('/lock');
}