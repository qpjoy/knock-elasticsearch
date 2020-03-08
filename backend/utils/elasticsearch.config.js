const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  // nodes: ['http://23.225.161.124:9200'],
  nodes: ['http://127.0.0.1:9200'],
  // requestTimeout: 5000,
  // sniffInterval: 500,
  // sniffOnStart: true,
  // sniffOnConnectionFault: true
})

// client.on('sniff', (err, req) => {
//   console.log('snif', err ? err.message : '', `${JSON.stringify(req.meta.sniff)}`)
// })

module.exports = {
    client
}

// setInterval(async () => {
//   try {
//     const info = await client.info()
//     console.log(info.body.name)
//   } catch (err) {
//     console.log(err.message);
//   }
// }, 1500)