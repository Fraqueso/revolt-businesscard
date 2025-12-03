const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('bland_full.html', 'utf8');

// 1. Extract CSS links (we found one main one, but let's be sure)
const cssRegex = /href="([^"]+\.css)"/g;
let match;
const cssLinks = [];
while ((match = cssRegex.exec(html)) !== null) {
    cssLinks.push(match[1]);
}

// 2. Extract Body Content
// We want the content inside <body>...</body>
const bodyRegex = /<body[^>]*>([\s\S]*)<\/body>/i;
const bodyMatch = html.match(bodyRegex);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

// 3. Fix relative URLs
// Prepend https://www.bland.ai to src="/..." and href="/..." and srcset="/..."
// But be careful not to double replace or replace external links.
// We'll look for src="/*" where * is not http/https/data

const baseUrl = 'https://www.bland.ai';

// Fix src
bodyContent = bodyContent.replace(/src="\/([^"]*)"/g, `src="${baseUrl}/$1"`);
// Fix href
bodyContent = bodyContent.replace(/href="\/([^"]*)"/g, `href="${baseUrl}/$1"`);
// Fix srcset (more complex, usually comma separated with widths)
// e.g. srcset="/foo.jpg 500w, /bar.jpg 1000w"
bodyContent = bodyContent.replace(/srcset="([^"]*)"/g, (match, p1) => {
    const newSrcset = p1.split(',').map(part => {
        const trimmed = part.trim();
        if (trimmed.startsWith('/')) {
            return `${baseUrl}${trimmed}`;
        }
        return trimmed;
    }).join(', ');
    return `srcset="${newSrcset}"`;
});

// 4. Output
console.log(JSON.stringify({
    cssLinks,
    bodyLength: bodyContent.length,
    snippet: bodyContent.substring(0, 500)
}));

// Save the body content to a file to be read by the agent
fs.writeFileSync('bland_body_processed.html', bodyContent);

