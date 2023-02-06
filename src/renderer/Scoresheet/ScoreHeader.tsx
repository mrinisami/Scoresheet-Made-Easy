import { Grid, Paper, Typography } from '@mui/material';

interface HeaderProps {
  gameDate: string;
  gameTime: string;
  gameCourt: string;
  homeName: string;
  visitingName: string;
}

export default (props: HeaderProps) => {
  return (
    <Paper elevation={20} sx={{ pt: 2 }}>
      <Grid item container direction="column" spacing={3} alignItems="center">
        <Grid item container justifyContent="space-evenly">
          <Grid item xs={4}>
            <Typography>Date : {props.gameDate}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Heure : {props.gameTime}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Lieu : {props.gameCourt}</Typography>
          </Grid>
        </Grid>
        <Grid item container justifyContent="space-evenly">
          <Grid item xs={4}>
            <Typography>Receveur : {props.homeName}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>VS</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Visiteur : {props.visitingName}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
