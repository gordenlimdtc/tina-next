import React, { PropsWithChildren } from 'react';
import { LayoutProvider } from './layout-context';
import client from '../../tina/__generated__/databaseClient';
import { Header } from './nav/header';
import { Footer } from './nav/footer';

type LayoutProps = PropsWithChildren & {
  rawPageData?: unknown;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const { data: globalData } = await client.queries.global(
    {
      relativePath: 'index.json',
    },
    {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      },
    },
  );

  return (
    <LayoutProvider globalSettings={JSON.parse(JSON.stringify(globalData.global))} pageData={JSON.parse(JSON.stringify(rawPageData))}>
      <Header />
      <main className="pt-20 overflow-x-hidden">{children}</main>
      <Footer />
    </LayoutProvider>
  );
}
