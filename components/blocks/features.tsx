'use client';
import { PageBlocksFeatures, PageBlocksFeaturesItems } from '../../tina/__generated__/types';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { Icon } from '../icon';
import { iconSchema } from '../../tina/fields/icon';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';

export const Features = ({ data }: { data: PageBlocksFeatures }) => {
  return (
    <Section background={data.background!}>
      <div className="@container mx-auto px-6 max-w-5xl">
        <div className="text-center">
          <h2 data-tina-field={tinaField(data, 'title')} className="font-semibold text-4xl lg:text-5xl text-balance">
            {data.title}
          </h2>
          <p data-tina-field={tinaField(data, 'description')} className="mt-4">
            {data.description}
          </p>
        </div>
        <Card className="grid @min-4xl:grid-cols-3 shadow-zinc-950/5 mx-auto mt-8 md:mt-16 @min-4xl:divide-x divide-y @min-4xl:divide-y-0 @min-4xl:max-w-full max-w-sm overflow-hidden *:text-center">
          {data.items &&
            data.items.map(function (block, i) {
              return <Feature key={i} {...block!} />;
            })}
        </Card>
      </div>
    </Section>
  );
};

const CardDecorator = ({ children }: { children: React.ReactNode }) => (
  <div className="relative dark:group-hover:bg-white/5 mx-auto [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] size-36 duration-200">
    <div
      aria-hidden
      className="absolute inset-0 bg-[size:24px_24px] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]"
    />
    <div aria-hidden className="absolute inset-0 bg-radial from-transparent to-75% to-background" />
    <div className="absolute inset-0 flex justify-center items-center bg-background m-auto border-t border-l size-12">{children}</div>
  </div>
);

export const Feature: React.FC<PageBlocksFeaturesItems> = (data) => {
  return (
    <div className="group shadow-zinc-950/5">
      <CardHeader className="pb-3">
        <CardDecorator>{data.icon && <Icon tinaField={tinaField(data, 'icon')} data={{ size: 'large', ...data.icon }} />}</CardDecorator>

        <h3 data-tina-field={tinaField(data, 'title')} className="mt-6 font-medium">
          {data.title}
        </h3>
      </CardHeader>

      <CardContent className="pb-8 text-sm">
        <TinaMarkdown data-tina-field={tinaField(data, 'text')} content={data.text} />
      </CardContent>
    </div>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    color: '',
    style: 'float',
    name: '',
  },
};

export const featureBlockSchema: Template = {
  name: 'features',
  label: 'Features',
  ui: {
    previewSrc: '/blocks/features.png',
    defaultItem: {
      title: 'Built to cover your needs',
      description: 'We have a lot of features to cover your needs',
      items: [defaultFeature, defaultFeature, defaultFeature],
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
      label: 'Feature Items',
      name: 'items',
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
        iconSchema,
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'rich-text',
          label: 'Text',
          name: 'text',
        },
      ],
    },
  ],
};
