const { getStructure } = require('../../querys/structure.search');

async function markdown(fastify, options) {
  const opts = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  }

  fastify.get('/structure', async (request, reply) => {
    let structure = await getStructure();
    if (structure) {
      return {
        structure,
        code: 0
      }
    } else {
      return {
        code: -1
      }
    }
  })

  fastify.get('/markdown', opts, async (request, reply) => {
    console.log(request.ip)
    console.log(request.ips)
    console.log(request.hostname)
    return { hello: 'Markdown' }
  })
}

module.exports = markdown