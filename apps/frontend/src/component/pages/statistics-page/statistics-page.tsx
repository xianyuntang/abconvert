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

  const visits = useMemo(() => {
    const primary = new Set();
    const testing = new Set();
    testingResult?.data?.primary.map((event) => {
      primary.add(event.clientId);
    });
    testingResult?.data?.testing.map((event) => {
      testing.add(event.clientId);
    });
    console.log(primary, testing);
    return { primary: primary.size, testing: testing.size };
  }, [testingResult]);

  return (
    <div className="flex justify-center h-svh p-10">
      <div className="w-1/2 mx-auto bg-yellow-50 p-6 rounded-lg shadow-md">
        <div className="text-black">
          <Select
            label="Testing"
            options={options}
            onSelect={handleTestingSelect}
          ></Select>
        </div>
        <table className="text-black w-full text-center">
          <thead>
            <tr className="border-b">
              <th className="border">12</th>
              <th className="border">primary</th>
              <th className="border">testing</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="border">Visits</td>
              <td className="border">{visits.primary}</td>
              <td className="border">{visits.testing}</td>
            </tr>
          </tbody>
        </table>
        <footer className="mt-12 text-center">
          <p className="text-gray-500 text-sm">Powered by ABConvert</p>
        </footer>
      </div>
    </div>
  );
};

export default StatisticsPage;