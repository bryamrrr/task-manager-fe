import { useEffect } from 'react';

interface useEnterKeyProps {
  callback: (e: any) => void;
  enabled: boolean;
}

const useEnterKey = ({ callback, enabled }: useEnterKeyProps) => {
  const listener = (e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault();
      callback(e);
    }
  };

  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', listener);
      return () => {
        document.removeEventListener('keydown', listener);
      };
    }
  }, [enabled]);
};

export default useEnterKey;
