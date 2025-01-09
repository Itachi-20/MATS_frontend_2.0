/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/sign-in',
            permanent: true,
          },
        ]
      },
      experimental: {
        serverActions: {
          bodySizeLimit: '100mb',
        },
      },
};

export default nextConfig;
