const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://23.225.161.124:9200' })

async function run () {
  await client.index({
    index: 'game-of-thrones',
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    refresh: true,
    body: {
      character: 'Arya Stark',
      quote: 'A girl is Arya Stark of Winterfell. And I\'m going home.'
    }
  })

  await client.updateByQuery({
    index: 'game-of-thrones',
    refresh: true,
    body: {
      script: {
        lang: 'painless',
        source: 'ctx._source["house"] = "stark"'
      },
      query: {
        match: {
          character: 'stark'
        }
      }
    }
  })

  const { body } = await client.search({
    index: 'game-of-thrones',
    body: {
      query: { match_all: {} }
    }
  })

  console.log(body.hits.hits)
}

run().catch(console.log)