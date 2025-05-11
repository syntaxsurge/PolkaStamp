# PolkaStamp

AI‑assisted, verifiable‑credential hiring on Polkadot.

## Setup

### Environment

Create a `.env` file (or copy `.env.example`) and add the required keys:

- `POSTGRES_URL` – Postgres connection string for the Drizzle ORM.
- `BASE_URL` – Public URL where the app will be served.
- `AUTH_SECRET` – 32‑byte secret used to sign session tokens.
- `OPENAI_API_KEY` – OpenAI key for AI features.

**Apillon Storage**

- `APILLON_API_KEY` – generate under **Project → API Keys** in the Apillon dashboard.
- `APILLON_API_SECRET` – shown once when you create the API key; keep it secure.
- `APILLON_BUCKET_UUID` – visible in **Storage → Buckets**; copy the bucket’s UUID.

### Sync Ink ABIs

```bash
pnpm papi ink add ./blockchain/contracts/did_registry/target/ink/did_registry.json
pnpm papi ink add ./blockchain/contracts/credential_nft/target/ink/credential_nft.json
pnpm papi ink add ./blockchain/contracts/subscription_manager/target/ink/subscription_manager.json
```

Run the usual Next.js commands to develop:

```bash
pnpm install
pnpm dev
```
