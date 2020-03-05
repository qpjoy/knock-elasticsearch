const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://23.225.161.124:9200' })

async function run () {
  await client.index({
    index: 'game-of-thrones',
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.',
      house: 'stark'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    body: {
      character: 'Arya Stark',
      quote: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
      house: 'stark'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    refresh: true,
    body: {
      character: 'Tyrion Lannister',
      quote: 'A Lannister always pays his debts.',
      house: 'lannister'
    }
  })

  await client.reindex({
    waitForCompletion: true,
    refresh: true,
    body: {
      source: {
        index: 'game-of-thrones',
        query: {
          match: { character: 'stark' }
        }
      },
      dest: {
        index: 'stark-index'
      },
      script: {
        lang: 'painless',
        source: 'ctx._source.remove("house")'
      }
    }
  })

  const { body } = await client.search({
    index: 'stark-index',
    body: {
      query: { match_all: {} }
    }
  })

  console.log(body.hits.hits)
}

run().catch(console.log)