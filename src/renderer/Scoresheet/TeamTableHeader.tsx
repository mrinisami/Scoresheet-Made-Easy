import { Grid, Typography } from '@mui/material';
import ScoreChangeLineup from './AddPlayerLineup';

export default (props) => {
  return (
    <Grid item>
      <Grid item container justifyContent="space-between">
        <Grid item sx={{ pt: 1, pl: 3 }}>
          <Typography variant="h5">{props.teamName}</Typography>
        </Grid>
        <Grid item>
          <ScoreChangeLineup addPlayer={props.addPlayer} />
        </Grid>
      </Grid>
    </Grid>
  );
};
