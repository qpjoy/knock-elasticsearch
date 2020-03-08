const { client } = require('../utils/elasticsearch.config');


const searchMD = async (path) => {
    const { body } = await client.search({
        index: 'lilith_api',
        // from: 20,
        // size: 10,
        body: {
            // query: {
            //     match: {
            //         url: path,
            //     }
            // },
            "query": {
                "bool": {
                    "filter": {
                        "term": {
                            "url": path
                        }
                    }
                }
            },
            // "query": {
            //     "constant_score": {
            //         "filter": {
            //             "match": {
            //                 "url": path
            //             }
            //         }                    
            //     }
            // },
            "_source":["marked", "chapters"],
        }
    }, {
        ignore: [404],
        maxRetries: 3
    }).catch(err => console.log(err.meta));
    console.log(body.hits.hits[0]['_source'])
    if (body.hits.hits.length) {
        return body.hits.hits[0]['_source'];
    } else {
        return null;
    }
}

// searchMD('/Markdown/Vector3.md');

module.exports = {
    searchMD
}
