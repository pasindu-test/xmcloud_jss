const jssConfig = require('./src/temp/config');
const plugins = require('./src/temp/next-config-plugins') || {};

// const publicUrl = jssConfig.publicUrl;

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Set assetPrefix to our public URL
  // assetPrefix: publicUrl,

  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  // env: {
  //   PUBLIC_URL: publicUrl,
  // },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: jssConfig.defaultLanguage,
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  // Disable the X-Powered-By header. Follows security best practices.
  // poweredByHeader: false,

  // use this configuration to ensure that only images from the whitelisted domains
  // can be served from the Next.js Image Optimization API
  // see https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'edge*.**',
  //       port: '',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'xmc-*.**',
  //       port: '',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'feaas*.blob.core.windows.net',
  //       port: '',
  //     },
  //   ]
  // },

  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      // rewrite for feature flags
      {
        source: '/.well-known/vercel/flags',
        destination: '/api/vercel/flags',
      },
      // API endpoints
      {
        source: '/sitecore/api/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/api/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      // healthz check
      {
        source: '/healthz',
        destination: '/api/healthz',
      },
      // rewrite for Sitecore service pages
      {
        source: '/sitecore/service/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/service/:path*`,
      },
    ];
  },

  webpack: (config, { isServer, webpack }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        child_process: false, // Add this line
        tls: false, // Add this line
      };
    }

    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^fsevents$/,
      }),
      // Remove node: from import specifiers, because Next.js does not yet support node: scheme
      // https://github.com/vercel/next.js/issues/28774
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      })
    );

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

let withVercelToolbar = (config) => config; // default no-op

try {
  // Attempt to require only if we're in a Node environment that supports 'os.constants'
  withVercelToolbar = require('@vercel/toolbar/plugins/next')();
} catch (error) {
  console.warn('Could not load @vercel/toolbar/plugins/next:', error.message);
}

module.exports = withVercelToolbar(() => {
  return withBundleAnalyzer(
    Object.values(plugins).reduce((acc, plugin) => plugin(acc), nextConfig)
  );
});
