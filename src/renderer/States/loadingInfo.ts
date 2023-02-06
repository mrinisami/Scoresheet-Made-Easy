import { createSlice } from '@reduxjs/toolkit';

interface GameInfo {
  GameDateFormatted: string;
  GameDayOfWeek: string;
  GameTimeFormatted: string;
  VisitingTeamName: string;
  HomeTeamName: string;
  SportFacilityDescription: string;
  VisitingTeamScore: number;
  HomeTeamScore: number;
  GameId: string;
}

interface LoadingInfo {
  teamId: null | string;
  gameId: null | string;
  teamGames: GameInfo[];
}

const loadingInfoSlice = createSlice({
  name: 'loadingInfo',
  initialState: { teamId: null, gameId: null, teamGames: [] },
  reducers: {
    addTeamGames: (state, action) => {
      state.teamId = action.payload.TeamId;
      state.teamGames = action.payload.TeamGames;
    },
  },
});

export const { addTeamGames } = loadingInfoSlice.actions;
export default loadingInfoSlice.reducer;
