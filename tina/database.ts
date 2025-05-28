import { createDatabase, createLocalDatabase } from '@tinacms/datalayer';
import { RedisLevel } from 'upstash-redis-level';
import { GitHubProvider } from 'tinacms-gitprovider-github';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

const branch = process.env.GITHUB_BRANCH || 'main';
const repo = process.env.GITHUB_REPO;
const owner = process.env.GITHUB_OWNER;
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const redisUrl = process.env.KV_REST_API_URL;
const redisToken = process.env.KV_REST_API_TOKEN;

if (!repo || !owner || !token || !redisUrl || !redisToken) {
  throw new Error('Missing GitHub or Upstash environment variables');
}

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        repo,
        owner,
        token,
        branch,
      }),
      databaseAdapter: new RedisLevel<string, Record<string, any>>({
        redis: {
          url: redisUrl,
          token: redisToken,
        },
        debug: process.env.DEBUG === 'true' || false,
      }),
      namespace: branch,
    });
