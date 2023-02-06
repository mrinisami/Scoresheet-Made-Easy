import { TableRow, TableCell, Typography } from '@mui/material';
import { Stats, Stat } from 'renderer/States/scoresheet';
import CreateCell from './ScoreSheetCell';
import NumberEl from './AddNumber';

interface CreateRowProps {
  stats: Stats;
  wantedStats: Stat[];
  number: number;
  name: string;
  updateNumber: (playerId: string, number: number) => void;
  id: string;
}

export default (props: CreateRowProps) => {
  const addNumber = (playerId: string, number: number) => {
    props.updateNumber(playerId, number);
  };
  return (
    <TableRow>
      <TableCell sx={{ cursor: 'pointer', p: 1 }}>
        <NumberEl
          number={props.number}
          updateNumber={addNumber}
          id={props.id}
        />
      </TableCell>
      <TableCell sx={{ p: 1 }}>
        <Typography>{props.name}</Typography>
      </TableCell>

      {props.wantedStats.map((stat: Stat) => (
        <CreateCell stat={props.stats[stat]} key={stat} />
      ))}
    </TableRow>
  );
};
