import React from 'react';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksCallout } from '@/tina/__generated__/types';
import { ArrowRight } from 'lucide-react';
import { AnimatedGroup } from '../motion-primitives/animated-group';
import { Section, sectionBlockSchemaField } from '../layout/section';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export const Callout = ({ data }: { data: PageBlocksCallout }) => {
  return (
    <Section background={data.background!} className="py-6">
      <AnimatedGroup variants={transitionVariants}>
        <Link
          data-tina-field={tinaField(data, 'url')}
          href={data.url!}
          className="group flex items-center gap-4 bg-muted hover:bg-background shadow-md shadow-zinc-950/5 dark:shadow-zinc-950 mx-auto p-1 pl-4 border dark:border-t-white/5 dark:hover:border-t-border rounded-full w-fit transition-colors duration-300"
        >
          <span data-tina-field={tinaField(data, 'text')} className="text-foreground text-sm">
            {data.text}
          </span>
          <span className="block bg-white dark:bg-zinc-700 dark:border-background border-l w-0.5 h-4"></span>

          <div className="bg-background group-hover:bg-muted rounded-full size-6 overflow-hidden duration-500">
            <div className="flex w-12 -translate-x-1/2 group-hover:translate-x-0 duration-500 ease-in-out">
              <span className="flex size-6">
                <ArrowRight className="m-auto size-3" />
              </span>
              <span className="flex size-6">
                <ArrowRight className="m-auto size-3" />
              </span>
            </div>
          </div>
        </Link>
      </AnimatedGroup>
    </Section>
  );
};

export const calloutBlockSchema: Template = {
  name: 'callout',
  label: 'Callout',
  ui: {
    previewSrc: '/blocks/callout.png',
    defaultItem: {
      url: 'https://tina.io/editorial-workflow',
      text: 'Support for live editing and editorial workflow',
    },
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: 'string',
      label: 'Text',
      name: 'text',
    },
    {
      type: 'string',
      label: 'Url',
      name: 'url',
    },
  ],
};
