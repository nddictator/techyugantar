/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "yugantar-main.cluster-12.preview.emergentcf.cloud",
    "9f19cc48-a18d-475e-a8bf-f299bdfd3ec3.preview.emergentagent.com",
    "*.preview.emergentagent.com",
    "*.preview.emergentcf.cloud",
    "*.emergentagent.com",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
