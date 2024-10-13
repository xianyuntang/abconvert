import { useEffect, useState } from 'react';
import { EventType } from 'shared';

import { addEvent } from '../services/event';
import { useClientId } from './client';

export const useRecordMousePosition = (
  testingId?: string,
  versionId?: string
) => {
  const { clientId } = useClientId();

  useEffect(() => {
    if (testingId && versionId) {
      const interval = setInterval(async () => {
        await addEvent({
          clientId,
          testingId,
          versionId,
          eventType: EventType.Move,
        });
      }, 1000);
      return clearInterval(interval);
    }
  }, [clientId, testingId, versionId]);
};

export const useRecordWait = (testingId?: string, versionId?: string) => {
  const { clientId } = useClientId();

  useEffect(() => {
    if (testingId && versionId) {
      const interval = setInterval(async () => {
        await addEvent({
          eventType: EventType.Stay,
          versionId,
          testingId,
          clientId,
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [clientId, testingId, versionId]);
};

export const useRecordEnterPage = (testingId?: string, versionId?: string) => {
  const [isRecord, setIsRecord] = useState<boolean>(false);
  const { clientId } = useClientId();

  useEffect(() => {
    let shouldSendEvent = true;

    const saveEvent = async () => {
      if (testingId && versionId && !isRecord && shouldSendEvent) {
        await addEvent({
          eventType: EventType.Enter,
          versionId,
          testingId,
          clientId,
        });
        setIsRecord(true);
      }
    };

    void saveEvent();

    return () => {
      shouldSendEvent = false;
    };
  }, [versionId, clientId, testingId, isRecord]);
};
