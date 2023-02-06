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
  displayStats: Record<Stat, string>;
  changeSortedCol: (colStat: Stat | 'Number') => void;
  asc: boolean;
}
export default (props: Props) => {
  const onClickSort = (col: Stat | 'Number') => {
    props.changeSortedCol(col);
  };

  return (
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
        <TableCell sx={{ minWidth: '12rem', fontWeight: 'bold' }} align="left">
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
              {props.asc ? <ArrowDropDownIcon /> : <ArrowDropUp />}
            </IconButton>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
