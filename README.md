# HardDex

Documentação dividida por **perfis de responsabilidade** da arquitetura em camadas.

---

## Sumário

### API (`api/`)

| Perfil | Camada | Documentação |
|--------|--------|--------------|
| **Perfil 1** — BD / ORM | Models + Infra | [📄 Infra README](api/infra/README.md) · [📄 MODELS.md](api/infra/database/models/MODELS.md) |
| **Perfil 2** — Persistência & Negócio | DAO | [📄 DAO.md](api/src/dao/DAO.md) |
| | Services | [📄 SERVICES.md](api/src/services/SERVICES.md) |
| **Perfil 3** — HTTP & Roteamento | Controllers | [📄 CONTROLLERS.md](api/src/controllers/CONTROLLERS.md) |
| | Routes | [📄 ROUTES.md](api/src/routes/ROUTES.md) |

### Web (`web/`)

| Perfil | Camada | Status |
|--------|--------|--------|
| **Perfil 4** — UI Estática | Modules & Components | 🚧 Em construção |
| **Perfil 5** — Integração | Consumo da API & Hooks | 🚧 Em construção |

---

## Perfil 1 — BD / ORM

> Definição das tabelas, tipos e conexão com o PostgreSQL via Drizzle ORM.

- [api/infra/README.md](api/infra/README.md) — Estrutura completa da infra (Docker, conexão, Firebase).
- [api/infra/database/models/MODELS.md](api/infra/database/models/MODELS.md) — Explicação da camada de Models e seus tipos.

---

## Perfil 2 — Persistência & Regras de Negócio

> DAO isola as queries; Services implementam as regras de negócio.

- [api/src/dao/DAO.md](api/src/dao/DAO.md) — Data Access Object: CRUD com Drizzle, interfaces e injeção de dependência.
- [api/src/services/SERVICES.md](api/src/services/SERVICES.md) — Validações, transações e integração com serviços externos.

---

## Perfil 3 — Controllers & Routes

> Controllers traduzem HTTP ↔ Services; Routes expõem os endpoints.

- [api/src/controllers/CONTROLLERS.md](api/src/controllers/CONTROLLERS.md) — Extração de params, validação com Zod, respostas padronizadas.
- [api/src/routes/ROUTES.md](api/src/routes/ROUTES.md) — Definição de paths, verbos HTTP e schemas de validação (Fastify + Zod).

---

## Perfil 4 — UI Estática

> 🚧 **Em construção** — Modules e Components estáticos do frontend.

---

## Perfil 5 — Integração com API

> 🚧 **Em construção** — Consumo da API, hooks customizados e gerenciamento de estado.
