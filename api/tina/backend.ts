import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer';
import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from 'tinacms-authjs';
import { VercelRequest, VercelResponse } from '@vercel/node';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

async function createTinaBackend() {
  const { default: databaseClient } = await import('../../tina/__generated__/databaseClient.js');

  return TinaNodeBackend({
    authProvider: isLocal
      ? LocalBackendAuthProvider()
      : AuthJsBackendAuthProvider({
          authOptions: TinaAuthJSOptions({
            databaseClient: databaseClient,
            secret: process.env.NEXTAUTH_SECRET!,
          }),
        }),
    databaseClient,
  });
}

async function handler(req: VercelRequest, res: VercelResponse) {
  const tinaBackend = await createTinaBackend();
  return tinaBackend(req, res);
}

export default handler;
