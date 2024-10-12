import { useEffect } from 'react';
import { EventType } from 'shared';

import { addEvent } from '../services/event';

export const useRecordMousePosition = (versionId: string, enabled: boolean) => {
  useEffect(() => {
    if (enabled) {
      const interval = setInterval(async () => {
        await addEvent({ eventType: EventType.Move, versionId });
      }, 1000);
      return clearInterval(interval);
    }
  }, [versionId, enabled]);
};

export const useRecordWait = (versionId: string | null, enabled: boolean) => {
  useEffect(() => {
    if (versionId && enabled) {
      const interval = setInterval(async () => {
        await addEvent({ eventType: EventType.Stay, versionId });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [versionId, enabled]);
};
