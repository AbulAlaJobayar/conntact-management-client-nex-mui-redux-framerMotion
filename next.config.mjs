/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//         async rewrites() {
//           return [
//             {
//               source: '/contact/:path*',
//               destination: 'http://localhost:5000/api/v1/contact/:path*',
//             },
//           ];
//         },
//         images: {
//           remotePatterns: [
//             {
//               protocol: "https",
//               hostname: "**",
//             },
//           ],
//         },
//       };

//       module.exports = nextConfig;
