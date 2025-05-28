'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { HTMLAttributes, useEffect, useState } from 'react';
import type { Template } from 'tinacms';

interface ScriptCopyBtnProps extends HTMLAttributes<HTMLDivElement> {
  showMultiplePackageOptions?: boolean;
  codeLanguage: string;
  lightTheme: string;
  darkTheme: string;
  commandMap: string;
  className?: string;
}

export function ScriptCopyBtn({ showMultiplePackageOptions = true, codeLanguage, lightTheme, darkTheme, commandMap, className }: ScriptCopyBtnProps) {
  const commands = commandMap.split('\n').map((line) => line.trim()) || [];
  const packageManagers = commands.map((line) => line.split('|')[0]);
  const [packageManager, setPackageManager] = useState(packageManagers[0]);
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');
  const { theme } = useTheme();
  const command = commands.find((line) => line.startsWith(packageManager))?.split('|')[1] || '';

  useEffect(() => {
    async function loadHighlightedCode() {
      try {
        const { codeToHtml } = await import('shiki');
        const highlighted = await codeToHtml(command, {
          lang: codeLanguage,
          themes: {
            light: lightTheme,
            dark: darkTheme,
          },
          defaultColor: theme === 'dark' ? 'dark' : 'light',
        });
        setHighlightedCode(highlighted);
      } catch (error) {
        console.error('Error highlighting code:', error);
        setHighlightedCode(`<pre>${command}</pre>`);
      }
    }

    loadHighlightedCode();
  }, [command, theme, codeLanguage, lightTheme, darkTheme]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('flex w-full no-prose', className)}>
      <div className="w-full">
        <div className="flex justify-between items-center">
          {showMultiplePackageOptions && (
            <div className="relative">
              <div className="inline-flex border border-border rounded-md overflow-hidden text-xs">
                {packageManagers.map((pm, index) => (
                  <div key={pm} className="flex items-center">
                    {index > 0 && <div className="bg-border w-px h-4" aria-hidden="true" />}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`relative rounded-none bg-background px-2 py-1 hover:bg-background ${packageManager === pm ? 'text-primary' : 'text-muted-foreground'}`}
                      onClick={() => setPackageManager(pm)}
                    >
                      {pm}
                      {packageManager === pm && (
                        <motion.div
                          className="bottom-[1px] absolute inset-x-0 bg-primary mx-auto w-[90%] h-0.5"
                          layoutId="activeTab"
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="relative flex items-center">
          <div className="min-w-[300px] font-mono grow not-prose">
            {highlightedCode ? (
              <div
                className={`[&>pre]:overflow-x-auto [&>pre]:rounded-md [&>pre]:p-2 [&>pre]:px-4 [&>pre]:font-mono ${theme === 'dark' ? 'dark' : 'light'}`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            ) : (
              <pre className="bg-white dark:bg-black p-2 px-4 border border-border rounded-md font-mono">{command}</pre>
            )}
          </div>
          <Button variant="outline" size="icon" className="relative ml-2 rounded-md" onClick={copyToClipboard} aria-label={copied ? 'Copied' : 'Copy to clipboard'}>
            <span className="sr-only">{copied ? 'Copied' : 'Copy'}</span>
            <Copy className={`h-4 w-4 transition-all duration-300 ${copied ? 'scale-0' : 'scale-100'}`} />
            <Check className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${copied ? 'scale-100' : 'scale-0'}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export const scriptCopyBlockSchema: Template = {
  name: 'scriptCopyBlock',
  label: 'Script Copy Block',
  ui: {
    defaultItem: {
      codeLanguage: 'bash',
      lightTheme: 'catppuccin-latte',
      darkTheme: 'catppuccin-mocha',
      commandMap: 'npm|npm install\n' + 'pnpm|pnpm install\n' + 'yarn|yarn install\n' + 'bun|bun install',
    },
  },
  fields: [
    {
      name: 'codeLanguage',
      label: 'Code Language',
      type: 'string',
      description: 'The language used for syntax highlighting.',
    },
    {
      name: 'lightTheme',
      label: 'Light Theme',
      type: 'string',
      description: 'The light theme used for syntax highlighting.',
    },
    {
      name: 'darkTheme',
      label: 'Dark Theme',
      type: 'string',
      description: 'The dark theme used for syntax highlighting.',
    },
    {
      name: 'commandMap',
      label: 'Command Map',
      type: 'string',
      description: 'A list of package managers and their corresponding commands, separated by "|". Example:\n"npm|npm install\npnpm|pnpm install"',
      ui: {
        component: 'textarea',
      },
    },
  ],
};
