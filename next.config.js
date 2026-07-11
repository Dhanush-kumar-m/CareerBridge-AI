/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.43.54.196', 'localhost:3000'],
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
