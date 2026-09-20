# Prisma Course API

Projeto prático da aula inicial de Prisma ORM. A aplicação modela cursos e módulos, usa PostgreSQL em um container Docker e controla a estrutura do banco com Prisma Migrate.

## Tecnologias

- Node.js 20+
- Prisma ORM 6
- PostgreSQL 16
- Docker Compose

## Como executar

1. Instale o Docker Desktop e confirme que ele está em execução.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie o arquivo de ambiente:

   ```bash
   copy .env.example .env
   ```

   No macOS/Linux, use `cp .env.example .env`.

4. Suba o PostgreSQL:

   ```bash
   npm run db:up
   ```

5. Gere e aplique a migration:

   ```bash
   npm run db:migrate
   ```

6. Insira os dados de exemplo:

   ```bash
   npm run db:seed
   ```

7. Inicie a API:

   ```bash
   npm run dev
   ```

A API fica em `http://localhost:3333`. Consulte `GET /health` e `GET /courses`. Para explorar os dados visualmente, use `npm run db:studio`.

## Modelo de dados

- `Course` representa um curso e possui muitos `Module`.
- `Module` pertence a um `Course` e possui uma ordem única dentro do curso.
- Ao remover um curso, seus módulos são removidos por `onDelete: Cascade`.

## Dificuldades encontradas

As principais dificuldades foram configurar a conexão entre o Prisma e o PostgreSQL no container, garantir que a ordem dos módulos fosse única dentro de cada curso e entender o fluxo correto entre gerar o Prisma Client, executar a migration e popular os dados.

## Importância do ORM

Um ORM como o Prisma aproxima o código da aplicação do banco usando modelos e tipos consistentes, reduz SQL repetitivo e facilita migrations, relacionamentos e consultas. Isso aumenta a produtividade e a legibilidade, sem esconder a necessidade de conhecer modelagem, índices e o comportamento do banco.

## Publicação no GitHub

Depois de criar um repositório público vazio no GitHub, execute na raiz do projeto:

```bash
git init
git add .
git commit -m "feat: create Prisma course API"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/prisma-course-api.git
git push -u origin main
```

Substitua `SEU_USUARIO` pelo seu usuário e publique neste fórum o endereço do repositório.
