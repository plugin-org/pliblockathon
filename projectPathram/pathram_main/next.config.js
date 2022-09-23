/** @type {import('next').NextConfig} */

// const removeImport = require('next-remove-imports');

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  optimizeFonts: false,

  env: {
    NEXTAUTH_URL: "http://localhost:3000/",
    NEXTAUTH_SECRET: "",
    NEXTAUTH_FADMIN_PRIVATE_KEY_ID: "",
    NEXTAUTH_FADMIN_PRIVATE_KEY:
      "-----BEGIN PRIVATE KEY-----\-adminsdk-kuw1a@pathram-d8c60.iam.gserviceaccount.com",
    NEXTAUTH_FADMIN_PROJECT_ID: "",
    NEXTAUTH_FADMIN_DATABASE_URL: "",
    ABSOLUTE_URL: "http://localhost:3000",
  },
});

// const nextConfig = {

// }

// module.exports = nextConfig
