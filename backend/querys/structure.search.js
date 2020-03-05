const { client } = require('../utils/elasticsearch.config');


const getStructure = async () => {
    const {body} = await client.search({
        index: 'lilith_api',
        // from: 20,
        // size: 10,
        body: { 
          query: {
            match: {
              name: '_structure'
            }
          }          
        }
      }, {
        ignore: [404],
        maxRetries: 3
      }).catch(err => console.log(err.meta));
    // console.log(body.hits.hits[0]['_source']['content'])
    if(body.hits.hits.length) {
      return JSON.parse(body.hits.hits[0]['_source']['content']);      
    }else {
      return null;
    }
}

// getStructure();

module.exports = {
    getStructure
}
