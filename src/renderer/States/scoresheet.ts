import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeColor =
  | 'dark'
  | 'green'
  | 'blue'
  | 'brown'
  | 'teal'
  | 'pink'
  | 'default';

export type Stat =
  | 'Pts'
  | 'FGM'
  | 'FGA'
  | 'FGPerc'
  | 'ThreeM'
  | 'ThreeA'
  | 'ThreePerc'
  | 'FTA'
  | 'FTM'
  | 'FTPerc'
  | 'OReb'
  | 'DReb'
  | 'Ast'
  | 'Stl'
  | 'Blk'
  | 'Reb'
  | 'Fouls'
  | 'Tech'
  | 'PlusMin'
  | 'TimePlayed';

export type Stats = Record<Stat, number>;
const emptyStats = (): Stats => ({
  Pts: 0,
  FGA: 0,
  FGPerc: 0,
  ThreeA: 0,
  ThreeM: 0,
  ThreePerc: 0,
  Ast: 0,
  Blk: 0,
  OReb: 0,
  DReb: 0,
  Reb: 0,
  Fouls: 0,
  Tech: 0,
  FTA: 0,
  FTM: 0,
  FTPerc: 0,
  FGM: 0,
  Stl: 0,
  PlusMin: 0,
  TimePlayed: 0,
});
type playInfo = Record<string, string[]>;
const playByPlayInfo = (stat: Stat, value: number) => {
  const possiblePhrases: playInfo = {
    FGM: ['a marqué 2 points', '2 points à'],
    FGA: [
      'a raté un lancer de 2 points',
      'une tentative de lancer de 2 points à',
    ],
    ThreeA: [
      'a raté un lancer de 3 points',
      'une tentative de lancer de 3 points à',
    ],
    ThreeM: ['a marqué 3 points', '3 points à'],
    FTA: ['a raté un lancer franc', 'une tentative de lancer franc à'],
    FTM: ['a marqué un lancer franc', '1 point à'],
    Fouls: ['a commis une faute', 'une faute à'],
    Tech: ['a commis une faute technique', 'une faute technique à'],
    OReb: ['a pris un rebond offensif', 'un rebond offensif à'],
    DReb: ['a pris un rebond défensif', 'un rebond défensif à'],
    Reb: ['a pris un rebond', 'un rebond à'],
    Ast: ['a donné une passe décisive', 'une passe décisive'],
    Stl: ['a soutiré le ballon', 'un vol de ballon à'],
    Blk: ['a bloqué un tir', 'un tir bloqué à'],
  };
  if (value === -1) {
    return possiblePhrases[stat][1];
  }
  return possiblePhrases[stat][0];
};
export interface TeamStats {
  Players: Record<string, PlayerStats>;
  Bonus: boolean;
  Reserved: string[];
  TeamId: string | null;
  Name: string;
  Stats: Stats[];
  Total: Stats;
  HalfTime: Stats;
  Playing: string[];
  Bench: string[];
  Possession: boolean;
}

export interface PlayerStats {
  FirstName: string;
  LastName: string;
  id: string;
  Number: number;
  Name: string;
  Stats: Stats[];
  Total: Stats;
  HalfTime: Stats;
  IsFouledOut: boolean;
  IsEjected: boolean;
  PlayingTime: number[];
}
export interface Time {
  min: number;
  seconds: number;
  deciSecs: number;
}
export interface ScoreSheetState {
  ElapsedTime: number;
  QtrTime: number;
  AgeClass: string;
  Division: string;
  GameCourt: string;
  GameDate: string;
  GameTime: string;
  GameId: string | null;
  CurrentQtr: number;
  homeTeam: TeamStats;
  visitingTeam: TeamStats;
  WantedStats: string[];
  isMatchLive: boolean;
  sortedCol: Stat | 'Number';
  sortOrderAsc: boolean;
  PlayByPlay: string[];
}

const initialState = (): ScoreSheetState => {
  const initStats = [...Array(5).keys()].map(() => emptyStats());
  return {
    sortedCol: 'Number',
    ElapsedTime: 0,
    isMatchLive: false,
    AgeClass: '',
    QtrTime: 0,
    GameDate: '',
    GameCourt: '',
    GameTime: '',
    Division: '',
    CurrentQtr: 1,
    GameId: null,
    WantedStats: [],
    PlayByPlay: [],
    sortOrderAsc: true,
    homeTeam: {
      Possession: false,
      Bonus: false,
      Reserved: [],
      Playing: [],
      Bench: [],
      Players: {},
      TeamId: null,
      Name: '',
      Stats: initStats,
      Total: emptyStats(),
      HalfTime: emptyStats(),
    },
    visitingTeam: {
      Possession: false,
      Bonus: false,
      Reserved: [],
      Playing: [],
      Bench: [],
      Players: {},
      TeamId: null,
      Name: '',
      Stats: initStats,
      Total: emptyStats(),
      HalfTime: emptyStats(),
    },
  };
};

interface ChangeHomePlayingPayload {
  index: number;
  deleteNb: number;
  playerId: string;
}
const QtrTime = (ageClass: string, div: string) => {
  if (ageClass === 'Benjamin' || (ageClass === 'Cadet' && div === 'D2')) {
    return 8;
  }
  return 10;
};
const wantedStats = (div: string) => {
  const AA = [
    'FGM',
    'FGA',
    'FGPerc',
    'ThreeM',
    'ThreeA',
    'ThreePerc',
    'FTM',
    'FTA',
    'FTPerc',
    'Tech',
    'Fouls',
    'Pts',
  ];
  const AAA = [
    'FGM',
    'FGA',
    'FGPerc',
    'ThreeM',
    'ThreeA',
    'ThreePerc',
    'FTM',
    'FTA',
    'FTPerc',
    'OReb',
    'DReb',
    'Reb',
    'Tech',
    'Fouls',
    'Pts',
  ];
  if (div === 'D1') {
    return AAA;
  }
  return AA;
};

export const statToUpdate: Record<string, Stat[]> = {
  FGM: ['FGM', 'FGA'],
  FGA: ['FGA'],
  ThreeM: ['ThreeM', 'ThreeA', 'FGM', 'FGA'],
  ThreeA: ['ThreeA', 'FGA'],
  FTA: ['FTA'],
  FTM: ['FTM', 'FTA'],
  OReb: ['OReb', 'Reb'],
  DReb: ['DReb', 'Reb'],
  Ast: ['Ast'],
  Stl: ['Stl'],
  Blk: ['Blk'],
  Fouls: ['Fouls'],
  Tech: ['Tech'],
  Reb: ['Reb'],
};
const probStat: Record<string, Stat[]> = {
  FGA: ['FGA', 'FGM'],
  ThreeA: ['ThreeA', 'ThreeM'],
  FTA: ['FTA', 'FTM'],
  ThreeA2: ['ThreeA', 'ThreeM', 'FGM', 'FGA'],
  FGM: ['FGM', 'ThreeM', 'FGA', 'ThreeA'],
};
export const displayStat: Record<Stat, string> = {
  Pts: 'Pts',
  FGM: 'FGM',
  FGA: 'FGA',
  FGPerc: 'FG%',
  ThreeM: '3PM',
  ThreeA: '3PA',
  FTA: 'FTA',
  FTM: 'FTM',
  OReb: 'OReb',
  DReb: 'DReb',
  Reb: 'Reb',
  Ast: 'Ast',
  Stl: 'Stl',
  Blk: 'Blk',
  Fouls: 'Fouls',
  Tech: 'TFouls',
  ThreePerc: '3P%',
  FTPerc: 'FT%',
  PlusMin: '+/-',
  TimePlayed: 'Mins',
};
export const AllStats: Stat[] = [
  'FGM',
  'FGA',
  'FGPerc',
  'ThreeM',
  'ThreeA',
  'ThreePerc',
  'FTM',
  'FTA',
  'OReb',
  'DReb',
  'Reb',
  'Fouls',
  'Tech',
  'Ast',
  'Blk',
  'Stl',
  'Pts',
  'PlusMin',
  'TimePlayed',
];
const scoreSlice = createSlice({
  name: 'scoresheet',
  initialState: initialState(),
  reducers: {
    addOldData: (state, action) => {
      return action.payload;
    },
    addHomePlayer: (state, action) => {
      const initStats: Stats[] = [];
      [...Array(5).keys()].forEach((i) => {
        initStats.push(emptyStats());
      });
      state.homeTeam.Players[action.payload.id] = {
        IsFouledOut: false,
        IsEjected: false,
        FirstName: action.payload.firstName,
        LastName: action.payload.lastName,
        Name: action.payload.name,
        id: action.payload.id,
        Number: action.payload.number,
        Stats: initStats,
        Total: emptyStats(),
        HalfTime: emptyStats(),
        PlayingTime: [],
      };
    },
    addVisitingPlayer: (state, action) => {
      const initStats: Stats[] = [];
      [...Array(5).keys()].forEach((i) => {
        initStats.push(emptyStats());
      });
      state.visitingTeam.Players[action.payload.id] = {
        IsFouledOut: false,
        IsEjected: false,
        FirstName: action.payload.FirstName,
        LastName: action.payload.LastName,
        Name: action.payload.name,
        id: action.payload.id,
        Number: action.payload.number,
        Stats: initStats,
        Total: emptyStats(),
        HalfTime: emptyStats(),
        PlayingTime: [],
      };
    },
    addTeam: (state, action) => {
      state.homeTeam.TeamId = action.payload.TeamId;
      state.Division = action.payload.Division;
      state.AgeClass = action.payload.Category;
    },
    updateHomeNumber: (state, action) => {
      state.homeTeam.Players[action.payload.id].Number = action.payload.number;
    },
    updateVisitingNumber: (state, action) => {
      state.visitingTeam.Players[action.payload.id].Number =
        action.payload.number;
    },
    updateWantedStats: (state, action) => {
      state.WantedStats = action.payload;
    },
    changeHomePlaying: (
      state,
      action: PayloadAction<ChangeHomePlayingPayload>
    ) => {
      const replacedPlayer: string =
        state.homeTeam.Playing[action.payload.index];

      state.homeTeam.Playing.splice(
        action.payload.index,
        action.payload.deleteNb,
        action.payload.playerId
      );
    },
    addHomePlaying: (state, action) => {
      state.homeTeam.Playing.push(action.payload);
    },
    addVisitingPlaying: (state, action) => {
      state.visitingTeam.Playing.push(action.payload);
    },
    changeVisitingPlaying: (
      state,
      action: PayloadAction<ChangeHomePlayingPayload>
    ) => {
      const replacedPlayer: string =
        state.visitingTeam.Playing[action.payload.index];

      state.visitingTeam.Playing.splice(
        action.payload.index,
        action.payload.deleteNb,
        action.payload.playerId
      );
    },
    updateSortedStats: (state, action) => {
      state.sortedCol = action.payload;
      state.sortOrderAsc = !state.sortOrderAsc;
    },
    updateElapsedTime: (state, action) => {
      state.ElapsedTime = action.payload;
      state.isMatchLive = !state.isMatchLive;
      state = addTimePlayed(state);
    },
    updateQtr: (state, action) => {
      if (state.CurrentQtr === 5 && action.payload === 1) {
        action.payload = 0;
      }
      state.CurrentQtr += action.payload;
      state.ElapsedTime = 0;

      state.homeTeam.Bonus = calculateBonus(
        state.homeTeam.Stats[state.CurrentQtr - 1].Fouls
      );
      state.visitingTeam.Bonus = calculateBonus(
        state.visitingTeam.Stats[state.CurrentQtr - 1].Fouls
      );
    },
    updatePossessionHome: (state) => {
      state.homeTeam.Possession = true;
      state.visitingTeam.Possession = false;
    },
    updatePossessionVisiting: (state) => {
      state.visitingTeam.Possession = true;
      state.homeTeam.Possession = false;
    },
    updateHomePlayerStats: (state, action) => {
      const playerId = action.payload.id;
      const { CurrentQtr } = state;
      const begHomeTeamPts = state.homeTeam.Total.Pts;
      const calibratedStats = calibrateProbStats(
        state.homeTeam.Players[playerId].Total,
        action.payload.stat,
        action.payload.value
      );
      calibratedStats.forEach((stat: Stat) => {
        const playerValue =
          state.homeTeam.Players[playerId].Stats[CurrentQtr - 1][stat] +
          action.payload.value;
        state.homeTeam.Players[playerId].Stats[CurrentQtr - 1][stat] = Math.max(
          playerValue,
          0
        );
        const teamValue =
          state.homeTeam.Stats[CurrentQtr - 1][stat] + action.payload.value;
        state.homeTeam.Stats[CurrentQtr - 1][stat] = Math.max(teamValue, 0);
      });

      state.homeTeam.Players[playerId].Total = calculateTotalStats(
        state.homeTeam.Players[playerId].Stats
      );
      state.homeTeam.Players[playerId].HalfTime = calculateTotalStats(
        state.homeTeam.Players[playerId].Stats.slice(0, 2)
      );
      state.homeTeam.Total = calculateTotalStats(state.homeTeam.Stats);
      state.homeTeam.HalfTime = calculateTotalStats(
        state.homeTeam.Stats.slice(0, 2)
      );
      state.homeTeam.Bonus = calculateBonus(
        state.homeTeam.Stats[CurrentQtr - 1].Fouls
      );
      state.homeTeam.Players[playerId].IsFouledOut = calculateBonus(
        state.homeTeam.Players[playerId].Total.Fouls
      );
      state.homeTeam.Players[playerId].IsEjected = calculateEjection(
        state.homeTeam.Players[playerId].Total.Tech
      );
      const diff = state.homeTeam.Total.Pts - begHomeTeamPts;
      if (diff !== 0) {
        state.homeTeam.Playing.forEach((id) => {
          state.homeTeam.Players[id].Stats[CurrentQtr - 1].PlusMin += diff;
          state.homeTeam.Players[id].Total = calculateTotalStats(
            state.homeTeam.Players[id].Stats
          );
        });
        state.visitingTeam.Playing.forEach((id) => {
          state.visitingTeam.Players[id].Stats[CurrentQtr - 1].PlusMin -= diff;
          state.visitingTeam.Players[id].Total = calculateTotalStats(
            state.visitingTeam.Players[id].Stats
          );
        });
      }
      state.PlayByPlay.push(
        createPlay(
          `${state.homeTeam.Players[playerId].FirstName} ${state.homeTeam.Players[playerId].LastName}`,
          action.payload.stat,
          action.payload.value,
          state.ElapsedTime,
          state.QtrTime,
          state.CurrentQtr,
          state.homeTeam.Name
        )
      );
    },
    updateVisitingPlayerStats: (state, action) => {
      const playerId = action.payload.id;
      const { CurrentQtr } = state;
      const calibratedStats = calibrateProbStats(
        state.visitingTeam.Players[playerId].Total,
        action.payload.stat,
        action.payload.value
      );
      const begvisitingTeamPts = state.visitingTeam.Total.Pts;
      calibratedStats.forEach((stat: Stat) => {
        const playerValue =
          state.visitingTeam.Players[playerId].Stats[CurrentQtr - 1][stat] +
          action.payload.value;
        state.visitingTeam.Players[playerId].Stats[CurrentQtr - 1][stat] =
          Math.max(playerValue, 0);
        const teamValue =
          state.visitingTeam.Stats[CurrentQtr - 1][stat] + action.payload.value;
        state.visitingTeam.Stats[CurrentQtr - 1][stat] = Math.max(teamValue, 0);
      });

      state.visitingTeam.Players[playerId].Total = calculateTotalStats(
        state.visitingTeam.Players[playerId].Stats
      );
      state.visitingTeam.Players[playerId].HalfTime = calculateTotalStats(
        state.visitingTeam.Players[playerId].Stats.slice(0, 2)
      );
      state.visitingTeam.Total = calculateTotalStats(state.visitingTeam.Stats);
      state.visitingTeam.HalfTime = calculateTotalStats(
        state.visitingTeam.Stats.slice(0, 2)
      );
      state.visitingTeam.Bonus = calculateBonus(
        state.visitingTeam.Stats[CurrentQtr - 1].Fouls
      );
      state.visitingTeam.Players[playerId].IsFouledOut = calculateBonus(
        state.visitingTeam.Players[playerId].Total.Fouls
      );
      state.visitingTeam.Players[playerId].IsEjected = calculateEjection(
        state.visitingTeam.Players[playerId].Total.Tech
      );
      const diff = state.visitingTeam.Total.Pts - begvisitingTeamPts;
      if (diff !== 0) {
        state.homeTeam.Playing.forEach((id) => {
          state.homeTeam.Players[id].Stats[CurrentQtr - 1].PlusMin -= diff;
          state.homeTeam.Players[id].Total = calculateTotalStats(
            state.homeTeam.Players[id].Stats
          );
        });
        state.visitingTeam.Playing.forEach((id) => {
          state.visitingTeam.Players[id].Stats[CurrentQtr - 1].PlusMin += diff;
          state.visitingTeam.Players[id].Total = calculateTotalStats(
            state.visitingTeam.Players[id].Stats
          );
        });
      }
      state.PlayByPlay.push(
        createPlay(
          `${state.visitingTeam.Players[playerId].FirstName} ${state.visitingTeam.Players[playerId].LastName}`,
          action.payload.stat,
          action.payload.value,
          state.ElapsedTime,
          state.QtrTime,
          state.CurrentQtr,
          state.visitingTeam.Name
        )
      );
    },
    addGameData: (state, action) => {
      state.homeTeam.Name = action.payload.data.HomeTeamName;
      state.homeTeam.TeamId = action.payload.data.HomeTeam;
      state.visitingTeam.Name = action.payload.data.VisitingTeamName;
      state.visitingTeam.TeamId = action.payload.data.VisitingTeam;
      state.GameId = action.payload.data.GameId;
      state.GameDate = action.payload.data.GameDate;
      state.GameTime = action.payload.data.GameTime;
      state.GameCourt = action.payload.data.SportFacilityDescription;
      state.Division = action.payload.division;
      state.AgeClass = action.payload.ageClass;
      state.WantedStats = wantedStats(state.Division);
      state.QtrTime = QtrTime(state.AgeClass, state.Division);
      state.homeTeam.Players = {};
      state.visitingTeam.Players = {};

      action.payload.data.HomeTeamPresence.forEach((player) => {
        if (!player.IsReservedPlayer) {
          const initStats = [...Array(5).keys()].map(() => emptyStats());
          state.homeTeam.Players[player.AthleteId] = {
            IsFouledOut: false,
            IsEjected: false,
            FirstName: player.FirstName,
            LastName: player.LastName,
            id: player.AthleteId,
            Number: player.Number,
            Name: player.FullName,
            Stats: initStats,
            Total: emptyStats(),
            HalfTime: emptyStats(),
            PlayingTime: [],
          };
        } else {
          state.homeTeam.Reserved.push(player.AthleteId);
        }
      });
      action.payload.data.VisitingTeamPresence.forEach((player) => {
        if (!player.IsReservedPlayer) {
          const initStats = [...Array(5).keys()].map(() => emptyStats());
          state.visitingTeam.Players[player.AthleteId] = {
            IsFouledOut: false,
            IsEjected: false,
            FirstName: player.FirstName,
            LastName: player.LastName,
            id: player.AthleteId,
            Number: player.Number,
            Name: player.FullName,
            Stats: initStats,
            Total: emptyStats(),
            HalfTime: emptyStats(),
            PlayingTime: [],
          };
        } else {
          state.visitingTeam.Reserved.push(player.AthleteId);
        }
      });
    },
  },
});

function calculateGameElapsedTime(
  elapsedTime: number,
  qtr: number,
  stdTime: number
) {
  return stdTime * 600 * (qtr - 1) + elapsedTime;
}

function addTimePlayed(state: ScoreSheetState) {
  state.homeTeam.Playing.forEach((id) => {
    state.homeTeam.Players[id].PlayingTime.push(
      calculateGameElapsedTime(
        state.ElapsedTime,
        state.CurrentQtr,
        state.QtrTime
      )
    );
  });
  state.visitingTeam.Playing.forEach((id) => {
    state.visitingTeam.Players[id].PlayingTime.push(
      calculateGameElapsedTime(
        state.ElapsedTime,
        state.CurrentQtr,
        state.QtrTime
      )
    );
  });

  if (!state.isMatchLive) {
    if (state.CurrentQtr === 1) {
      Object.values(state.homeTeam.Players).forEach((player: PlayerStats) => {
        const timePlayed = player.PlayingTime.filter(
          (value) => value < state.QtrTime * 600
        );
        let sum = 0;
        for (let i = 1; i < timePlayed.length; i += 2) {
          sum += timePlayed[i] - timePlayed[i - 1];
        }
        state.homeTeam.Players[player.id].Stats[
          state.CurrentQtr - 1
        ].TimePlayed = sum;
      });
    } else {
      Object.values(state.homeTeam.Players).forEach((player: PlayerStats) => {
        const timePlayed = player.PlayingTime.filter(
          (value) =>
            value < state.QtrTime * 600 * state.CurrentQtr &&
            value >= state.QtrTime * 600 * (state.CurrentQtr - 1)
        );

        let sum = 0;
        for (let i = 1; i < timePlayed.length; i += 2) {
          sum += timePlayed[i] - timePlayed[i - 1];
        }
        state.homeTeam.Players[player.id].Stats[
          state.CurrentQtr - 1
        ].TimePlayed = sum;
      });
    }
  }
  return state;
}
function currentStats(state: ScoreSheetState, qtr: string): ScoreSheetState {
  const stateCopy = { ...state };
  Object.values(stateCopy.homeTeam.Players).forEach((player: PlayerStats) => {
    stateCopy.homeTeam.Players[player.id].Total = calculateTotalStats(
      player.Stats
    );
  });

  return stateCopy;
}
function BenchPlayers(state: ScoreSheetState) {
  const homeBenchInfo = Object.keys(state.homeTeam.Players)
    .filter((player) => !state.homeTeam.Playing.includes(player))
    .map((playerId) => state.homeTeam.Players[playerId]);
  const homeNbPlayersToAdd = 5 - state.homeTeam.Playing.length;
  const homeIterations = [...Array(homeNbPlayersToAdd).keys()].map(
    (i) => i + state.homeTeam.Playing.length
  );
  const visitingBenchInfo = Object.keys(state.visitingTeam.Players)
    .filter((player) => !state.visitingTeam.Playing.includes(player))
    .map((playerId) => state.visitingTeam.Players[playerId]);
  const visitingNbPlayersToAdd = 5 - state.visitingTeam.Playing.length;
  const visitingIterations = [...Array(visitingNbPlayersToAdd).keys()].map(
    (i) => i + state.visitingTeam.Playing.length
  );

  return [homeBenchInfo, homeIterations, visitingBenchInfo, visitingIterations];
}
function calibrateProbStats(playerStats: Stats, stat: Stat, value: number) {
  if (stat === 'FGA' && playerStats[stat] === playerStats.FGM && value === -1) {
    return probStat[stat];
  }
  if (
    stat === 'ThreeA' &&
    playerStats.ThreeM === playerStats.FGM &&
    playerStats.ThreeA === playerStats.ThreeM &&
    value === -1
  ) {
    return probStat.ThreeA2;
  }
  if (
    stat === 'ThreeA' &&
    playerStats[stat] === playerStats.ThreeM &&
    value === -1
  ) {
    return probStat[stat];
  }
  if (stat === 'FTA' && playerStats[stat] === playerStats.FTM && value === -1) {
    return probStat[stat];
  }
  if (
    stat === 'FGM' &&
    playerStats.FGM === playerStats.ThreeM &&
    value === -1
  ) {
    return probStat[stat];
  }
  if (
    stat === 'FGA' &&
    playerStats.FGA === playerStats.FGM &&
    playerStats.FGM === playerStats.ThreeM &&
    value === -1
  ) {
    return probStat.FGM;
  }
  return statToUpdate[stat];
}
function calculateTotalStats(playerStats: Stats[]) {
  const totalStats: Stats = emptyStats();
  const playerStatsCopy = [...playerStats];
  playerStatsCopy.forEach((qtr: Stats, i: number) => {
    qtr.Pts = (qtr.FGM - qtr.ThreeM) * 2 + qtr.ThreeM * 3 + qtr.FTM;
    Object.keys(qtr).forEach((stat: Stat) => {
      totalStats[stat] += playerStatsCopy[i][stat];
    });
    if (qtr.ThreeA !== 0) {
      qtr.ThreePerc = Math.round((qtr.ThreeM / qtr.ThreeA) * 100);
    }
    if (qtr.FTA !== 0) {
      qtr.FTPerc = Math.round((qtr.FTM / qtr.FTA) * 100);
    }
    if (qtr.FGA !== 0) {
      qtr.FGPerc = Math.round((qtr.FGM / qtr.FGA) * 100);
    }
    if (totalStats.ThreeA !== 0) {
      totalStats.ThreePerc = Math.round(
        (totalStats.ThreeM / totalStats.ThreeA) * 100
      );
    }
    if (totalStats.FTA !== 0) {
      totalStats.FTPerc = Math.round((totalStats.FTM / totalStats.FTA) * 100);
    }
    if (totalStats.FGA !== 0) {
      totalStats.FGPerc = Math.round((totalStats.FGM / totalStats.FGA) * 100);
    }
  });

  return totalStats;
}
function calculateBonus(fouls: number) {
  if (fouls >= 5) {
    return true;
  }
  return false;
}
function calculateEjection(Techfouls: number) {
  if (Techfouls === 2) {
    return true;
  }
  return false;
}
function formatTime(stdLength: number, elapsedTime: number) {
  const stdInDec = stdLength * 600;
  const timeDec = stdInDec - elapsedTime;
  const min = Math.floor(timeDec / 600);
  const sec = Math.floor((timeDec % 600) / 10);
  const deci = timeDec - (min * 60 + sec) * 10;

  if (min === 0) {
    return `${sec}:${deci}`;
  }
  if (sec < 10) {
    return `${min}:0${sec}`;
  }
  return `${min}:${sec}`;
}

type PtsStat = 'FGM' | 'ThreeM' | 'FTM';

function calculatePlusMin(
  firstTeamStats: TeamStats,
  secondTeamStats: TeamStats,
  value: number,
  qtr: number,
  stat: PtsStat
) {
  const PtsStat: Record<PtsStat, number> = { FGM: 2, ThreeM: 3, FTM: 1 };
  const firstPlaying = firstTeamStats.Playing;
  const secondPlaying = secondTeamStats.Playing;
  [...Array(5).keys()].forEach((i: number) => {
    firstTeamStats.Players[firstPlaying[i]].Stats[qtr - 1].PlusMin +=
      PtsStat[stat] * value;
    secondTeamStats.Players[secondPlaying[i]].Stats[qtr - 1].PlusMin -=
      PtsStat[stat] * value;
  });
  return [firstTeamStats, secondTeamStats];
}

function createPlay(
  playerName: string,
  stat: Stat,
  value: number,
  elapsedTime: number,
  qtrBaseTime: number,
  qtr: number,
  team: string
) {
  const qtrConversion: Record<number, string> = {
    1: '1er quart',
    2: '2e quart',
    3: '3e quart',
    4: '4e quart',
    5: 'Période additionnelle',
  };
  const time = formatTime(qtrBaseTime, elapsedTime);
  const beginning = `${qtrConversion[qtr]} à ${time} | ${team}`;
  if (value === -1) {
    return `[${beginning}] => Erreur du marqueur, on a retiré ${playByPlayInfo(
      stat,
      value
    )} ${playerName}.`;
  }
  return `[${beginning}] => ${playerName} ${playByPlayInfo(stat, value)}.`;
}
type StatCheck = [Stat, boolean];
export const sortPlayerList = (stat: Stat | 'Number', asc: boolean) => {
  if (asc) {
    if (stat === 'Number') {
      return (a: PlayerStats, b: PlayerStats) => a.Number - b.Number;
    }
    return (a: PlayerStats, b: PlayerStats) => a.Total[stat] - b.Total[stat];
  }
  if (stat === 'Number') {
    return (a: PlayerStats, b: PlayerStats) => b.Number - a.Number;
  }
  return (a: PlayerStats, b: PlayerStats) => b.Total[stat] - a.Total[stat];
};

const statChecked = (state: ScoreSheetState) => {
  const listBools: StatCheck[] = [];
  AllStats.forEach((stat: Stat) => {
    if (state.WantedStats.includes(stat)) {
      listBools.push([stat, true]);
    } else {
      listBools.push([stat, false]);
    }
  });
  return listBools;
};
const isGameOn = (state: ScoreSheetState) => {
  return typeof state.GameId === 'string';
};
const navigateData = (state: ScoreSheetState) => {
  return { teamId: state.homeTeam.TeamId, gameId: state.GameId };
};
export const statSelector = {
  BenchPlayers,
  isGameOn,
  statChecked,
  navigateData,
  currentStats,
};
export const {
  addOldData,
  addTeam,
  addHomePlayer,
  addVisitingPlayer,
  addVisitingPlaying,
  changeVisitingPlaying,
  addGameData,
  updateHomePlayerStats,
  updateVisitingPlayerStats,
  addHomePlaying,
  changeHomePlaying,
  updateWantedStats,
  updateHomeNumber,
  updateVisitingNumber,
  updatePossessionHome,
  updatePossessionVisiting,
  updateQtr,
  updateElapsedTime,
  updateSortedStats,
} = scoreSlice.actions;
export default scoreSlice.reducer;
