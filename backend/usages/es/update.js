const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://23.225.161.124:9200' })

async function run () {
  await client.index({
    index: 'game-of-thrones',
    id: '1',
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.',
      times: 0
    }
  })

  await client.update({
    index: 'game-of-thrones',
    id: '1',
    body: {
      script: {
        lang: 'painless',
        source: 'ctx._source.times++'
        // you can also use parameters
        // source: 'ctx._source.times += params.count',
        // params: { count: 1 }
      }
    }
  })

  const { body } = await client.get({
    index: 'game-of-thrones',
    id: '1'
  })

  console.log(body)
}

run().catch(console.log)