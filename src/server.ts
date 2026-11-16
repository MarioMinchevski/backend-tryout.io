import Fastify from 'fastify'
import itemRoutes from './routes/health.js'
import userRoutes from './routes/users.js'
import tasksRoutes from './routes/tasks.js'


const fastify = Fastify({ logger: true })
const PORT = 9000

fastify.register(itemRoutes)
fastify.register(userRoutes)
fastify.register(tasksRoutes)



const start = async () => {
    try {
        await fastify.listen({ port: PORT })
        console.log(`Server is running on http://127.0.0.1:${PORT}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()