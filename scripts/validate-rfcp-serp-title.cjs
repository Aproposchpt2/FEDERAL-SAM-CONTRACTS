'use strict';
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const title = 'Federal Contract Portal | Government Contract Opportunities';
const canonical = 'https://federalcontractorportal.aproposgroupllc.com/';
const required = [
  `<title>${title}</title>`,
  `<meta property="og:title" content="${title}">`,
  `<meta name="twitter:title" content="${title}">`,
  `<link rel="canonical" href="${canonical}">`,
  `<meta property="og:url" content="${canonical}">`,
  '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">',
  '"@type":"Organization"',
  '"@type":"WebSite"',
  '"@type":"Service"'
];

const failures = required
  .filter(marker => !html.includes(marker))
  .map(marker => `missing ${marker}`);

if ((html.match(/<link rel="canonical"/gi) || []).length !== 1) failures.push('homepage must contain exactly one canonical tag');
if (title.length > 65) failures.push(`title is too long (${title.length})`);

if (failures.length) {
  console.error('[rfcp-serp-title] Validation failed:');
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`[rfcp-serp-title] PASS — ${title.length}-character title, canonical, crawl directive, social URL, and schema verified`);
