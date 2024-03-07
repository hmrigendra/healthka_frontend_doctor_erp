/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn4.vectorstock.com"],
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
