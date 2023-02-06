import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
  Checkbox,
  Box,
  Stack,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
  Fade,
} from '@mui/material';
import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';
import { SingleEntryPlugin } from 'webpack';
import { useNavigate } from 'react-router-dom';
import Submit from './Submit';
import { League } from '../api';
import Matches from './Matches';

export default (props) => {
  const [alignment, setAlignment] = useState();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [{ data, loading, error }] = useAxios<League>(
    `http://s1.rseq.ca/api/LeagueApi/GetLeagueDiffusion/?leagueId=${props.leagueId}`
  );
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    setTeam(newAlignment);
  };
  useEffect(() => {
    setTeam(null);
    setAlignment();
  }, [props.root]);

  function renderNextStep() {
    if (team === null) {
      return (
        <Grid item container justifyContent="center">
          <Typography align="center">Vous devez choisir une équipe</Typography>
        </Grid>
      );
    }
    return <Submit data={team} />;
  }

  if (loading) {
    return <Typography>Loading</Typography>;
  }
  if (error) {
    return <Typography>Retry</Typography>;
  }
  if (data) {
    const teams = data.Teams;
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid container item justifyContent="center">
            <Grid
              item
              sx={{ border: 'solid grey', width: '50%', borderRadius: '20px' }}
            >
              <Typography variant="h6" align="center">
                Choisir l'équipe
              </Typography>
            </Grid>
          </Grid>
          <Grid container item justifyContent="center">
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleAlignment}
            >
              {teams.map((team, i) => (
                <ToggleButton key={i} value={team.TeamId}>
                  <Typography>{team.TeamName}</Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
          {renderNextStep()}
        </Grid>
      </Container>
    );
  }
};
