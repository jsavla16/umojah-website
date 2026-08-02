/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Several brand illustrations (stack-logo, warrior/medallion sources)
    // are shipped as .svg files, so next/image needs to be allowed to
    // serve SVGs directly.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
