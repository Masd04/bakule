const fetch = require('node-fetch');

async function fetchPaths(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data.map(path => ({ loc: path }));
}

module.exports = {
    siteUrl: 'https://commuplat.vercel.app',
    generateRobotsTxt: true,
    outDir: './public',
    additionalPaths: async (config) => await fetchPaths('https://commuplat.vercel.app/api/sitemap')
};