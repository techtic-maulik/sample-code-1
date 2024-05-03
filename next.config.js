/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    NEXT_PUBLIC_GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
    NEXT_PUBLIC_GOOGLE_SECRET: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    NEXT_PUBLIC_FACEBOOK_APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
    NEXT_PUBLIC_MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
    NEXT_PUBLIC_MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID,
  },
  distDir: "build",
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "198.58.107.47",
      },{
        protocol: "http",
        hostname: "admin.joinfamilytable.com",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
};

module.exports = nextConfig;
