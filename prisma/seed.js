import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const course = await prisma.course.upsert({
    where: { slug: 'prisma-do-zero' },
    update: {},
    create: {
      title: 'Prisma do zero',
      slug: 'prisma-do-zero',
      description: 'Aprenda a modelar dados e trabalhar com Prisma ORM.',
      modules: {
        create: [
          {
            title: 'Fundamentos do Prisma',
            description: 'Schema, Client e fluxo de desenvolvimento.',
            order: 1,
            durationInMinutes: 35
          },
          {
            title: 'Migrations com PostgreSQL',
            description: 'Versionando a estrutura do banco com segurança.',
            order: 2,
            durationInMinutes: 45
          }
        ]
      }
    },
    include: { modules: true }
  })

  console.log(`Curso pronto: ${course.title} (${course.modules.length} módulos)`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
