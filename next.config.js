const nextConfig = {
  // Lint runs separately (`npm run lint`); a lint error must not block a deploy.
  eslint: { ignoreDuringBuilds: true },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/@:org/:project*',
          destination: '/@org/:org/:project*',
        },
      ],
    };
  },
  serverRuntimeConfig: {
    github_pat: process.env.GITHUB_PAT ? process.env.GITHUB_PAT : null,
  },
};

module.exports = nextConfig;
