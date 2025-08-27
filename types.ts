/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type Day = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | null;
export type Theme = 'nebula' | 'professional' | 'retro' | 'blueprint' | 'sunset' | 'oceanic' | 'sakura' | 'dracula' | 'solarized' | 'evergreen';
export type SortOption = 'time' | 'teacher' | 'title';

export interface ClassSession {
  id: string;
  course: string;
  title: string;
  teacher: string;
  contact: string;
  day: Day;
  room: string;
  startTime: string;
  endTime: string;
  section: string;
  color: string;
}