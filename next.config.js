/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.43.54.196', 'localhost:3000'],
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
