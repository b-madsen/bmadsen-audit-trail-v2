import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Persona = 'employee' | 'manager' | 'hr-admin';
type Package = 'core' | 'pro' | 'elite';
export type Version = 'north-star' | 'mvp';
interface ViewBarContextType {
  isVisible: boolean;
  toggleVisible: () => void;
  activePersona: Persona;
  setActivePersona: (persona: Persona) => void;
  activePackage: Package;
  setActivePackage: (pkg: Package) => void;
  activeEdgeCase: string | null;
  toggleEdgeCase: (id: string) => void;
  activeErrorState: string | null;
  toggleErrorState: (id: string) => void;
  activeVersion: Version;
  setActiveVersion: (version: Version) => void;
  showHRC: boolean;
  toggleShowHRC: () => void;
}

const ViewBarContext = createContext<ViewBarContextType | undefined>(undefined);

export function ViewBarProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activePersona, setActivePersona] = useState<Persona>('employee');
  const [activePackage, setActivePackage] = useState<Package>('core');
  const [activeEdgeCase, setActiveEdgeCase] = useState<string | null>(null);
  const [activeErrorState, setActiveErrorState] = useState<string | null>(null);
  const [activeVersion, setActiveVersion] = useState<Version>('north-star');
  const [showHRC, setShowHRC] = useState(false);
  const toggleShowHRC = () => setShowHRC(prev => !prev);

  const toggleEdgeCase = (id: string) =>
    setActiveEdgeCase(prev => prev === id ? null : id);

  const toggleErrorState = (id: string) =>
    setActiveErrorState(prev => prev === id ? null : id);

  const toggleVisible = () => setIsVisible(prev => !prev);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
        e.preventDefault();
        toggleVisible();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ViewBarContext.Provider value={{
      isVisible, toggleVisible,
      activePersona, setActivePersona,
      activePackage, setActivePackage,
      activeEdgeCase, toggleEdgeCase,
      activeErrorState, toggleErrorState,
      activeVersion, setActiveVersion,
      showHRC, toggleShowHRC,
    }}>
      {children}
    </ViewBarContext.Provider>
  );
}

export function useViewBar() {
  const context = useContext(ViewBarContext);
  if (context === undefined) {
    throw new Error('useViewBar must be used within a ViewBarProvider');
  }
  return context;
}
