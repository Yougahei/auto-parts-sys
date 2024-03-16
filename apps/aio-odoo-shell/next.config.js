/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  async rewrites() {
    return [
      {
        source: "/odoo/:path*",
        destination: "http://localhost:8069/:path*", // Proxy to Backend
      },
    ];
  },
};
