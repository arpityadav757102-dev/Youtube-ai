// next.config.js // -------------------------------------------------- // Next.js runtime configuration // Stable, production-safe defaults // --------------------------------------------------

/** @type {import('next').NextConfig} */ const nextConfig = { reactStrictMode: true, swcMinify: true,

experimental: { serverActions: true, },

async headers() { return [ { source: "/api/:path*", headers: [ { key: "Access-Control-Allow-Origin", value: "*" }, { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" }, { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" }, ], }, ]; }, };

module.exports = nextConfig;
