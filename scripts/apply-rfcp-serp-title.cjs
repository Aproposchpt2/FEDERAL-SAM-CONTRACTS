'use strict';
const fs = require('fs');

const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');
const title = 'Federal Contract Portal | Government Contract Opportunities';
const canonical = 'https://federalcontractorportal.aproposgroupllc.com/';

function replaceOne(pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`[rfcp-serp-title] missing ${label}`);
  html = html.replace(pattern, replacement);
}

replaceOne(/<title>[^<]*<\/title>/i, `<title>${title}</title>`, 'title');
replaceOne(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${title}">`, 'Open Graph title');
replaceOne(/<meta name="twitter:title" content="[^"]*">/i, `<meta name="twitter:title" content="${title}">`, 'Twitter title');
replaceOne(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonical}">`, 'canonical');
replaceOne(/<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${canonical}">`, 'Open Graph URL');

fs.writeFileSync(file, html, 'utf8');
console.log('[rfcp-serp-title] PASS — homepage title, social metadata, and self-referencing canonical applied');
