import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
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

const ProductTestingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { watch, control, reset, handleSubmit } = useForm<VersionForm>({});

  const { data: runningTesting, refetch } = useQuery({
    queryKey: ['testing-status', id],
    queryFn: ({ queryKey: [, id] }) => {
      return testingService.getRunningTesting({ productId: id as string });
    },
    enabled: !!id,
  });

  const { data: currentVersion } = useQuery({
    queryKey: ['current-version', id, runningTesting],
    queryFn: ({ queryKey: [, id] }) => {
      if (runningTesting?.data.testingId) {
        return versionService.gerVersion({
          productId: id as string,
          versionId: runningTesting.data.testingId,
        });
      } else {
        return versionService.getPrimaryVersion({ productId: id as string });
      }
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

  const isTestingRunning = useMemo(() => {
    return !!runningTesting?.data?.id;
  }, [runningTesting]);

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

  const gotoStatisticsPage = async () => {
    await router.push(`/products/${id}}/statistics`);
  };

  const gotoProductPage = async () => {
    await router.push(`/products/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="mx-auto max-w-3xl rounded-lg bg-yellow-50 p-6 shadow-md">
        <div className="flex items-center text-lg text-yellow-500">
          <span className="mr-2">★★★★★</span>
          <span className="font-bold">25,000+ Happy Customers</span>
        </div>

        <h1 id="title" className="text-4xl font-bold text-gray-800">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField {...field} disabled={isTestingRunning} />
            )}
          />
        </h1>
        <div id="price" className="mb-4 text-2xl text-gray-800">
          <Controller
            name="price1"
            control={control}
            render={({ field }) => (
              <TextField
                className="w-14"
                prefix="$"
                {...field}
                disabled={isTestingRunning}
              />
            )}
          />
        </div>

        <ul
          id="description"
          className="mb-8 list-inside list-disc space-y-3 text-black"
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                className="h-52"
                {...field}
                disabled={isTestingRunning}
              />
            )}
          />
        </ul>

        <div className="mb-8 grid grid-cols-3 gap-6 text-black">
          <div id="feature-1" className="text-center">
            {/* <img src="/moisturization-icon.png" alt="Powerful Moisturization" className="w-12 mx-auto mb-2" /> */}
            <div className="flex flex-col items-center">
              <MoisturizationIcon />
              <Controller
                name="feature1"
                control={control}
                render={({ field }) => (
                  <TextField {...field} disabled={isTestingRunning} />
                )}
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
                render={({ field }) => (
                  <TextField {...field} disabled={isTestingRunning} />
                )}
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
                render={({ field }) => (
                  <TextField {...field} disabled={isTestingRunning} />
                )}
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-yellow-100 p-6">
          <div className="mb-6 flex justify-center">
            <button className="mr-4 rounded-full bg-white px-6 py-2 font-bold text-gray-800">
              One Time Purchase
            </button>
            <button className="rounded-full bg-gray-200 px-6 py-2 font-bold text-gray-600">
              Subscribe & Save 20%
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-lg font-bold text-black">8 oz</p>
              <Controller
                name="price2"
                control={control}
                render={({ field }) => (
                  <TextField
                    className="w-10"
                    prefix="$"
                    {...field}
                    disabled={isTestingRunning}
                  />
                )}
              />

              <p className="text-sm text-gray-500">
                ${(parseFloat(price2) / 8).toFixed(2)} per oz
              </p>
              <span className="mt-2 inline-block rounded-lg bg-yellow-500 px-3 py-1 text-xs font-bold text-white">
                Save 30%
              </span>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-lg font-bold text-black">4 oz</p>
              <Controller
                name="price3"
                control={control}
                render={({ field }) => (
                  <TextField
                    className="w-10"
                    prefix="$"
                    {...field}
                    disabled={isTestingRunning}
                  />
                )}
              />
              <p className="text-sm text-gray-500">
                ${(parseFloat(price3) / 4).toFixed(2)} per oz
              </p>
            </div>
          </div>
        </div>
        <footer className="mt-12 text-center">
          <div className="flex justify-end gap-4">
            {isTestingRunning ? (
              <Button onClick={handleStopTestingClick}>STOP</Button>
            ) : (
              <Button onClick={handleSubmit(onCreateVersion)}>START</Button>
            )}
            <Button onClick={gotoProductPage}>PRODUCT</Button>
            <Button onClick={gotoStatisticsPage}>STATISTICS</Button>
          </div>
          <p className="text-sm text-gray-500">Powered by ABConvert</p>
        </footer>
      </div>
    </div>
  );
};

export default ProductTestingPage;
