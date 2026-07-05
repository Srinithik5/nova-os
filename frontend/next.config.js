/** @type {import('next').NextConfig} */
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // Proxies browser calls to /api/v1/* to the separately-deployed Express
    // backend. This keeps the browser on a single origin (no CORS preflight,
    // simple same-site cookies for JWT auth in a later phase) while the
    // frontend and backend remain two independent services. See blueprint §6.
    return [
      {
        source: '/api/v1/:path*',
        destination: `${BACKEND_URL}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;