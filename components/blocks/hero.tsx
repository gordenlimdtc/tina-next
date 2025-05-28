'use client';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksHero, PageBlocksHeroImage } from '../../tina/__generated__/types';
import { Button } from '../ui/button';
import { iconSchema } from '@/tina/fields/icon';
import { Icon } from '../icon';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { AnimatedGroup } from '../motion-primitives/animated-group';
import { TextEffect } from '../motion-primitives/text-effect';
import HeroVideoDialog from '../ui/hero-video-dialog';

const transitionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
      },
    },
  },
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

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  // Extract the background style logic into a more readable format
  let gradientStyle: React.CSSProperties | undefined = undefined;
  if (data.background) {
    const colorName = data.background
      .replace(/\/\d{1,2}$/, '')
      .split('-')
      .slice(1)
      .join('-');
    const opacity = data.background.match(/\/(\d{1,3})$/)?.[1] || '100';

    gradientStyle = {
      '--tw-gradient-to': `color-mix(in oklab, var(--color-${colorName}) ${opacity}%, transparent)`,
    } as React.CSSProperties;
  }

  return (
    <Section background={data.background!}>
      <div className="sm:mx-auto lg:mt-0 lg:mr-auto text-center">
        {data.headline && (
          <div data-tina-field={tinaField(data, 'headline')}>
            <TextEffect preset="fade-in-blur" speedSegment={0.3} as="h1" className="mt-8 xl:text-[5.25rem] text-6xl md:text-7xl text-balance">
              {data.headline!}
            </TextEffect>
          </div>
        )}
        {data.tagline && (
          <div data-tina-field={tinaField(data, 'tagline')}>
            <TextEffect per="line" preset="fade-in-blur" speedSegment={0.3} delay={0.5} as="p" className="mx-auto mt-8 max-w-2xl text-lg text-balance">
              {data.tagline!}
            </TextEffect>
          </div>
        )}

        <AnimatedGroup variants={transitionVariants} className="flex md:flex-row flex-col justify-center items-center gap-2 mt-12">
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
        </AnimatedGroup>
      </div>

      {data.image && (
        <AnimatedGroup variants={transitionVariants}>
          <div className="relative mt-8 sm:mt-12 md:mt-20 -mr-56 sm:mr-0 px-2 max-w-full overflow-hidden" data-tina-field={tinaField(data, 'image')}>
            <div aria-hidden className="z-10 absolute inset-0 bg-linear-to-b from-35% from-transparent pointer-events-none" style={gradientStyle} />
            <div className="relative inset-shadow-2xs dark:inset-shadow-white/20 bg-background shadow-lg shadow-zinc-950/15 mx-auto p-4 border rounded-2xl ring-1 ring-background max-w-6xl overflow-hidden">
              <ImageBlock image={data.image} />
            </div>
          </div>
        </AnimatedGroup>
      )}
    </Section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksHeroImage }) => {
  if (image.videoUrl) {
    let videoId = '';
    if (image.videoUrl) {
      const embedPrefix = '/embed/';
      const idx = image.videoUrl.indexOf(embedPrefix);
      if (idx !== -1) {
        videoId = image.videoUrl.substring(idx + embedPrefix.length).split('?')[0];
      }
    }
    const thumbnailSrc = image.src ? image.src! : videoId ? `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg` : '';

    return <HeroVideoDialog videoSrc={image.videoUrl} thumbnailSrc={thumbnailSrc} thumbnailAlt="Hero Video" />;
  }

  if (image.src) {
    return <Image className="z-2 relative border border-border/25 rounded-2xl max-w-full h-auto aspect-15/8" alt={image!.alt || ''} src={image!.src!} height={4000} width={3000} />;
  }
};

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: 'This Big Text is Totally Awesome',
      text: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
    },
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: 'string',
      label: 'Headline',
      name: 'headline',
    },
    {
      type: 'string',
      label: 'Tagline',
      name: 'tagline',
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
    {
      type: 'object',
      label: 'Image',
      name: 'image',
      fields: [
        {
          name: 'src',
          label: 'Image Source',
          type: 'image',
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'string',
        },
        {
          name: 'videoUrl',
          label: 'Video URL',
          type: 'string',
          description: 'If using a YouTube video, make sure to use the embed version of the video URL',
        },
      ],
    },
  ],
};
