import React, { createContext, useContext, useState } from 'react';
import { COLORWAYS } from '../data/colorways';
import { WaitlistModal } from '../components/waitlist/WaitlistModal';

interface WaitlistContextType {
  openWaitlist: (colorwayName?: string) => void;
  closeWaitlist: () => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColorway, setSelectedColorway] = useState(COLORWAYS[0].name);

  const openWaitlist = (colorwayName?: string) => {
    if (colorwayName) {
      setSelectedColorway(colorwayName);
    }
    setIsOpen(true);
  };

  const closeWaitlist = () => {
    setIsOpen(false);
  };

  return (
    <WaitlistContext.Provider value={{ openWaitlist, closeWaitlist }}>
      {children}
      <WaitlistModal
        isOpen={isOpen}
        onClose={closeWaitlist}
        availableColorways={COLORWAYS}
        initialColorway={selectedColorway}
      />
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
}
