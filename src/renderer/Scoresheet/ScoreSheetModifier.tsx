import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { PlayerStats, Stat } from 'renderer/States/scoresheet';
import AddPlayer from './ModificationApp/AddPlayer';
import AddPlayerStats from './ModificationApp/AddPlayerStats';

interface SSModiferProps {
  teamName: string;
  appStats: Stat[];
  onCourt: string[];
  players: PlayerStats[];
  bench: PlayerStats[];
  changePlayer: (index: number, playerId: string) => void;
  updateStat: (playerId: string, stat: string, value: number) => void;
  addNumber: (playerId: string, number: number) => void;
  leftToAdd: PlayerStats[];
  addPlayer: (index: number, playerId: string) => void;
  displayStat: Record<Stat, string>;
  showButtons: boolean;
}

export default (props: SSModiferProps) => {
  let playerStats = props.players;
  useEffect(() => {
    playerStats = props.players;
  }, [props]);
  return (
    <Paper elevation={20}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h4">{props.teamName}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ px: 1, py: 0 }} />
            <TableCell sx={{ px: 1, py: 0 }}>
              <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                #
              </Typography>
            </TableCell>
            <TableCell sx={{ px: 1, py: 0 }}>
              <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Name
              </Typography>
            </TableCell>

            {props.appStats
              .filter((stat) => stat !== 'Pts')
              .map((stat: Stat) => (
                <TableCell sx={{ px: 0.5, py: 0 }}>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    {props.displayStat[stat]}
                  </Typography>
                </TableCell>
              ))}
            <TableCell sx={{ px: 0.5, py: 0 }}>
              <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Pts
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.onCourt.map((playerId: string, i: number) => (
            <AddPlayerStats
              bench={props.bench}
              chosenPlayer={playerStats[playerId]}
              index={i}
              onPlayerChange={props.changePlayer}
              onStatChange={props.updateStat}
              key={playerId}
              wantedStats={props.appStats}
              updateNumber={props.addNumber}
              showButtons={props.showButtons}
            />
          ))}
          {props.leftToAdd.map((i) => (
            <AddPlayer
              bench={props.bench}
              index={i}
              onAddPlayer={props.addPlayer}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
