import nextPwa from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['knex'],
  },
  reactStrictMode: true,
};

/** ✅ Exclude problematic files from precaching */
const withPWA = nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false, // Must be false to enable SW in production
  buildExcludes: [
    /middleware-manifest.json$/,
    /app-build-manifest\.json$/, // ✅ Exclude this to fix the 404 error
  ],
});

export default withPWA(nextConfig);
