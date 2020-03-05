const md = require('markdown-it')();
const markdownItAnchor = require('markdown-it-anchor');

md.use(markdownItAnchor, {
    level: 1,
    // slugify: string => string,
    permalink: false,
    // renderPermalink: (slug, opts, state, permalink) => {},
    permalinkClass: 'header-anchor',
    permalinkSymbol: '¶',
    permalinkBefore: false
  })

const fs = require('fs');
const path = require('path');


(async () => {
    let content = await fs.readFileSync(path.resolve(__dirname, './Vector3.md'));
    console.log(md.render(content.toString()));
})()
