const { client } = require('../utils/elasticsearch.config');


const mSearch = async () => {
    const { body } = await client.msearch({
        body: [
            { index: 'lilith_api' },
            { query: { match: { name: '_structure' } } },
        ]
    }).catch((err) => {
        console.log(err)
    })

    console.log(body.responses[0].hits.hits[0]['_source']['content'])
}

mSearch();

module.exports = {
    query: mSearch
}
