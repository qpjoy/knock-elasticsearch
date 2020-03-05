const fs = require('fs');
const path = require('path');

const cheerio = require('cheerio');



(async () => {
    let content = await fs.readFileSync(path.resolve(__dirname, './test_anchor.html'));
    const $ = cheerio.load(content);
    const idObj = $('[id]');

    let ids = Array.prototype.map.call(idObj, function(item, index) {
        // console.log(index, idObj[index]);
        let id = '';
        let text = '';
        if(item['attribs']) {
            id = item['attribs']['id'];
        }        
        if(item['children'] && item['children'].length && item['children'][0]['data']) {
            text = item['children'][0]['data']
        }        
        console.log(id, text);    
        return {
            url: `#${id}`,
            title: `${text}`
        };
    })

    console.log(ids);

    // const ids = $('[id]').map(item => {
    //     return item['attribs']
    // })
    // console.log($('[id]'));
})()