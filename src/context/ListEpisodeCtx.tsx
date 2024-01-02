'use client';
import React, { createContext, useState } from 'react';

interface Link {
  id: string;
  title: string;
  release: string;
}

interface ListEpisodeContextType {
  lists: Link[];
  setLists: React.Dispatch<React.SetStateAction<Link[]>>;
}

export const ListEpisodeContext = createContext<ListEpisodeContextType>(null!);

export const ListEpisodeProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState<Link[]>([]);
  const contextValue: ListEpisodeContextType = {
    lists,
    setLists,
  };
  return <ListEpisodeContext.Provider value={contextValue}>{children}</ListEpisodeContext.Provider>;
};
