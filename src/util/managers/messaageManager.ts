// messageManager.ts

import { useEffect } from 'react';

export const useMessageListener = (type: string, callback: (msg: any) => void) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const msg = event.data.pluginMessage;
      if (msg.type === type) {
        callback(msg);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [type, callback]);
};
