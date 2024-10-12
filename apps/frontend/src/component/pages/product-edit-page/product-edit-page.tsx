import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { testingService, versionService } from '../../../services';
import Button from '../../button';
import {
  MoisturizationIcon,
  PreventBreakageIcon,
  StrengthenIcon,
} from '../../feature-icon';
import TextArea from '../../text-area';
import TextField from '../../text-field';

interface VersionForm {
  title: string;
  description: string;
  price1: string;
  price2: string;
  price3: string;
  feature1: string;
  feature2: string;
  feature3: string;
}

const ProductEditorPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { watch, control, reset, handleSubmit } = useForm<VersionForm>({});

  const { data: currentVersion } = useQuery({
    queryKey: ['current-version', id],
    queryFn: ({ queryKey: [, id] }) => {
      return versionService.getPrimaryVersion({ productId: id as string });
    },

    enabled: !!id,
  });

  const { data: testingStatus, refetch } = useQuery({
    queryKey: ['testing-status', id],
    queryFn: ({ queryKey: [, id] }) => {
      return testingService.checkTestingStatus({ productId: id as string });
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (currentVersion?.data?.details) {
      const getValue = (key: string) => {
        return currentVersion.data.details.find((item) => item.key === key)
          ?.value;
      };

      reset({
        title: getValue('title') || '',
        description: getValue('description') || '',
        price1: getValue('price1') || '0',
        price2: getValue('price2') || '0',
        price3: getValue('price3') || '0',
        feature1: getValue('feature1') || '',
        feature2: getValue('feature2') || '',
        feature3: getValue('feature3') || '',
      });
    }
  }, [currentVersion, reset]);

  const price2 = watch('price2');
  const price3 = watch('price3');

  const onCreateVersion = async (form: VersionForm) => {
    await testingService.startTesting({
      productId: id as string,
      details: [
        { key: 'title', value: form.title },
        { key: 'description', value: form.description },
        { key: 'price1', value: form.price1.toString() },
        { key: 'price2', value: form.price2.toString() },
        { key: 'price3', value: form.price3.toString() },
        { key: 'feature1', value: form.feature1 },
        { key: 'feature2', value: form.feature2 },
        { key: 'feature3', value: form.feature3 },
      ],
    });
    await refetch();
  };

  const handleStopTestingClick = async () => {
    if (id) {
      await testingService.stopTesting({ productId: id as string });
      await refetch();
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-svh p-10">
      <div className="max-w-3xl mx-auto bg-yellow-50 p-6 rounded-lg shadow-md">
        <div className="flex items-center text-yellow-500 text-lg">
          <span className="mr-2">★★★★★</span>
          <span className="font-bold">25,000+ Happy Customers</span>
        </div>

        <h1 id="title" className="text-4xl font-bold my-4 text-gray-800">
          <Controller
            name="title"
            control={control}
            render={({ field }) => <TextField {...field} />}
          />
        </h1>
        <div id="price" className="text-2xl text-gray-800 mb-4">
          <Controller
            name="price1"
            control={control}
            render={({ field }) => (
              <TextField className="w-14" prefix="$" {...field} />
            )}
          />
        </div>

        <ul
          id="description"
          className="list-disc list-inside mb-8 space-y-3 text-black"
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextArea className="h-52" {...field} />}
          />
        </ul>

        <div className="grid grid-cols-3 gap-6 mb-8 text-black">
          <div id="feature-1" className="text-center">
            {/* <img src="/moisturization-icon.png" alt="Powerful Moisturization" className="w-12 mx-auto mb-2" /> */}
            <div className="flex flex-col items-center">
              <MoisturizationIcon />
              <Controller
                name="feature1"
                control={control}
                render={({ field }) => <TextField {...field} />}
              />
            </div>
          </div>
          <div id="feature-2" className="text-center">
            <div className="flex flex-col items-center">
              {/* <img src="/breakage-icon.png" alt="Prevent breakage and split ends" className="w-12 mx-auto mb-2" /> */}
              <PreventBreakageIcon />
              <Controller
                name="feature2"
                control={control}
                render={({ field }) => <TextField {...field} />}
              />
            </div>
          </div>
          <div id="feature-3" className="text-center">
            <div className="flex flex-col items-center">
              {/* <img src="/strengthen-icon.png" alt="Strengthen & lengthen hair" className="w-12 mx-auto mb-2" /> */}
              <StrengthenIcon />
              <Controller
                name="feature3"
                control={control}
                render={({ field }) => <TextField {...field} />}
              />
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
            <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-sm">
              <p className="font-bold text-lg text-black">8 oz</p>
              <Controller
                name="price2"
                control={control}
                render={({ field }) => (
                  <TextField className="w-10" prefix="$" {...field} />
                )}
              />

              <p className="text-sm text-gray-500">
                ${(parseFloat(price2) / 8).toFixed(2)} per oz
              </p>
              <span className="inline-block mt-2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
                Save 30%
              </span>
            </div>
            <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-sm">
              <p className="font-bold text-lg text-black">4 oz</p>
              <Controller
                name="price3"
                control={control}
                render={({ field }) => (
                  <TextField className="w-10" prefix="$" {...field} />
                )}
              />
              <p className="text-sm text-gray-500">
                ${(parseFloat(price3) / 4).toFixed(2)} per oz
              </p>
            </div>
          </div>
        </div>
        <footer className="mt-12 text-center">
          {testingStatus?.data?.isRunning && (
            <div className="text-red-400">A/B testing is running</div>
          )}

          <div className="flex gap-4 justify-end">
            {testingStatus?.data?.isRunning ? (
              <Button onClick={handleStopTestingClick}>STOP</Button>
            ) : (
              <Button onClick={handleSubmit(onCreateVersion)}>START</Button>
            )}
          </div>
          <p className="text-gray-500 text-sm">Powered by ABConvert</p>
        </footer>
      </div>
    </div>
  );
};

export default ProductEditorPage;
