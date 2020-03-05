
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://23.225.161.124:9200' })

async function run () {
  await client.index({
    index: 'game-of-thrones',
    id: '2',
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  const { body } = await client.exists({
    index: 'game-of-thrones',
    id: 2
  })

  console.log(body) // true
}

run().catch(console.log)