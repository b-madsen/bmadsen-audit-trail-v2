import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface CommentsContextType {
  commentsVisible: boolean;
  toggleComments: () => void;
  openPinId: string | null;
  setOpenPinId: (id: string | null) => void;
}

const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

export function CommentsProvider({ children }: { children: ReactNode }) {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [openPinId, setOpenPinId] = useState<string | null>(null);

  const toggleComments = () => {
    setCommentsVisible(prev => {
      if (prev) setOpenPinId(null);
      return !prev;
    });
  };

  return (
    <CommentsContext.Provider value={{ commentsVisible, toggleComments, openPinId, setOpenPinId }}>
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments() {
  const context = useContext(CommentsContext);
  if (!context) throw new Error('useComments must be used within CommentsProvider');
  return context;
}
