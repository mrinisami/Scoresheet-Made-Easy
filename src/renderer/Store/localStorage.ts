import { ScoreSheetState } from 'renderer/States/scoresheet';
import { useAppSelector } from './hooks';

const ls = window.localStorage;

interface LocalStorageItem<T> {
  set: (value: T) => void;
  getOrDefault: (defaultValue: T) => T;
}

export interface LocalStorage {
  scoresheetState: LocalStorageItem<ScoreSheetState>;
}

export const localStorage: LocalStorage = {
  scoresheetState: {
    set: (value: ScoreSheetState) => ls.setItem('state', JSON.stringify(value)),
    getOrDefault: (defaultValue: ScoreSheetState) => {
      const value = ls.getItem('state');
      if (value) {
        return JSON.parse(value);
      }
      return defaultValue;
    },
  },
};
