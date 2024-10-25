// import ECommerce from "@/components/Dashboard/E-commerce";
// import { Metadata } from "next";
// import DefaultLayout from "@/components/Layouts/DefaultLaout";
// import React from "react";

// export const metadata: Metadata = {
//   title:
//     "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
//   description: "This is Next.js Home page for NextAdmin Dashboard Kit",
// };

// export default function Home() {
//   return (
//     <>
//       <DefaultLayout>
//         <ECommerce />
//       </DefaultLayout>
//     </>
//   );
// }

import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import TaskCalendar from '@/components/Calendar/TaskCalendar';

const TaskCalendarPage: React.FC = () => {
  // Example data - replace with your actual data
  const sampleTaskDates = [
    { date: new Date(), numberOfTasks: 3 },
    { date: new Date(new Date().setDate(new Date().getDate() + 2)), numberOfTasks: 5 },
    // Add more dates as needed
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Missions Calendar" />
      <div className="mt-4">
        <TaskCalendar taskDates={sampleTaskDates} />
      </div>
    </DefaultLayout>
  );
};

export default TaskCalendarPage;
