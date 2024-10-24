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
      <Breadcrumb pageName="Task Calendar" />
      <div className="mt-4">
        <TaskCalendar taskDates={sampleTaskDates} />
      </div>
    </DefaultLayout>
  );
};

export default TaskCalendarPage;
