import type { Month } from '../data/schedule';

const STORAGE_KEY = 'google-prep-tracker-progress';

export interface ProgressData {
  months: Month[];
  lastUpdated: string;
}

export const loadProgress = (): Month[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: ProgressData = JSON.parse(stored);
      return data.months;
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  return [];
};

export const saveProgress = (months: Month[]): void => {
  try {
    const data: ProgressData = {
      months,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const clearProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
};

export const exportProgress = (months: Month[]): string => {
  try {
    const data: ProgressData = {
      months,
      lastUpdated: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error exporting progress:', error);
    return '';
  }
};

export const importProgress = (jsonString: string): Month[] | null => {
  try {
    const data: ProgressData = JSON.parse(jsonString);
    if (data.months && Array.isArray(data.months)) {
      return data.months;
    }
  } catch (error) {
    console.error('Error importing progress:', error);
  }
  return null;
};
