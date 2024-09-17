import MillionLint from "@million/lint";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
// export default MillionLint.next({
//   rsc: true
// })(MillionLint.next({
//   rsc: true
// })(nextConfig));

// export default MillionLint.next({
//   rsc: true,
// })(nextConfig);
