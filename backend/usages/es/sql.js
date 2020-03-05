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

  const { body } = await client.sql.query({
    body: {
      query: "SELECT * FROM \"game-of-thrones\" WHERE house='stark'"
    }
  })

  console.log(body)

  const data = body.rows.map(row => {
    const obj = {}
    for (var i = 0; i < row.length; i++) {
      obj[body.columns[i].name] = row[i]
    }
    return obj
  })

  console.log(data)
}

run().catch(console.log)