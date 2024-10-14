import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ChangeEvent, useMemo, useState } from 'react';

import { testingService } from '../../../services';
import Select from '../../select';

const StatisticsPage = () => {
  const [selectedTesting, setSelectedTesting] = useState<string | null>(null);

  const router = useRouter();
  const { id } = router.query;

  const { data: testings } = useQuery({
    queryKey: ['testings', id],
    queryFn: async ({ queryKey: [, id] }) => {
      return testingService.getTestings({
        productId: id as string,
      });
    },
    enabled: !!id,
  });

  const { data: testingResult } = useQuery({
    queryKey: ['testing-result', id, selectedTesting],
    queryFn: async ({ queryKey: [, id, testingId] }) => {
      return testingService.getTestingResultRequest({
        productId: id as string,
        testingId: testingId as string,
      });
    },
    enabled: !!id && !!selectedTesting,
  });

  const options = useMemo(() => {
    return (
      testings?.data?.data.map((item) => {
        return {
          text: item.createdAt,
          value: item.id,
        };
      }) || []
    );
  }, [testings]);

  const handleTestingSelect = (evt: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTesting(evt.target.value);
  };
  const primary = testingResult?.data?.primary;
  const testing = testingResult?.data?.testing;
  const clickElements = testingResult?.data?.clickElements;

  return (
    <div className="flex h-svh justify-center p-10">
      <div className="mx-auto w-1/2 rounded-lg bg-yellow-50 p-6 shadow-md">
        <div className="text-black">
          <Select
            label="Testing"
            options={options}
            onSelect={handleTestingSelect}
          ></Select>
        </div>
        {primary && testing ? (
          <table className="w-full text-center text-black">
            <thead>
              <tr className="border-b">
                <th className="border text-left">Items</th>
                <th className="border">primary</th>
                <th className="border">testing</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="border text-left">Page Visits</td>
                <td className="border">{primary.visits}</td>
                <td className="border">{testing.visits}</td>
              </tr>
              <tr className="border-b">
                <td className="border text-left">Time On Page</td>
                <td className="border">{primary.averageTimeOnPage}</td>
                <td className="border">{testing.averageTimeOnPage}</td>
              </tr>
              {clickElements?.map((ele) => (
                <tr className="border-b" key={ele}>
                  <td className="border text-left">DOM {ele} clicked times</td>
                  <td className="border">{primary.clickMap?.[ele] || 0}</td>
                  <td className="border">{testing.clickMap?.[ele] || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-black">
            Loading test results or no data...
          </p>
        )}

        <footer className="mt-12 text-center">
          <p className="text-sm text-gray-500">Powered by ABConvert</p>
        </footer>
      </div>
    </div>
  );
};

export default StatisticsPage;
