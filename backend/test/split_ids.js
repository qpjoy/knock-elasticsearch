const cheerio = require('cheerio');
const html = `
<div>Prelude</div>

<h2>First Header</h2>
<p>Paragraph <b>here</b>.</p>
<p>Another paragraph.</p>
<!-- comment -->

<h2 id="second">Second Header</h2>
<ul>
  <li>One</li>
  <li>Two</li>
</ul>
<h3 id="second">Second Header</h3>
<blockquote>End quote!</blockquote>
<h6 id="second">Second Header</h6>
123
`;

function splitChapters(html) {
    // load the raw HTML
    // it needs to all be wrapped in *one* big wrapper
    const $ = cheerio.load(`<div id="_body">${html}</div>`);

    // the end goal
    const blocks = [];

    // the buffer
    const section = cheerio
        .load("<div></div>", { decodeEntities: false })("div")
        .eq(0);

    const iterable = [...$("#_body")[0].childNodes];
    let c = 0;
    iterable.forEach(child => {
        if (["h1", "h2", "h3", "h4", "h5", "h6", "h7"].indexOf(child.tagName) >= 0) {
            if (c) {
                blocks.push(section.clone());
                section.empty();
                c = 0; // reset the counter
            }
        }
        c++;
        section.append(child);
    });
    if (c) {
        // stragglers
        blocks.push(section.clone());
    }

    // Test the result
    const blocksAsObj = blocks.map(block => {
        console.log(block[0]['children'][0], ' - - this is block')
        let id = '';
        let text = '';
        if(block && block[0] && block[0]['children'] && block[0]['children'][0]) {
            let temp = block[0]['children'][0];
            if(temp['attribs'] && temp['attribs']['id']) {
                id = temp['attribs']['id'];
            }
            if(temp['children'] && temp['children'][0]) {
                text = temp['children'][0]['data'];
            }        
        }
        return {
            url: `#${id}`,
            title: `${text}`,
            chapter: block.html()
        }
    });
    return blocksAsObj;
}

let arr = splitChapters(html);
console.log(arr, '- - - this is chapters');