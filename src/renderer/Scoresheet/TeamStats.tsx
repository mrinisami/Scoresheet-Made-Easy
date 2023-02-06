import { TableBody } from '@mui/material';
import { PlayerStats, Stat, Stats } from 'renderer/States/scoresheet';
import CreateTeamRow from './CreateTeamRow';
import CreateRow from './ScoresheetRow';

interface TeamStatsProps {
  orderedPlayers: PlayerStats[];
  timeOfGame: 'Total' | 'HalfTime' | number;
  WantedStats: Stat[];
  addNumber: (playerId: string, number: number) => void;
  teamName: string;
  teamStats: Stats;
  playing: string[];
}

export default (props: TeamStatsProps) => {
  if (props.timeOfGame === 'Total' || props.timeOfGame === 'HalfTime') {
    return (
      <TableBody>
        {props.orderedPlayers.map((player) => (
          <CreateRow
            name={player.Name}
            number={player.Number}
            stats={player[props.timeOfGame]}
            key={player.id}
            wantedStats={props.WantedStats}
            updateNumber={props.addNumber}
            id={player.id}
          />
        ))}
        <CreateTeamRow
          wantedStats={props.WantedStats}
          teamName={props.teamName}
          teamStats={props.teamStats[props.timeOfGame]}
        />
      </TableBody>
    );
  }
  return (
    <TableBody>
      {props.orderedPlayers.map((player) => (
        <CreateRow
          name={player.Name}
          number={player.Number}
          stats={player.Stats[props.timeOfGame - 1]}
          key={player.id}
          wantedStats={props.WantedStats}
          updateNumber={props.addNumber}
          id={player.id}
        />
      ))}
      <CreateTeamRow
        wantedStats={props.WantedStats}
        teamName={props.teamName}
        teamStats={props.teamStats.Stats[props.timeOfGame - 1]}
      />
    </TableBody>
  );
};
