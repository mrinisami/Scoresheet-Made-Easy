import { PropaneSharp } from '@mui/icons-material';
import { TableRow, TableCell, Typography } from '@mui/material';
import { Stats, Stat } from 'renderer/States/scoresheet';
import CreateCell from './ScoreSheetCell';

interface TeamRowProps {
  teamName: string;
  wantedStats: Stat[];
  teamStats: Stats;
}

export default (props: TeamRowProps) => {
  return (
    <TableRow>
      <TableCell />
      <TableCell>
        <Typography>{props.teamName}</Typography>
      </TableCell>
      {props.wantedStats.map((stat: Stat) => (
        <CreateCell stat={props.teamStats[stat]} />
      ))}
    </TableRow>
  );
};
