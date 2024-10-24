'use client'
import React, { useState } from 'react';

interface TaskDate {
  date: Date;
  numberOfTasks: number;
}

interface TaskCalendarProps {
  taskDates: TaskDate[];
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({ taskDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const calendar = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDayOfMonth + 1;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
    const taskCount = taskDates.find(
      task => task.date.toDateString() === date.toDateString()
    )?.numberOfTasks || 0;

    return { date, tasks: taskCount };
  });

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <h2 className="text-xl font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <button
          onClick={goToNextMonth}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-black dark:text-white">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendar.map((day, index) => (
          <div
            key={index}
            className={`p-2 min-h-[80px] rounded border ${
              day.date.getMonth() === currentDate.getMonth()
                ? 'bg-white dark:bg-gray-800'
                : 'bg-gray-100 dark:bg-gray-900'
            }`}
          >
            <div className="text-sm mb-1">{day.date.getDate()}</div>
            {day.tasks > 0 && (
              <div className="text-xs px-2 py-1 bg-primary text-white rounded-full inline-block">
                {day.tasks} tasks
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCalendar;