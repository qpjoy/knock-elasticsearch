const { getStructure } = require('../../querys/structure.search');
const { searchMD } = require('../../querys/markdown.search');

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

  fastify.get('/search', async(request, reply) => {
    const {path} = request.query;

    let md = await searchMD(path);
    if(md) {
      return {
        md,
        code: 0
      }
    }else {
      return {
        code: -1
      }
    }
  });

  fastify.get('/markdown', opts, async (request, reply) => {
    console.log(request.ip)
    console.log(request.ips)
    console.log(request.hostname)
    return { hello: 'Markdown' }
  })
}

module.exports = markdown