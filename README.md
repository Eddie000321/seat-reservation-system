# Seat Reservation System (Skeleton)

A minimal scaffold designed for implementing a seat reservation system yourself. All guidance is embedded as TODO comments inside source files. Follow those comments and type the code you want.

## Structure
- `server`: Node/Express backend (TypeScript)
- `web`: React frontend (Vite + TypeScript)
- root configs: `package.json`, `tsconfig.base.json`, `.env.example`, `.gitignore`

## Getting Started
1) Copy `.env.example` to `.env` and adjust values (e.g., `PORT`, `DATABASE_URL`, `VITE_API_BASE_URL`).
2) Install dependencies with your preferred package manager (pnpm/npm/yarn). Example with pnpm workspaces: `pnpm -w i`.
3) Run dev servers from the repo root: `pnpm dev` (starts server and web together).
   - Or run individually: `pnpm --filter server dev`, `pnpm --filter web dev`.

## Where to Implement
Start by opening these files and following the inline TODOs:
- Server entry: `server/src/server.ts`
- App wiring (middlewares/routes): `server/src/app.ts`
- Router: `server/src/routes/reservations.ts`
- Controllers: `server/src/controllers/reservationController.ts`
- Service (concurrency/holds/atomicity): `server/src/services/reservationService.ts`
- Repository (start in-memory, swap to DB later): `server/src/repositories/reservationRepository.ts`
- Entities: `server/src/entities/Seat.ts`, `server/src/entities/Reservation.ts`
- Error handler: `server/src/middleware/errorHandler.ts`
- Validation helpers: `server/src/utils/validation.ts`
- Config: `server/src/config/index.ts`
- Service test ideas: `server/tests/reservationService.test.ts`

- Web entry: `web/src/main.tsx`
- App shell: `web/src/App.tsx`
- Seat map UI: `web/src/components/SeatMap.tsx`
- Reservation form: `web/src/components/ReservationForm.tsx`
- API client: `web/src/api/client.ts`
- Types: `web/src/types/index.ts`
- Vite config: `web/vite.config.ts`
- HTML entry: `web/index.html`

## Notes
- The project intentionally ships without concrete implementations. Use the TODOs as a checklist and implement only what you need.
- Suggested dependencies (add as you go):
  - Server: `express`, `cors`, `ts-node-dev`, `@types/express`
  - Web: `react`, `react-dom`, `vite`, `@vitejs/plugin-react-swc`
  - Shared/tooling: `typescript`, a validator (e.g. `zod`), and a test runner if desired.
