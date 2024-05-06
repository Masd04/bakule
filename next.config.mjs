await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  images: {
    domains: ['cdn.discordapp.com', 'assets-global.website-files.com', 'encrypted-tbn0.gstatic.com'],
  },

  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default config;
