const {client} = require('../../utils/elasticsearch.pool');

client.indices.create({
    index: 'lilith_api',
    body: {
      mappings: {
        properties: {
          id: { type: 'integer' },
          name: { type: 'keyword' },
          url: { type: 'keyword' },
          type: { type: 'keyword' },
          marked: {
            type: 'text',
            index: 'true'
          },
          content: {
            type: 'text'
          },
          folders: {
            type: 'nested',
            properties: {
              name: {
                type: "keyword"
              },
              url: {
                type: "keyword"
              }
            }
          },
          files: {
            type: 'nested',
            properties: {
              name: {
                type: "keyword"
              },
              url: {
                type: "keyword"
              }
            }
          },
          v: {
            type: "keyword"
          },
          time: {
            type: 'date',
            format: "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          }
        }
      }
    }
  }, { ignore: [400] }).then((...dt) => {
    dt.map(console.log);  
  });