const markdown = require('./markdown/markdown.route');

async function routes(fastify, options) {   
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

    fastify.get('/', opts, async (request, reply) => {
        console.log(request.ip)
        console.log(request.ips)
        console.log(request.hostname)                
        return { hello: 'world' }
    })

    markdown(fastify, options);
}

module.exports = routes