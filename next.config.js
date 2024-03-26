module.exports = {
  images: {
    domains: ["cdn-icons-png.flaticon.com", "cdn4.vectorstock.com"],
  },
  reactStrictMode: false,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
