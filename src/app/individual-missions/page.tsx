'use client';

import { useEffect, useState } from 'react';
import { IndividualMission } from '@/types/BackendModels';
import { MissionService } from '@/services/missionService';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

export default function IndividualMissionsPage() {
  const [missions, setMissions] = useState<IndividualMission[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const missionService = new MissionService();

  useEffect(() => {
    fetchMissions();
  }, [currentPage]);

  const fetchMissions = async () => {
    try {
      const response = await missionService.getPaginatedIndividualMission(currentPage, pageSize);
      setMissions(response.data);
      setTotalItems(response.total);
    } catch (error) {
      console.error('Error fetching individual missions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await missionService.deleteIndividualMission(id);
      fetchMissions(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting mission:', error);
    }
  };

  const handleConvert = async (mission: IndividualMission) => {
    try {
      await missionService.convertIndividualMissionToMission(mission);
      fetchMissions(); // Refresh the list after conversion
    } catch (error) {
      console.error('Error converting mission:', error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Individual Missions" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Type</th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Responsible</th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Contact</th>
                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">From</th>
                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">To</th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">City</th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Date</th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((mission) => (
                <tr key={mission.Id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">{mission.Type}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{mission.MissionResponsible}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{mission.MissionResponsibleNumber}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{mission.FromAddress}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{mission.ToAddress}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{mission.City}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      mission.State === 'completed' ? 'text-success bg-success' :
                      mission.State === 'pending' ? 'text-warning bg-warning' :
                      'text-danger bg-danger'
                    }`}>
                      {mission.State}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {new Date(mission.ExecuteDateTime).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => handleConvert(mission)}
                        className="hover:text-primary"
                      >
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 9C2 5.13 5.13 2 9 2L7.95 3.75" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.7 4.44995L17.6799 6.74994L21.6199 4.45996" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.6799 10.82V6.73999" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16.74 2.21L14.34 3.53996C13.8 3.83996 13.35 4.59995 13.35 5.21995V7.75999C13.35 8.37999 13.79 9.13998 14.34 9.43998L16.74 10.77C17.25 11.06 18.09 11.06 18.61 10.77L21.01 9.43998C21.55 9.13998 22 8.37999 22 7.75999V5.21995C22 4.59995 21.56 3.83996 21.01 3.53996L18.61 2.21C18.1 1.93 17.26 1.93 16.74 2.21Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2.34998 15.45L6.31998 17.7499L10.27 15.46" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.31995 21.82V17.74" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5.39 13.21L2.99001 14.54C2.45001 14.84 2 15.5999 2 16.2199V18.76C2 19.38 2.44001 20.14 2.99001 20.44L5.39 21.77C5.9 22.06 6.73999 22.06 7.25999 21.77L9.66 20.44C10.2 20.14 10.65 19.38 10.65 18.76V16.2199C10.65 15.5999 10.21 14.84 9.66 14.54L7.25999 13.21C6.73999 12.93 5.9 12.93 5.39 13.21Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                      </button>
                      <button
                        onClick={() => handleDelete(mission.Id)}
                        className="hover:text-primary"
                      >
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
}
