/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Project pages and the home salon read image metadata from /public
    // during the build. The dynamic path makes Next's file tracer
    // conservatively add the complete media library to the server function,
    // even though Netlify publishes these files separately as static assets.
    // Excluding them keeps the function below Netlify's 250 MB limit.
    // Any route that calls withImageSizes needs an entry here.
    outputFileTracingExcludes: {
      "/": ["./public/**/*"],
      "/projects/[slug]": ["./public/**/*"],
    },
  },
};

export default nextConfig;
