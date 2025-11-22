import { useCallback, useState } from 'react';

export const useModal = (initState = false) => {
  const [isOpen, setIsOpen] = useState(initState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback((onClose?: () => void) => {
    setIsOpen(false);
    if (!onClose) return;
    if (onClose) setTimeout(() => onClose(), 200);
  }, []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return { isOpen, open, close, toggle };
};
