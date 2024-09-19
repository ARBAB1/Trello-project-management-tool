/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@acme/ui', 'lodash-es', 'react', 'react-dom','react-modal','antd'],
};

export default nextConfig;
