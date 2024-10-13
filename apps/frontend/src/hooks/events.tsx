import { useCallback, useEffect, useState } from 'react';
import { EventType } from 'shared';

import { addEvent } from '../services/event';
import { useClientId } from './client';
import { useThrottle } from './utility';

export const useRecordMousePosition = (
  ref: HTMLDivElement | null,
  testingId?: string,
  versionId?: string
) => {
  const { clientId } = useClientId();

  const handleSaveEvent = useThrottle(
    useCallback(
      async (evt: MouseEvent) => {
        if (clientId && testingId && versionId) {
          await addEvent({
            clientId,
            testingId,
            versionId,
            eventType: EventType.Position,
            payload: {
              x: evt.x,
              y: evt.y,
              clientX: evt.clientX,
              clientY: evt.clientY,
            },
          });
        }
      },
      [clientId, testingId, versionId]
    ),
    1000
  );

  useEffect(() => {
    if (ref && testingId && versionId) {
      ref.addEventListener('mousemove', handleSaveEvent as () => void);
    }

    return () => {
      if (ref) {
        ref.removeEventListener('mousemove', handleSaveEvent as () => void);
      }
    };
  }, [ref, clientId, testingId, versionId, handleSaveEvent]);
};

export const useRecordStay = (testingId?: string, versionId?: string) => {
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

export const useRecordClickButton = (
  ref: HTMLButtonElement | null,
  testingId?: string,
  versionId?: string
) => {
  const { clientId } = useClientId();

  useEffect(() => {
    const handleSaveEvent = async (evt: MouseEvent) => {
      if (clientId && testingId && versionId) {
        await addEvent({
          clientId,
          testingId,
          versionId,
          eventType: EventType.Click,
          payload: {
            id: (evt.target as HTMLElement).id,
          },
        });
      }
    };
    if (ref && testingId && versionId) {
      ref.addEventListener('click', handleSaveEvent);
    }

    return () => {
      if (ref) {
        ref.removeEventListener('click', handleSaveEvent);
      }
    };
  }, [ref, clientId, testingId, versionId]);
};
