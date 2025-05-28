'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '../../icon';
import { useLayout } from '../layout-context';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const { globalSettings } = useLayout();
  const header = globalSettings!.header!;

  const [menuState, setMenuState] = React.useState(false);
  return (
    <header>
      <nav data-state={menuState && 'active'} className="z-20 fixed bg-background/50 backdrop-blur-3xl border-b w-full">
        <div className="mx-auto px-6 max-w-6xl transition-all duration-300">
          <div className="relative flex flex-wrap justify-between items-center gap-6 lg:gap-0 py-3 lg:py-4">
            <div className="flex justify-between items-center gap-12 w-full">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <Icon
                  parentColor={header.color!}
                  data={{
                    name: header.icon!.name!,
                    color: header.icon!.color ?? undefined,
                    style: header.icon!.style ?? undefined,
                  }}
                />{' '}
                <span>{header.name}</span>
              </Link>

              <button onClick={() => setMenuState(!menuState)} aria-label={menuState == true ? 'Close Menu' : 'Open Menu'} className="lg:hidden block z-20 relative -m-2.5 -mr-4 p-2.5 cursor-pointer">
                <Menu className="in-data-[state=active]:opacity-0 m-auto size-6 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 duration-200" />
                <X className="absolute inset-0 opacity-0 in-data-[state=active]:opacity-100 m-auto size-6 -rotate-180 in-data-[state=active]:rotate-0 scale-0 in-data-[state=active]:scale-100 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {header.nav!.map((item, index) => (
                    <li key={index}>
                      <Link href={item!.href!} className="block text-muted-foreground duration-150 hover:text-accent-foreground">
                        <span>{item!.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="hidden in-data-[state=active]:block lg:flex lg:in-data-[state=active]:flex flex-wrap md:flex-nowrap justify-end items-center lg:gap-6 space-y-8 lg:space-y-0 bg-background lg:bg-transparent dark:lg:bg-transparent shadow-2xl shadow-zinc-300/20 lg:shadow-none dark:shadow-none lg:m-0 mb-6 p-6 lg:p-0 border lg:border-transparent rounded-3xl w-full lg:w-fit">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {header.nav!.map((item, index) => (
                    <li key={index}>
                      <Link href={item!.href!} className="block text-muted-foreground duration-150 hover:text-accent-foreground">
                        <span>{item!.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
