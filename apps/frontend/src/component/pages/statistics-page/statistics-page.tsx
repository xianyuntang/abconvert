import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ChangeEvent, useMemo, useState } from 'react';
import { EventType } from 'shared';

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

  const primaryStatistics = useMemo(() => {
    const visits = new Set();
    let timeOnPage = 0;

    testingResult?.data?.primary.map((event) => {
      if (event.eventType === EventType.Enter) {
        visits.add(event.clientId);
      }
      if (event.eventType === EventType.Stay) {
        timeOnPage += 1;
      }
    });
    return { visits: visits.size, averageTimeOnPage: timeOnPage / visits.size };
  }, [testingResult]);

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
        <table className="w-full text-center text-black">
          <thead>
            <tr className="border-b">
              <th className="border">12</th>
              <th className="border">primary</th>
              <th className="border">testing</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="border">Page Visits</td>
              <td className="border">{primaryStatistics.visits}</td>
              {/*<td className="border">{primaryStatistics.primaryVisits}</td>*/}
            </tr>
            <tr className="border-b">
              <td className="border">Time On Page</td>
              <td className="border">{primaryStatistics.averageTimeOnPage}</td>
              {/*<td className="border">{primaryStatistics.timeOnPage}</td>*/}
            </tr>
          </tbody>
        </table>
        <footer className="mt-12 text-center">
          <p className="text-sm text-gray-500">Powered by ABConvert</p>
        </footer>
      </div>
    </div>
  );
};

export default StatisticsPage;
