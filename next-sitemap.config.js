// next-sitemap.js

const fetch = require('node-fetch');

async function fetchPaths(url) {
    const res = await fetch(url);
    const data = await res.json();
    if (Array.isArray(data)) {
        return data.map(path => ({ loc: path }));
    } else if (data.paths && Array.isArray(data.paths)) {
        return data.paths.map(path => ({ loc: path }));
    } else {
        throw new Error('Unexpected response format');
    }
}

module.exports = {
    siteUrl: 'https://commuplat.vercel.app',
    generateRobotsTxt: true,
    outDir: './public',
    additionalPaths: async (config) => await fetchPaths('https://commuplat.vercel.app/api/sitemap')
};