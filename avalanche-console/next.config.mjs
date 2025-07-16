/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/tools/console',
  // Remove standalone output since this is now part of the main app
  // output: 'standalone',
  
  // Disable eslint during builds since we'll use the main app's eslint
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable typescript checks during build since we'll use the main app's checks
  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    // Use the parent's node_modules for server components
    serverComponentsExternalPackages: ['@radix-ui/*'],
  },

  webpack: (config, { isServer }) => {
    // Ensure we use the parent's node_modules
    config.resolve.modules = [
      '../node_modules',
      'node_modules',
      ...config.resolve.modules,
    ];

    // Bundle analyzer configuration
    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer
            ? '../analyze/server.html'
            : '../analyze/client.html',
          openAnalyzer: false,
        })
      );
    }

    return config;
  },
};

export default nextConfig;
