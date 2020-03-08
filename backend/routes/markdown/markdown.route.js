const { getStructure } = require('../../querys/structure.search');
const { searchMD } = require('../../querys/markdown.search');
const { searchChapter} = require('../../querys/chapter.search');

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
    const {path, keyword} = request.query;
    console.log(path, keyword,' this is params')

    if(path) {
      let md = await searchMD(path);
      if(md) {
        return {
          ...md,
          code: 0
        }
      }else {
        return {
          code: -1
        }
      }
    }else if(keyword) {
      let ch = await searchChapter(keyword);
      if(ch) {
        return {
          ...ch,
          code: 0
        }
      }else {
        return {
          msg: 'not found',
          code: -1
        }
      }
    }else {
      return {
        code: -1,
        msg: 'parameters error'
      }
    }    
  });
}

module.exports = markdown