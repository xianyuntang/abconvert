import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import {
  useRecordClickButton,
  useRecordEnterPage,
  useRecordMousePosition,
  useRecordStay,
  useVersionId,
} from '../../../hooks';
import { testingService, versionService } from '../../../services';
import {
  MoisturizationIcon,
  PreventBreakageIcon,
  StrengthenIcon,
} from '../../feature-icon';

const ProductPage = () => {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [button1Ref, setButton1Ref] = useState<HTMLButtonElement | null>(null);
  const [button2Ref, setButton2Ref] = useState<HTMLButtonElement | null>(null);

  const router = useRouter();
  const { id } = router.query;

  const { versionId, saveVersionId, removeVersionId } = useVersionId(
    id as string
  );

  const { data: runningTesting, isSuccess } = useQuery({
    queryKey: ['testing-status', id],
    queryFn: async ({ queryKey: [, id] }) => {
      return testingService.getRunningTesting({ productId: id as string });
    },
    enabled: !!id,
  });

  const { data } = useQuery({
    queryKey: ['random-version', id],
    queryFn: async ({ queryKey: [, id] }) => {
      if (runningTesting?.data?.id) {
        if (versionId) {
          return versionService.gerVersion({
            productId: id as string,
            versionId,
          });
        } else {
          const version = await versionService.getRandomVersion({
            productId: id as string,
          });
          saveVersionId(version.data.id);

          return version;
        }
      } else {
        removeVersionId(id as string);
        return versionService.getPrimaryVersion({ productId: id as string });
      }
    },
    enabled: !!id && isSuccess,
  });

  const getValue = (key: string) => {
    return data?.data?.details.find((item) => item.key === key)?.value || '';
  };

  const testingId = useMemo(() => {
    return runningTesting?.data.id;
  }, [runningTesting]);

  useRecordStay(testingId, versionId);
  useRecordEnterPage(testingId, versionId);
  useRecordMousePosition(containerRef, testingId, versionId);
  useRecordClickButton(button1Ref, testingId, versionId);
  useRecordClickButton(button2Ref, testingId, versionId);

  return (
    <div className="flex h-svh justify-center p-10" ref={setContainerRef}>
      <div className="mx-auto max-w-3xl rounded-lg bg-yellow-50 p-6 shadow-md">
        <div className="flex items-center text-lg text-yellow-500">
          <span className="mr-2">★★★★★</span>
          <span className="font-bold">25,000+ Happy Customers</span>
        </div>

        <h1 id="title" className="my-4 text-4xl font-bold text-gray-800">
          {getValue('title')}
        </h1>
        <div id="price" className="mb-4 text-2xl text-gray-800">
          ${getValue('price1')}
        </div>

        <ul
          id="description"
          className="mb-8 list-inside list-disc space-y-3 text-black"
        >
          {getValue('description')
            ?.split('\n')
            .map((item) => (
              <li key={item}>{item}</li>
            ))}
        </ul>

        <div className="mb-8 grid grid-cols-3 gap-6 text-black">
          <div id="feature-1" className="text-center">
            {/* <img src="/moisturization-icon.png" alt="Powerful Moisturization" className="w-12 mx-auto mb-2" /> */}
            <div className="flex flex-col items-center">
              <MoisturizationIcon />
              <p className="text-sm">{getValue('feature1')}</p>
            </div>
          </div>
          <div id="feature-2" className="text-center">
            <div className="flex flex-col items-center">
              {/* <img src="/breakage-icon.png" alt="Prevent breakage and split ends" className="w-12 mx-auto mb-2" /> */}
              <PreventBreakageIcon />
              <p className="text-sm">{getValue('feature2')}</p>
            </div>
          </div>
          <div id="feature-2" className="text-center">
            <div className="flex flex-col items-center">
              {/* <img src="/strengthen-icon.png" alt="Strengthen & lengthen hair" className="w-12 mx-auto mb-2" /> */}
              <StrengthenIcon />
              <p className="text-sm">{getValue('feature3')}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-yellow-100 p-6">
          <div className="mb-6 flex justify-center">
            <button
              id="one-time-purchase-button"
              className="mr-4 rounded-full bg-white px-6 py-2 font-bold text-gray-800"
              ref={setButton1Ref}
            >
              One Time Purchase
            </button>
            <button
              id="subscribe-button"
              className="rounded-full bg-gray-200 px-6 py-2 font-bold text-gray-600"
              ref={setButton2Ref}
            >
              Subscribe & Save 20%
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-lg font-bold text-black">8 oz</p>
              <p className="mb-2 text-xl text-gray-800">
                ${getValue('price2')}
              </p>
              <p className="text-sm text-gray-500">
                ${(parseFloat(getValue('price2')) / 8).toFixed(2)} per oz
              </p>
              <span className="mt-2 inline-block rounded-lg bg-yellow-500 px-3 py-1 text-xs font-bold text-white">
                Save 30%
              </span>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-lg font-bold text-black">4 oz</p>
              <p className="mb-2 text-xl text-gray-800">
                ${getValue('price3')}
              </p>
              <p className="text-sm text-gray-500">
                ${(parseFloat(getValue('price3')) / 4).toFixed(2)} per oz
              </p>
            </div>
          </div>
        </div>
        <footer className="mt-12 text-center">
          <p className="text-sm text-gray-500">Powered by ABConvert</p>
        </footer>
      </div>
    </div>
  );
};

export default ProductPage;
