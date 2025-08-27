/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { type ClassSession } from '../types';
import { TimeIcon, UserIcon, LocationIcon } from './icons';
import ContactModal from './ContactModal';

interface ClassCardProps {
  session: ClassSession;
}

const ClassCard: React.FC<ClassCardProps> = ({ session }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasDetails = session.teacher !== '-' || session.room || session.startTime;
  const hasContact = session.contact && session.contact.includes('@');

  const openModal = () => {
    if (hasContact) {
      setIsModalOpen(true);
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const [phone, email] = hasContact ? session.contact.split(', ') : [null, null];

  return (
    <>
      <div 
        className={`bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-4 flex flex-col gap-3 shadow-lg hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 ${hasContact ? 'cursor-pointer' : ''}`}
        onClick={openModal}
        role="button"
        tabIndex={hasContact ? 0 : -1}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openModal(); }}
        aria-haspopup="dialog"
      >
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-full rounded-full" style={{ backgroundColor: session.color, alignSelf: 'stretch' }}></div>
          <div className="flex-1">
            <p className="font-bold text-[var(--text-muted)] text-sm">{session.course}</p>
            <h3 className="font-bold text-[var(--text-primary)] text-lg leading-tight">{session.title}</h3>
          </div>
          <span className="text-xs font-semibold bg-[var(--button-bg)] text-[var(--text-secondary)] px-2 py-1 rounded-full">{session.section}</span>
        </div>

        {hasDetails && (
          <>
              <div className="border-t border-[var(--border-color)] my-1"></div>
              <div className="flex flex-col gap-2 text-[var(--text-secondary)] text-sm">
                  {session.startTime && (
                      <div className="flex items-center gap-2">
                      <TimeIcon className="w-4 h-4 text-[var(--text-muted)]" />
                      <span>{session.startTime} - {session.endTime}</span>
                      </div>
                  )}
                  {session.room && (
                      <div className="flex items-center gap-2">
                      <LocationIcon className="w-4 h-4 text-[var(--text-muted)]" />
                      <span>Room: {session.room}</span>
                      </div>
                  )}
                  {session.teacher !== '-' && (
                      <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-[var(--text-muted)]" />
                      <span>{session.teacher}</span>
                      </div>
                  )}
              </div>
          </>
        )}
      </div>

      {hasContact && (
        <ContactModal
          isOpen={isModalOpen}
          onClose={closeModal}
          teacher={session.teacher}
          phone={phone}
          email={email}
        />
      )}
    </>
  );
};

export default ClassCard;