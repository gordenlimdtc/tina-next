'use client';
import React, { useState, useContext } from 'react';
import { GlobalQuery } from '../../tina/__generated__/types';

interface LayoutState {
  globalSettings: GlobalQuery['global'];
  setGlobalSettings: React.Dispatch<React.SetStateAction<GlobalQuery['global']>>;
  pageData: Record<string, unknown>;
  setPageData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  theme: GlobalQuery['global']['theme'];
}

const LayoutContext = React.createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  return (
    context || {
      theme: {
        color: 'blue',
        darkMode: 'default',
      },
      globalSettings: undefined,
      pageData: undefined,
    }
  );
};

interface LayoutProviderProps {
  children: React.ReactNode;
  globalSettings: GlobalQuery['global'];
  pageData: Record<string, unknown>;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children, globalSettings: initialGlobalSettings, pageData: initialPageData }) => {
  const [globalSettings, setGlobalSettings] = useState<GlobalQuery['global']>(initialGlobalSettings);
  const [pageData, setPageData] = useState<Record<string, unknown>>(initialPageData);

  const theme = globalSettings.theme;

  return (
    <LayoutContext.Provider
      value={{
        globalSettings,
        setGlobalSettings,
        pageData,
        setPageData,
        theme,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
