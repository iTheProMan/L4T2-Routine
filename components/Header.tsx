/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon, PaletteIcon, SortIcon, FilterIcon } from './icons';
import { type Theme, type SortOption } from '../types';

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M-4.5 12h22.5" />
    </svg>
);

interface HeaderProps {
    searchQuery: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
    sortOption: SortOption;
    onSortChange: (option: SortOption) => void;
    selectedDays: string[];
    onDayToggle: (day: string) => void;
    onSelectAllDays: () => void;
    onDeselectAllDays: () => void;
}

const themes: { name: Theme, label: string }[] = [
    { name: 'nebula', label: 'Nebula' },
    { name: 'professional', label: 'Professional' },
    { name: 'retro', label: 'Retro' },
    { name: 'blueprint', label: 'Blueprint' },
    { name: 'sunset', label: 'Sunset' },
    { name: 'oceanic', label: 'Oceanic' },
    { name: 'sakura', label: 'Sakura' },
    { name: 'dracula', label: 'Dracula' },
    { name: 'solarized', label: 'Solarized' },
    { name: 'evergreen', label: 'Evergreen' },
];

const sortOptions: { name: SortOption, label: string }[] = [
    { name: 'time', label: 'Sort by Time' },
    { name: 'title', label: 'Sort by Title' },
    { name: 'teacher', label: 'Sort by Teacher' },
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const Header: React.FC<HeaderProps> = ({ 
    searchQuery, onSearchChange, 
    theme, onThemeChange,
    sortOption, onSortChange,
    selectedDays, onDayToggle, onSelectAllDays, onDeselectAllDays
}) => {
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    
    const themeMenuRef = useRef<HTMLDivElement>(null);
    const sortMenuRef = useRef<HTMLDivElement>(null);
    const filterMenuRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (themeMenuRef.current && !themeMenuRef.current.contains(target)) setIsThemeMenuOpen(false);
            if (sortMenuRef.current && !sortMenuRef.current.contains(target)) setIsSortMenuOpen(false);
            if (filterMenuRef.current && !filterMenuRef.current.contains(target)) setIsFilterMenuOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

  return (
    <header className="w-full py-3 px-4 md:px-8 border-b border-[var(--border-color)] bg-[var(--header-bg)] backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between gap-4">
          <div className="flex items-center justify-center gap-3">
              <CalendarIcon className="w-6 h-6 text-[var(--accent-color)]" />
              <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)] hidden sm:block">
                Weekly Class Schedule
              </h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 flex-1 max-w-lg">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="w-5 h-5 text-[var(--text-muted)]" />
              </div>
              <input
                type="text"
                placeholder="Search by course or teacher..."
                value={searchQuery}
                onChange={onSearchChange}
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg bg-[var(--card-bg)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 outline-none transition-colors"
                style={{borderColor: 'var(--border-color)', '--tw-ring-color': 'var(--accent-color)'} as React.CSSProperties}
              />
            </div>
            <div className="flex items-center gap-1">
                <div className="relative" ref={filterMenuRef}>
                    <button onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)} className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--button-hover-bg)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-color)]" style={{'--tw-ring-offset-color': 'var(--bg-primary)'} as React.CSSProperties} aria-label="Filter by day">
                        <FilterIcon className="w-6 h-6" />
                    </button>
                    {isFilterMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-[var(--modal-bg)] border border-[var(--border-color)] rounded-lg shadow-xl z-50">
                            <div className="p-3 space-y-2 text-[var(--text-secondary)]">
                                {weekDays.map(day => (
                                    <label key={day} className="flex items-center space-x-3 cursor-pointer p-1 rounded-md hover:bg-[var(--button-hover-bg)]">
                                        <input
                                            type="checkbox"
                                            checked={selectedDays.includes(day)}
                                            onChange={() => onDayToggle(day)}
                                            className="h-4 w-4 rounded bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--accent-color)] focus:ring-[var(--accent-color)]"
                                        />
                                        <span className="select-none">{day}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="border-t border-[var(--border-color)] p-2 flex justify-between">
                                <button onClick={onSelectAllDays} className="text-sm px-3 py-1 rounded-md hover:bg-[var(--button-hover-bg)] text-[var(--accent-color)]">Select All</button>
                                <button onClick={onDeselectAllDays} className="text-sm px-3 py-1 rounded-md hover:bg-[var(--button-hover-bg)] text-[var(--text-secondary)]">Deselect All</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative" ref={sortMenuRef}>
                    <button onClick={() => setIsSortMenuOpen(!isSortMenuOpen)} className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--button-hover-bg)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-color)]" style={{'--tw-ring-offset-color': 'var(--bg-primary)'} as React.CSSProperties} aria-label="Sort options">
                        <SortIcon className="w-6 h-6" />
                    </button>
                    {isSortMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-[var(--modal-bg)] border border-[var(--border-color)] rounded-lg shadow-xl py-1 z-50">
                            {sortOptions.map(opt => (
                                <button key={opt.name} onClick={() => { onSortChange(opt.name); setIsSortMenuOpen(false); }} className={`w-full text-left px-4 py-2 text-sm capitalize ${sortOption === opt.name ? 'font-bold text-[var(--accent-color)]' : 'text-[var(--text-secondary)]'} hover:bg-[var(--button-hover-bg)]`}>
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative" ref={themeMenuRef}>
                    <button onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)} className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--button-hover-bg)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-color)]" style={{'--tw-ring-offset-color': 'var(--bg-primary)'} as React.CSSProperties} aria-label="Select theme">
                        <PaletteIcon className="w-6 h-6" />
                    </button>
                    {isThemeMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-[var(--modal-bg)] border border-[var(--border-color)] rounded-lg shadow-xl py-1 z-50 max-h-80 overflow-y-auto">
                            {themes.map(t => (
                                <button key={t.name} onClick={() => { onThemeChange(t.name); setIsThemeMenuOpen(false); }} className={`w-full text-left px-4 py-2 text-sm capitalize ${theme === t.name ? 'font-bold text-[var(--accent-color)]' : 'text-[var(--text-secondary)]'} hover:bg-[var(--button-hover-bg)]`}>
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
          </div>
      </div>
    </header>
  );
};

export default Header;