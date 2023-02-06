import {
  Grid,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';
import { useState, useEffect } from 'react';
import {
  PlayerStats,
  Stats,
  Stat,
  sortPlayerList,
} from 'renderer/States/scoresheet';
import { ArrowDropUp } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ScoreChangeLineup from './AddPlayerLineup';
import CreateRow from './ScoresheetRow';

interface Props {
  wantedStats: Stat[];
  updateNb: (playerId: string, number: number) => void;
  displayStats: Record<Stat, string>;
  players: PlayerStats[];
  addPlayer: (playerId: string, number: number) => void;
  sortedCol: Stat | 'Number';
  changeSortedCol: (colStat: Stat | 'Number') => void;
  teamName: string;
}
export default (props: Props) => {
  const [asc, setAsc] = useState(true);
  const [orderedPlayers, setOrderedPlayers] = useState(
    props.players.sort(sortPlayerList(props.sortedCol, asc))
  );
  const onClickSort = (col: Stat | 'Number') => {
    setAsc(!asc);
    props.changeSortedCol(col);
    setOrderedPlayers(props.players.sort(sortPlayerList(col, !asc)));
  };
  useEffect(() => {
    setOrderedPlayers(props.players.sort(sortPlayerList(props.sortedCol, asc)));
  }, [props.players, asc, props.sortedCol]);
  return (
    <Paper elevation={20}>
      <Grid item>
        <Grid item container justifyContent="space-between">
          <Grid item sx={{ pt: 1, pl: 3 }}>
            <Typography variant="h5">{props.teamName}</Typography>
          </Grid>
          <Grid item>
            <ScoreChangeLineup addPlayer={props.addPlayer} />
          </Grid>
        </Grid>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => onClickSort('Number')}
                align="left"
                sx={{ fontWeight: 'bold' }}
              >
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  #
                </Typography>
              </TableCell>
              <TableCell
                sx={{ minWidth: '12rem', fontWeight: 'bold' }}
                align="left"
              >
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  Nom
                </Typography>
              </TableCell>
              {props.wantedStats.map((stat) => (
                <TableCell key={stat} sx={{ pb: 0, fontWeight: 'bold' }}>
                  <Typography>{props.displayStats[stat]}</Typography>
                  <IconButton
                    sx={{ p: 0 }}
                    onClick={() => onClickSort(stat)}
                    color="primary"
                  >
                    {asc ? <ArrowDropDownIcon /> : <ArrowDropUp />}
                  </IconButton>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedPlayers.map((player) => (
              <CreateRow
                name={player.Name}
                number={player.Number}
                stats={player.Total}
                key={player.id}
                wantedStats={props.wantedStats}
                updateNumber={props.updateNb}
                id={player.id}
              />
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Paper>
  );
};
