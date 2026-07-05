// Thin typed wrapper over fetch — the only thing in frontend/ that knows the
// backend's REST response shapes (blueprint §2, §11). Requests go to
// same-origin /api/v1/*, which next.config.js rewrites to the backend.
// More endpoints are added here as their phases land; Phase 0 only needs
// the health check to prove the frontend can reach the backend.

export interface HealthResponse {
  status: 'ok';
  service: string;
  timestamp: string;
}

export async function getHealth(): Promise<HealthResponse> {
  const res = await fetch('/api/v1/health', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Health check failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<HealthResponse>;
}