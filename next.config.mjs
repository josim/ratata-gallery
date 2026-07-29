/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Tezcon Europe moved under /upcoming — keep the old URL citable.
    return [
      {
        source: "/tezcon-europe",
        destination: "/upcoming/tezcon-europe",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
