import React from 'react';
import client from '@/tina/__generated__/databaseClient';
import Layout from '@/components/layout/layout';
import ClientPage from './[...urlSegments]/client-page';

export default async function Home() {
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <ClientPage {...JSON.parse(JSON.stringify(data))} />
    </Layout>
  );
}
