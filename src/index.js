import { createServer } from 'node:http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const port = Number(process.env.PORT ?? 3333)

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' })
  response.end(JSON.stringify(body))
}

async function listCourses(response) {
  const courses = await prisma.course.findMany({
    include: { modules: { orderBy: { order: 'asc' } } },
    orderBy: { createdAt: 'desc' }
  })
  sendJson(response, 200, courses)
}

const server = createServer(async (request, response) => {
  try {
    if (request.method === 'GET' && request.url === '/health') {
      sendJson(response, 200, { status: 'ok' })
      return
    }

    if (request.method === 'GET' && request.url === '/courses') {
      await listCourses(response)
      return
    }

    sendJson(response, 404, { error: 'Rota não encontrada' })
  } catch (error) {
    console.error(error)
    sendJson(response, 500, { error: 'Erro interno do servidor' })
  }
})

server.listen(port, () => {
  console.log(`API disponível em http://localhost:${port}`)
})

async function shutdown() {
  await prisma.$disconnect()
  server.close()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
