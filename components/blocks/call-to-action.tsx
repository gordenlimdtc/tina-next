import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { iconSchema } from '@/tina/fields/icon';
import { Button } from '@/components/ui/button';
import { PageBlocksCta } from '@/tina/__generated__/types';
import { Icon } from '../icon';
import { Section } from '../layout/section';

export const CallToAction = ({ data }: { data: PageBlocksCta }) => {
  return (
    <Section>
      <div className="text-center">
        <h2 className="font-semibold text-4xl lg:text-5xl text-balance" data-tina-field={tinaField(data, 'title')}>
          {data.title}
        </h2>
        <p className="mt-4" data-tina-field={tinaField(data, 'description')}>
          {data.description}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {data.actions &&
            data.actions.map((action) => (
              <div key={action!.label} data-tina-field={tinaField(action)} className="bg-foreground/10 p-0.5 border rounded-[calc(var(--radius-xl)+0.125rem)]">
                <Button asChild size="lg" variant={action!.type === 'link' ? 'ghost' : 'default'} className="px-5 rounded-xl text-base">
                  <Link href={action!.link!}>
                    {action?.icon && <Icon data={action?.icon} />}
                    <span className="text-nowrap">{action!.label}</span>
                  </Link>
                </Button>
              </div>
            ))}
        </div>
      </div>
    </Section>
  );
};

export const ctaBlockSchema: Template = {
  name: 'cta',
  label: 'CTA',
  ui: {
    previewSrc: '/blocks/cta.png',
    defaultItem: {
      title: 'Start Building',
      description: 'Get started with TinaCMS today and take your content management to the next level.',
      actions: [
        {
          label: 'Get Started',
          type: 'button',
          link: '/',
        },
        {
          label: 'Book Demo',
          type: 'link',
          link: '/',
        },
      ],
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
      ui: {
        component: 'textarea',
      },
    },
    {
      label: 'Actions',
      name: 'actions',
      type: 'object',
      list: true,
      ui: {
        defaultItem: {
          label: 'Action Label',
          type: 'button',
          icon: true,
          link: '/',
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: 'Label',
          name: 'label',
          type: 'string',
        },
        {
          label: 'Type',
          name: 'type',
          type: 'string',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
          ],
        },
        iconSchema,
        {
          label: 'Link',
          name: 'link',
          type: 'string',
        },
      ],
    },
  ],
};
