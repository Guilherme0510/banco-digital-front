# Banco Digital — Frontend (Next.js 15)

Frontend bancário consumindo API Spring Boot com JWT.

## Stack
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Axios · React Hook Form · Zod · Zustand · Sonner · Lucide · date-fns.

## Como rodar

```bash
cp .env.local.example .env.local   # edite se necessário
npm install
npm run dev
```

Acesse http://localhost:3000. A API Spring Boot deve estar em http://localhost:8080 com CORS liberado para http://localhost:3000.

## Estrutura

```
src/
  app/            # rotas (App Router)
  components/     # UI, modais, formulários
  contexts/       # AuthContext
  services/       # axios + serviços de API
  hooks/          # custom hooks
  types/          # tipos compartilhados
  utils/          # format, masks
  validators/     # schemas zod
middleware.ts     # protege rotas autenticadas
```

## Rotas
- `/login`, `/cadastro` — públicas
- `/dashboard` — visão geral
- `/contas`, `/contas/criar`
- `/transferencias`
- `/extrato/[nmrConta]`
- `/clientes`, `/perfil`

## Autenticação
JWT salvo em `localStorage` **e** num cookie `token` (para o middleware do Next ler em SSR). Logout limpa ambos.
