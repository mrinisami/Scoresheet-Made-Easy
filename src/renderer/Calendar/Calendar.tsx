import useAxios from 'axios-hooks';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addTeam } from 'renderer/States/scoresheet';
import { useAppSelector } from 'renderer/Store/hooks';
import { Team } from '../api';
import CalendarTable from './CalendarTable';
import CalendarLoader from './CalendarLoader';

export default () => {
  const games = useAppSelector((state) => state.loadingInfo.teamGames);

  const today = new Date();
  let gameDate = '';
  let diffDate = 0;
  let gameId = 0;
  for (let i = 0; i < games.length; i++) {
    gameDate = new Date(games[i].GameDateFormatted);
    diffDate = gameDate - today;
    if (diffDate > 0) {
      gameId = i;
      break;
    }
  }

  if (games.length !== 0) {
    return renderContent();
  }

  return <CalendarLoader>{renderContent()}</CalendarLoader>;
  function renderContent() {
    return (
      <Container>
        <Grid container alignItems="center" direction="column">
          <Grid item>
            <CalendarTable games={games} id={gameId} />
          </Grid>
        </Grid>
      </Container>
    );
  }
};
