/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  basePath: "/sale-iq-admin",
  async redirects() {
    return [
      {
          source: '/',
          destination: '/sale-iq-admin',
          basePath: false,
          permanent: false
      }
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.justboil.me',
      },
    ],
  },
}

export default nextConfig