/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { type ClassSession, type Theme, type SortOption } from './types';
import ClassCard from './components/ClassCard';

const scheduleData: ClassSession[] = [
  { id: 'am4201-mon', course: 'AM-4201', title: 'Apparel Manufacturing Management', teacher: 'SH_Sayed Hasan Mahmud', contact: '01521494018, shmahmud@niter.edu.bd', day: 'Mon', room: '104', startTime: '10:30 AM', endTime: '11:45 AM', section: 'Apparel', color: '#3b82f6' },
  { id: 'am4201-tue', course: 'AM-4201', title: 'Apparel Manufacturing Management', teacher: 'SH_Sayed Hasan Mahmud', contact: '01521494018, shmahmud@niter.edu.bd', day: 'Tue', room: '119', startTime: '8:00 AM', endTime: '9:15 AM', section: 'Apparel', color: '#3b82f6' },
  { id: 'am4202-sun', course: 'AM-4202', title: 'Apparel Manufacturing Management Lab', teacher: 'SH_Sayed Hasan Mahmud', contact: '01521494018, shmahmud@niter.edu.bd', day: 'Sun', room: 'AC-129', startTime: '10:30 AM', endTime: '1:00 PM', section: 'Apparel', color: '#10b981' },
  { id: 'am4203-sun', course: 'AM-4203', title: 'Fashion & Design', teacher: 'ROY_Mowshumi Roy', contact: '01719854378, mroy@niter.edu.bd', day: 'Sun', room: '206', startTime: '9:15 AM', endTime: '10:30 AM', section: 'Apparel', color: '#ef4444' },
  { id: 'am4203-wed', course: 'AM-4203', title: 'Fashion & Design', teacher: 'ROY_Mowshumi Roy', contact: '01719854378, mroy@niter.edu.bd', day: 'Wed', room: '101', startTime: '9:15 AM', endTime: '10:30 AM', section: 'Apparel', color: '#ef4444' },
  { id: 'te4204-wed', course: 'TE-4204', title: 'Environmental Engineering and Pollution Control', teacher: 'TR_Tanzeena Refat Tumpa', contact: '01834333335, trtumpa@niter.edu.bd', day: 'Wed', room: '206', startTime: '1:30 PM', endTime: '2:45 PM', section: 'C', color: '#8b5cf6' },
  { id: 'te4204-mon', course: 'TE-4204', title: 'Environmental Engineering and Pollution Control', teacher: 'FUA_Md. Fuad Ahmed', contact: '01619125001, mfahmed@niter.edu.bd', day: 'Mon', room: '121', startTime: '9:15 AM', endTime: '10:30 AM', section: 'C', color: '#8b5cf6' },
  { id: 'te4205-sun', course: 'TE-4205', title: 'Cost and Management Accounting', teacher: 'SHS_Sharmin Sultana', contact: '01741152323, ssultana@niter.edu.bd', day: 'Sun', room: '121', startTime: '1:30 PM', endTime: '2:45 PM', section: 'C', color: '#f97316' },
  { id: 'te4205-mon', course: 'TE-4205', title: 'Cost and Management Accounting', teacher: 'MNA_Md. Nur Alam', contact: '01626433982, mdnuralam.cu1045@gmail.com', day: 'Mon', room: '104', startTime: '1:30 PM', endTime: '2:45 PM', section: 'C', color: '#f97316' },
  { id: 'te4206-tue', course: 'TE-4206', title: 'Technical Textiles and Nanotechnology', teacher: 'EH_Emdadul Haq', contact: '+8801688017977, emdadul@niter.edu.bd', day: 'Tue', room: '130', startTime: '11:00 AM', endTime: '12:15 PM', section: 'C', color: '#14b8a6' },
  { id: 'te4206-wed', course: 'TE-4206', title: 'Technical Textiles and Nanotechnology', teacher: 'EH_Emdadul Haq', contact: '+8801688017977, emdadul@niter.edu.bd', day: 'Wed', room: 'AC-YS-203', startTime: '8:00 AM', endTime: '9:15 AM', section: 'C', color: '#14b8a6' },
  { id: 'te4207', course: 'TE-4207', title: 'Project Work', teacher: '-', contact: '', day: null, room: '', startTime: '', endTime: '', section: 'C', color: '#64748b' },
  { id: 'te4208', course: 'TE-4208', title: 'Comprehensive Viva', teacher: '-', contact: '', day: null, room: '', startTime: '', endTime: '', section: 'C', color: '#64748b' },
  { id: 'te4209', course: 'TE-4209', title: 'Internship', teacher: '-', contact: '', day: null, room: '', startTime: '', endTime: '', section: 'C', color: '#64748b' },
];

const DayColumn: React.FC<{ day: string, sessions: ClassSession[] }> = ({ day, sessions }) => (
  <div className="flex flex-col gap-4 p-4 border rounded-xl bg-[var(--card-bg)] border-[var(--border-color)] backdrop-blur-sm">
    <h2 className="text-2xl font-bold text-center text-[var(--text-primary)] tracking-wide">{day}</h2>
    <div className="flex flex-col gap-4">
      {sessions.length > 0 ? (
        sessions.map(session => <ClassCard key={session.id} session={session} />)
      ) : (
        <p className="pt-4 text-center text-[var(--text-secondary)]">No classes scheduled.</p>
      )}
    </div>
  </div>
);

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<Theme>('nebula');
  const [sortOption, setSortOption] = useState<SortOption>('time');
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const [selectedDays, setSelectedDays] = useState<string[]>(weekDays);
  
  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  const timeToSortable = (timeStr: string) => {
    if (!timeStr) return 0;
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) { // Midnight case
      hours = 0;
    }
    return hours * 60 + minutes;
  };
  
  const sortSessions = (sessions: ClassSession[]) => {
    return [...sessions].sort((a, b) => {
      switch (sortOption) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'teacher':
          return a.teacher.localeCompare(b.teacher);
        case 'time':
        default:
          return timeToSortable(a.startTime) - timeToSortable(b.startTime);
      }
    });
  };

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
        prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };
  const handleSelectAllDays = () => setSelectedDays(weekDays);
  const handleDeselectAllDays = () => setSelectedDays([]);

  const processedData = scheduleData.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scheduledSessions = processedData.filter(s => s.day && selectedDays.includes(s.day));
  const unscheduledSessions = sortSessions(processedData.filter(s => !s.day));
  const visibleWeekDays = weekDays.filter(day => selectedDays.includes(day));

  const noSearchResults = processedData.length === 0;
  const noClassesVisible = scheduledSessions.length === 0 && unscheduledSessions.length === 0 && !noSearchResults;

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={e => setSearchQuery(e.target.value)}
        theme={theme}
        onThemeChange={setTheme}
        sortOption={sortOption}
        onSortChange={setSortOption}
        selectedDays={selectedDays}
        onDayToggle={handleDayToggle}
        onSelectAllDays={handleSelectAllDays}
        onDeselectAllDays={handleDeselectAllDays}
      />
      <main className="flex-grow w-full max-w-[1800px] mx-auto p-4 md:p-8 flex flex-col gap-8">
        {noSearchResults ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-[var(--text-secondary)] py-16">
            <h2 className="text-2xl font-semibold">No Results Found</h2>
            <p className="mt-2">Try adjusting your search for course titles or teachers.</p>
          </div>
        ) : noClassesVisible ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-[var(--text-secondary)] py-16">
            <h2 className="text-2xl font-semibold">No Classes to Display</h2>
            <p className="mt-2">Try adjusting your day filter to see scheduled classes.</p>
          </div>
        ) : (
          <>
            {visibleWeekDays.length > 0 && 
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 md:gap-6">
                {visibleWeekDays.map(day => {
                  const sessionsForDay = scheduledSessions.filter(session => session.day === day);
                  const sortedSessions = sortSessions(sessionsForDay);
                  return <DayColumn key={day} day={day} sessions={sortedSessions} />;
                })}
              </div>
            }

            {unscheduledSessions.length > 0 && (
              <div className="mt-8">
                  <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-wide mb-4 text-center">Unscheduled Courses</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {unscheduledSessions.map(session => (
                        <ClassCard key={session.id} session={session} />
                    ))}
                  </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;