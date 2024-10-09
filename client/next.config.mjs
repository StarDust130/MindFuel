/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.icons8.com",
        port: "",
        pathname: "/color/**", // Adjusted to match the image path
      },
    ],
  },
};

export default nextConfig;
