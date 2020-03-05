const { client } = require('../utils/elasticsearch.config');


const searchMD = async (path) => {
    const {body} = await client.search({
        index: 'lilith_api',
        // from: 20,
        // size: 10,
        body: { 
          query: {
            match: {
              url: path
            }
          }          
        }
      }, {
        ignore: [404],
        maxRetries: 3
      }).catch(err => console.log(err.meta));
    console.log(body)
    if(body.hits.hits.length) {
      return body.hits.hits[0]['_source']['marked'];      
    }else {
      return null;
    }
}

// getStructure();

module.exports = {
    searchMD
}
