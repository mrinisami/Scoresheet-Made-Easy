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
} from '@mui/material';
import { leagueIds } from '../../../resources/league_id';
import Filter from './Inputs';

export default () => {
  return (
    <Paper>
      <Box sx={{ marginTop: '75px' }}>
        <Grid container item justifyContent="center">
          <Filter data={leagueIds} />
        </Grid>
      </Box>
    </Paper>
  );
};
