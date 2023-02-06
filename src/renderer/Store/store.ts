import { configureStore } from '@reduxjs/toolkit';
import logger, { createLogger } from 'redux-logger';
import scoreReducer from '../States/scoresheet';
import themeReducer from '../States/Theme';
import { localStorage as ls } from './localStorage';

const saveState = ({ getState }) => {
  return (next) => (action) => {
    const returnValue = next(action);
    ls.scoresheetState.set(getState().scoresheet);
    return returnValue;
  };
};

export const store = configureStore({
  reducer: {
    scoresheet: scoreReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(saveState),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
