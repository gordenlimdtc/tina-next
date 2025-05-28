import { format } from 'date-fns';
import React from 'react';
import { Components, TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import Image from 'next/image';
import { Prism } from 'tinacms/dist/rich-text/prism';
import { Video } from './blocks/video';
import { PageBlocksVideo } from '@/tina/__generated__/types';
import { mermaid } from './blocks/mermaid';

export const components: Components<{
  BlockQuote: {
    children: TinaMarkdownContent;
    authorName: string;
  };
  DateTime: {
    format?: string;
  };
  NewsletterSignup: {
    placeholder: string;
    buttonText: string;
    children: TinaMarkdownContent;
    disclaimer?: TinaMarkdownContent;
  };
  video: PageBlocksVideo;
}> = {
  code_block: (props) => {
    if (!props) {
      return <></>;
    }
    return <Prism lang={props.lang} value={props.value} />;
  },
  BlockQuote: (props: { children: TinaMarkdownContent; authorName: string }) => {
    return (
      <div>
        <blockquote>
          <TinaMarkdown content={props.children} />
          {props.authorName}
        </blockquote>
      </div>
    );
  },
  DateTime: (props) => {
    const dt = React.useMemo(() => {
      return new Date();
    }, []);

    switch (props.format) {
      case 'iso':
        return <span>{format(dt, 'yyyy-MM-dd')}</span>;
      case 'utc':
        return <span>{format(dt, 'eee, dd MMM yyyy HH:mm:ss OOOO')}</span>;
      case 'local':
        return <span>{format(dt, 'P')}</span>;
      default:
        return <span>{format(dt, 'P')}</span>;
    }
  },
  NewsletterSignup: (props) => {
    return (
      <div className="bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          <div className="">
            <TinaMarkdown content={props.children} />
          </div>
          <div className="mt-8">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="shadow-xs px-5 py-3 border border-gray-300 focus:border-teal-500 rounded-md focus:ring-1 focus:ring-teal-500 w-full sm:max-w-xs placeholder-gray-400"
                placeholder={props.placeholder}
              />
              <div className="shadow-sm mt-3 sm:mt-0 sm:ml-3 rounded-md sm:shrink-0">
                <button
                  type="submit"
                  className="flex justify-center items-center bg-teal-600 hover:bg-teal-700 px-5 py-3 border border-transparent rounded-md focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 w-full font-medium text-white text-base"
                >
                  {props.buttonText}
                </button>
              </div>
            </form>
            <div className="mt-3 text-gray-500 text-sm">{props.disclaimer && <TinaMarkdown content={props.disclaimer} />}</div>
          </div>
        </div>
      </div>
    );
  },
  img: (props) => {
    if (!props) {
      return <></>;
    }
    return (
      <span className="flex justify-center items-center">
        <Image src={props.url} alt={props.alt || ''} width={500} height={500} />
      </span>
    );
  },
  mermaid,
  video: (props) => {
    return <Video data={props} />;
  },
};
