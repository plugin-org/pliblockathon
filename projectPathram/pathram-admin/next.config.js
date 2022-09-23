/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,

  env: {
    GOOGLE_ID:
      "",
    GOOGLE_SECRET: "",
    NEXTAUTH_URL: "http://localhost:3000/",
    NEXTAUTH_SECRET: "",
    NEXTAUTH_FADMIN_PRIVATE_KEY_ID: "",
    NEXTAUTH_FADMIN_PRIVATE_KEY:
      "-----BEGIN PRIVATE KEY-----=\n-----END PRIVATE KEY-----\n",
    NEXTAUTH_FADMIN_CLIENT_EMAIL:
      "",
    NEXTAUTH_FADMIN_PROJECT_ID: "",
    NEXTAUTH_FADMIN_DATABASE_URL: "",
    ABSOLUTE_URL: "http://localhost:3000",
  },
};

module.exports = nextConfig;
