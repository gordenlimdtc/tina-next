import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksStats } from '@/tina/__generated__/types';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';

export const Stats = ({ data }: { data: PageBlocksStats }) => {
  return (
    <Section background={data.background!}>
      <div className="space-y-8 md:space-y-16 mx-auto px-6 max-w-5xl">
        <div className="z-10 relative space-y-6 mx-auto max-w-xl text-center">
          <h2 className="font-medium text-4xl lg:text-5xl" data-tina-field={tinaField(data, 'title')}>
            {data.title}
          </h2>
          <p data-tina-field={tinaField(data, 'description')}>{data.description}</p>
        </div>

        <div className="grid md:grid-cols-3 md:divide-x divide-y md:divide-y-0 *:text-center">
          {data.stats?.map((stat) => (
            <div key={stat?.type} className="space-y-4 py-4">
              <div className="font-bold text-5xl" data-tina-field={tinaField(stat, 'stat')}>
                {stat!.stat}
              </div>
              <p data-tina-field={tinaField(stat, 'type')}>{stat!.type}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export const statsBlockSchema: Template = {
  name: 'stats',
  label: 'Stats',
  ui: {
    previewSrc: '/blocks/stats.png',
    defaultItem: {
      title: 'TinaCMS by the numbers',
      description:
        'TinaCMS is an open-source content management system that allows developers to create and manage content for their websites and applications. It provides a flexible and customizable framework for building content-driven applications.',
      stats: [
        {
          stat: '12K',
          type: 'Stars on GitHub',
        },
        {
          stat: '11K',
          type: 'Active Users',
        },
        {
          stat: '22K',
          type: 'Powered Apps',
        },
      ],
    },
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
    },
    {
      type: 'object',
      label: 'Stats',
      name: 'stats',
      list: true,
      ui: {
        defaultItem: {
          stat: '12K',
          type: 'Stars on GitHub',
        },
        itemProps: (item) => {
          return {
            label: `${item.stat} ${item.type}`,
          };
        },
      },
      fields: [
        {
          type: 'string',
          label: 'Stat',
          name: 'stat',
        },
        {
          type: 'string',
          label: 'Type',
          name: 'type',
        },
      ],
    },
  ],
};
