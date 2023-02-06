import useAxios from 'axios-hooks';
import { useNavigate } from 'react-router-dom';
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
  Box,
  Stack,
  Card,
  CardContent,
} from '@mui/material';

import { addOldData, ScoreSheetState } from 'renderer/States/scoresheet';
import { useDispatch, useSelector } from 'react-redux';
import { localStorage } from 'renderer/Store/localStorage';
import LastScoreSheet from './LastScoreSheet';

interface LeagueRes {
  LeagueId: string;
  SchooYearId: string;
}

export default () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentState = useSelector(
    (state: ScoreSheetState) => state.scoresheet
  );
  const state: ScoreSheetState =
    localStorage.scoresheetState.getOrDefault(currentState);
  console.log(currentState);
  const loadData = (oldState: ScoreSheetState) => {
    dispatch(addOldData(oldState));
    navigate(`/Scoresheet/${state.GameId}/Total`);
  };
  const onClickScore = () => {
    navigate('/Options');
  };

  return (
    <Grid container>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '70vh' }}
      >
        <Grid item>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Scoresheet Made Easy
          </Typography>
        </Grid>
        <Grid item container justifyContent="center" spacing={2}>
          <LastScoreSheet
            hTeamName={state.homeTeam.Name}
            vTeamName={state.visitingTeam.Name}
            hTeamPts={state.homeTeam.Total.Pts}
            vTeamPts={state.visitingTeam.Total.Pts}
            loadData={loadData}
            oldState={state}
          />

          <Grid item>
            <Button variant="contained" onClick={onClickScore}>
              <Typography>Create Scoresheet</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
