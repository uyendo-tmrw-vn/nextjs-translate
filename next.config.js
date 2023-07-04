/** @type {import('next').NextConfig} */
const withImages = require('next-images');
const { withGoogleFonts } = require('nextjs-google-fonts');

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    disableStaticImages: true,
  },
  ...withGoogleFonts({
    googleFonts: {
      fonts: [
        'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Cormorant:wght@700&display=swap',
      ],
    },
  }),
  ...withImages(),
}

module.exports = nextConfig
