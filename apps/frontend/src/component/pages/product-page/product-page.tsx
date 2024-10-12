import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useRecordWait, useVersion } from '../../../hooks';
import { testingService, versionService } from '../../../services';
import {
  MoisturizationIcon,
  PreventBreakageIcon,
  StrengthenIcon,
} from '../../feature-icon';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { versionId, saveVersionId } = useVersion(id as string);

  const { data: testingStatus } = useQuery({
    queryKey: ['testing-status', id],
    queryFn: async ({ queryKey: [, id] }) => {
      return testingService.checkTestingStatus({ productId: id as string });
    },
    enabled: !!id,
  });

  const { data } = useQuery({
    queryKey: ['random-version', id],
    queryFn: async ({ queryKey: [, id] }) => {
      if (versionId) {
        return versionService.gerVersion({
          productId: id as string,
          versionId,
        });
      }
      const version = await versionService.getRandomVersion({
        productId: id as string,
      });
      saveVersionId(version.data.id);

      return version;
    },
    enabled: !!id && testingStatus?.data?.isRunning !== undefined,
  });

  const getValue = (key: string) => {
    return data?.data?.details.find((item) => item.key === key)?.value || '';
  };

  useRecordWait(versionId, !!versionId);

  return (
    <div className="flex justify-center h-svh p-10">
      <div className="max-w-3xl mx-auto bg-yellow-50 p-6 rounded-lg shadow-md">
        <div className="flex items-center text-yellow-500 text-lg">
          <span className="mr-2">★★★★★</span>
          <span className="font-bold">25,000+ Happy Customers</span>
        </div>

        <h1 id="title" className="text-4xl font-bold my-4 text-gray-800">
          {getValue('title')}
        </h1>
        <div id="price" className="text-2xl text-gray-800 mb-4">
          ${getValue('price1')}
        </div>

        <ul
          id="description"
          className="list-disc list-inside mb-8 space-y-3 text-black"
        >
          {getValue('description')
            ?.split('\n')
            .map((item) => (
              <li key={item}>{item}</li>
            ))}
        </ul>

        <div className="grid grid-cols-3 gap-6 mb-8 text-black">
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

        <div className="bg-yellow-100 p-6 rounded-lg">
          <div className="flex justify-center mb-6">
            <button className="px-6 py-2 rounded-full bg-white font-bold text-gray-800 mr-4">
              One Time Purchase
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-200 font-bold text-gray-600">
              Subscribe & Save 20%
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center bg-white p-4 rounded-lg shadow-sm">
              <p className="font-bold text-lg text-black">8 oz</p>
              <p className="text-xl text-gray-800 mb-2">
                ${getValue('price2')}
              </p>
              <p className="text-sm text-gray-500">
                ${(parseFloat(getValue('price2')) / 8).toFixed(2)} per oz
              </p>
              <span className="inline-block mt-2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
                Save 30%
              </span>
            </div>
            <div className="text-center bg-white p-4 rounded-lg shadow-sm">
              <p className="font-bold text-lg text-black">4 oz</p>
              <p className="text-xl text-gray-800 mb-2">
                ${getValue('price3')}
              </p>
              <p className="text-sm text-gray-500">
                ${(parseFloat(getValue('price3')) / 4).toFixed(2)} per oz
              </p>
            </div>
          </div>
        </div>
        <footer className="mt-12 text-center">
          <p className="text-gray-500 text-sm">Powered by ABConvert</p>
        </footer>
      </div>
    </div>
  );
};

export default ProductPage;
