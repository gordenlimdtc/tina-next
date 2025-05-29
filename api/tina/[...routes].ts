import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer';
import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from 'tinacms-authjs';
import { VercelRequest, VercelResponse } from '@vercel/node';

import databaseClient from '../../tina/__generated__/databaseClient';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

const tinaBackend = TinaNodeBackend({
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

function handler(req: VercelRequest, res: VercelResponse) {
  return tinaBackend(req, res);
}

export default handler;
