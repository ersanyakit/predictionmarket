/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.kewl.exchange", // Doğru hostname
        port: "", // Port belirli değilse boş bırakabilirsiniz
        pathname: "/**" // Tüm alt dizinlere izin vermek için
      }
    ]
  }
};

export default nextConfig;
