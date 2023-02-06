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
import { Team } from '../api';
import CalendarTable from './CalendarTable';

export default () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const team = useParams().teamId;
  const [{ data, loading, error }] = useAxios(`
  http://s1.rseq.ca/api/TeamApi/GetTeamDiffusion/?teamId=${team}`);

  if (loading) {
    return <Typography>loading</Typography>;
  }
  if (error) {
    return <Typography>Error</Typography>;
  }
  if (data) {
    dispatch(addTeam(data));
    console.log(data.TeamGames);
    const games = data.TeamGames;

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
  return <Typography>Error</Typography>;
};
