export interface Team {
  TeamId: string;
  TeamName: string;
  Category: string;
  SexType: string;
  Division: string;
  Athletes: [];
}

interface Athletes {
  FullName: string;
  Number: number;
}

interface RegularSeasonGames {
  GameId: string;
  VisingTeamId: string;
  HomeTeamId: string;
  GameDateFormatted: string;
  GameTimeFormatter: string;
}
export interface League {
  Teams: Team[];
}
