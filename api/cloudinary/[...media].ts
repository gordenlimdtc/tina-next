import { createMediaHandler } from 'next-tinacms-cloudinary/dist/handlers';
import { TinaAuthJSOptions } from 'tinacms-authjs';
import databaseClient from '../../tina/__generated__/databaseClient';
import { getServerSession } from 'next-auth/next';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export default createMediaHandler({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  authorized: async (req, res) => {
    try {
      if (isLocal) {
        console.warn('Authorizing media handler in development without specific auth check.');
        return true;
      }

      const session = await getServerSession(
        req,
        res,
        TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET!,
        }),
      );

      if (session?.user) {
        // Only allow admin and editor roles to manage media
        // return ['admin', 'editor'].includes(session.user.role);
        return true;
      }

      return false;
    } catch (e) {
      console.error('Error during media handler authorization:', e);
      return false;
    }
  },
});
