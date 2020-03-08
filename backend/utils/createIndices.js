const {client} = require('./elasticsearch.config');

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
            analyzer: "ik_max_word",
            search_analyzer: "ik_smart",
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
          chapters: {
            type: 'nested',
            properties: {
              url: {
                type: "keyword"
              },
              anchor: {
                type: "keyword"
              },
              title: {
                type: "keyword"
              },
              chapter: {
                type: 'text',
                analyzer: "ik_max_word",
                search_analyzer: "ik_smart",
                index: 'true'
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