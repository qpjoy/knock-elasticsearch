const { client } = require('../utils/elasticsearch.config');
const {flattenDeep} = require('lodash');

const searchChapter = async (keyword) => {
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
            // "query": {
            //     "bool": {
            //         "filter": {
            //             "must": [
            //                 {
            //                     match: {
            //                         "url": path
            //                     }
            //                 }
            //             ]
            //         }
            //     }
            // },
            "query": {
                "nested": {
                    "path": "chapters",
                    "query": {
                        "bool": {
                            "must": [
                                { "match": { "chapters.chapter": keyword } },
                            ]
                        }
                    },
                    "inner_hits": {
                        "_source": {
                           "excludes":[],
                        //    "includes": [
                        //     "chapters.url",
                        //     "chapters.anchor",
                        //     "chapters.title",
                        //     "chapters.chapter"
                        //    ]                         
                        },
                        "highlight": {
                            "fields": {
                                "chapters.chapter": {
                                    "fragment_size": 150,
                                    "number_of_fragments": 3,
                                    "highlight_query": {
                                        "bool": {
                                            "must": {
                                                "match": {
                                                    "chapters.chapter": {
                                                        "query": keyword
                                                    }
                                                }
                                            },
                                        }
                                    }
                                }
                            }
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
            "_source": "false",
        }
    }, {
        ignore: [404],
        maxRetries: 3
    }).catch(err => console.log(err.meta.body.error, ' - - -t his  is error'));

    if (body.hits.hits.length) {

        let multiHits = body.hits.hits.map((hit,index) => {           
            // if(index === 1) {
            //     console.log(JSON.stringify(hit), ' - - - - this is mulll');
            // }
            return hit['inner_hits']['chapters']['hits']['hits']
        })
        // console.log(multiHits, ' - - - this is multiHits')
        let innerHits = flattenDeep(multiHits).map((multiHit) => {
            return {
                ...multiHit['_source'],
                highlight: multiHit['highlight']['chapters.chapter'][0]
            }
        })
        console.log(innerHits, '- - - this is hits')
        // [0]['highlight']['chapters.chapter']
        return innerHits;
    } else {
        return null;
    }
}

// searchMD('/Markdown/Vector3.md');

module.exports = {
    searchChapter
}
