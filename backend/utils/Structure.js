const path = require('path');
const fs = require('fs');
const searchPath = path.resolve(__dirname, '../marked');
const currentPath = '/';
const structure = structure = {
    name: '/',
    url: '/',
    children: []
};
var md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
});

const markdownItAnchor = require('markdown-it-anchor');
const cheerio = require('cheerio');
md.use(markdownItAnchor, {
    level: 1,
    // slugify: string => string,
    permalink: false,
    // renderPermalink: (slug, opts, state, permalink) => {},
    permalinkClass: 'header-anchor',
    permalinkSymbol: '¶',
    permalinkBefore: false
})


function getStructure(path, currentPathInherit, structure) {
    fs.readdir(path, { encoding: "utf8" }, function (err, list) {
        if (err) return console.log(err);
        // console.log(list);
        list.forEach(function (item, index) {
            const currentPath = (currentPathInherit === '/') ? ('/' + item) : (currentPathInherit + '/' + item);

            let ii;

            if (fs.lstatSync(path + '/' + item).isDirectory()) {
                // console.log(`${item} is folder - - -  -${currentPath}`);            
                ii = {
                    name: item,
                    url: currentPath,
                    type: 'folder',
                    children: [],
                }
                structure.children.push(ii);
                getStructure(path + '/' + item, currentPath, structure.children[index]);
            } else {
                // console.log(`${item} is file - - -  ${currentPath}, ----- ${_children}`);

                let data = fs.readFileSync(path.resolve(path, './item'), 'utf8');
                let marked = md.render(data);

                const $ = cheerio.load(marked);
                const idObj = $('[id]');

                let ids = Array.prototype.map.call(idObj, function (item, index) {
                    // console.log(index, item['attribs']['id']);
                    return item['attribs']['id'];
                })

                ii = {
                    name: item,
                    url: currentPath,
                    type: 'file'
                }
                structure.children.push(ii);
            }
        })
    })
}

getStructure(searchPath, currentPath, structure);

setTimeout(() => {
    console.log(structure);
}, 3000);