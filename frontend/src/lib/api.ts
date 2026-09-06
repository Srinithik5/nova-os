// Thin typed wrapper over fetch — the only thing in frontend/ that knows the
// backend's REST response shapes (blueprint §2, §11). Requests go to
// same-origin /api/v1/*, which next.config.js rewrites to the backend.

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

export interface PublicUser {
  id: string;
  email: string;
  displayName: string;
  avatarInitials: string;
  accentColor: string;
}

async function readErrorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const body = (await res.json()) as { error?: string };
    return body.error ?? fallback;
  } catch {
    return fallback;
  }
}

export async function login(email: string, password: string): Promise<PublicUser> {
  const res = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error(await readErrorMessage(res, 'Invalid email or password.'));
  }
  return res.json() as Promise<PublicUser>;
}

export async function logout(): Promise<void> {
  await fetch('/api/v1/auth/logout', { method: 'POST', credentials: 'include' });
}

export async function getMe(): Promise<PublicUser | null> {
  const res = await fetch('/api/v1/auth/me', { credentials: 'include', cache: 'no-store' });
  if (!res.ok) return null;
  return res.json() as Promise<PublicUser>;
}