const fastify = require('fastify')({
    logger: true,
    modifyCoreObjects: true
});
fastify.register(require('fastify-cors'), {
    // put your options here
})
fastify.register(require('./routes'))

const start = async () => {
    try {
        await fastify.listen(3456, '0.0.0.0')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start();