import { useEffect } from 'react';

interface useEnterKeyProps {
  callback: (e: any) => void;
  enabled: boolean;
}

const useEnterKey = ({ callback, enabled }: useEnterKeyProps) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        e.preventDefault();
        callback(e);
      }
    };

    if (enabled) {
      document.addEventListener('keydown', listener);
      return () => {
        document.removeEventListener('keydown', listener);
      };
    }
  }, [callback, enabled]);
};

export default useEnterKey;
