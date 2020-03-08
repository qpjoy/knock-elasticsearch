const { client } = require('../utils/elasticsearch.config');


const getStructure = async () => {
  const { body } = await client.search({
    index: 'lilith_api',
    // from: 20,
    // size: 10,
    body: {
      query: {
        match: {
          content: {
            "query": "线性插值"
          }
        }
      },
      "highlight": {
        "fields": {
          "content": {
            "fragment_size" : 150,
            "number_of_fragments" : 3,
            "highlight_query": {
                "bool": {
                    "must": {
                        "match": {
                            "content": {
                                "query": "线性插值"
                            }
                        }
                    },
                    // "should": {
                    //     "match_phrase": {
                    //         "content": {
                    //             "query": "叉乘积",
                    //             "slop": 1,
                    //             "boost": 10.0
                    //         }
                    //     }
                    // },
                    // "minimum_should_match": 0
                }
            }
          }
        }
      }
    }
  }, {
    ignore: [404],
    maxRetries: 3
  }).catch(err => console.log(err.meta));
  console.log(body.hits.hits[0])
  // if (body.hits.hits.length) {
  //   return JSON.parse(body.hits.hits[0]['_source']['content']);
  // } else {
  //   return null;
  // }
}

getStructure();

module.exports = {
  getStructure
}
