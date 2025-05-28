import { UsernamePasswordAuthJSProvider, TinaUserCollection } from 'tinacms-authjs/dist/tinacms';
import { defineConfig, LocalAuthProvider } from 'tinacms';
import nextConfig from '../next.config';

import Post from './collection/post';
import Global from './collection/global';
import Author from './collection/author';
import Page from './collection/page';
import Tag from './collection/tag';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

const branch = process.env.GITHUB_BRANCH || 'main';

const config = defineConfig({
  branch,
  authProvider: isLocal ? new LocalAuthProvider() : new UsernamePasswordAuthJSProvider(),
  contentApiUrlOverride: '/api/tina/gql',
  media: {
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    tina: {
      publicFolder: 'public',
      mediaRoot: 'uploads',
    },
  },
  build: {
    publicFolder: 'public',
    outputFolder: 'admin',
    basePath: nextConfig.basePath?.replace(/^\//, '') || '',
  },
  schema: {
    collections: [TinaUserCollection, Page, Post, Author, Tag, Global],
  },
});

export default config;
