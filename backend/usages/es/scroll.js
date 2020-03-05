const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://23.225.161.124:9200' })

// Scroll utility
async function * scrollSearch (params) {
  var response = await client.search(params)

  while (true) {
    const sourceHits = response.body.hits.hits

    if (sourceHits.length === 0) {
      break
    }

    for (const hit of sourceHits) {
      yield hit
    }

    if (!response.body._scroll_id) {
      break
    }

    response = await client.scroll({
      scrollId: response.body._scroll_id,
      scroll: params.scroll
    })
  }
}

async function run () {
  await client.bulk({
    refresh: true,
    body: [
      { index: { _index: 'game-of-thrones' } },
      {
        character: 'Ned Stark',
        quote: 'Winter is coming.'
      },

      { index: { _index: 'game-of-thrones' } },
      {
        character: 'Daenerys Targaryen',
        quote: 'I am the blood of the dragon.'
      },

      { index: { _index: 'game-of-thrones' } },
      {
        character: 'Tyrion Lannister',
        quote: 'A mind needs books like a sword needs a whetstone.'
      }
    ]
  })

  const params = {
    index: 'game-of-thrones',
    scroll: '30s',
    size: 1,
    _source: ['quote'],
    body: {
      query: {
        match_all: {}
      }
    }
  }

  for await (const hit of scrollSearch(params)) {
    console.log(hit._source)
  }
}

run().catch(console.log)