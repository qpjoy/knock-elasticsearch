const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://23.225.161.124:9200' })

async function run () {
  await client.index({
    index: 'game-of-thrones',
    id: '1',
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  const { body } = await client.get({
    index: 'game-of-thrones',
    id: '1'
  })

  console.log(body)
}

run().catch(console.log)