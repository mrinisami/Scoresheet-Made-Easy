import {
  AddCircle,
  RadioButtonUnchecked,
  RadioButtonChecked,
  RemoveCircle,
} from '@mui/icons-material';
import { Paper, Grid, IconButton, Typography } from '@mui/material';

import Stopwatch from './Stopwatch';

interface ScoreboardProps {
  qtrTime: number;
  homeScore: number;
  visitingScore: number;
  homeFouls: number;
  homeBonus: boolean;
  visitingFouls: number;
  visitingBonus: boolean;
  quarter: number;
  homePossession: boolean;
  visitingPossession: boolean;
  changeQuarter: (quarter: number) => void;
  changePossessionHome: () => void;
  changePossessionVisiting: () => void;
  changeElapsedTime: (deciSecs: number) => void;
  isPlaying: boolean;
  elapsedTime: number;
}

export default (props: ScoreboardProps) => {
  const onClickAddQtr = () => {
    props.changeQuarter(1);
  };
  const onClickReduceQtr = () => {
    props.changeQuarter(-1);
  };
  const displayQuarter = () => {
    if (props.quarter === 5) {
      return 'OT';
    }
    return props.quarter;
  };
  const onClickPosessionHome = () => props.changePossessionHome();
  const onClickPossessionVisiting = () => props.changePossessionVisiting();

  return (
    <Paper elevation={20}>
      <Grid item container direction="column" sx={{ py: 2 }}>
        <Stopwatch
          changeElapsedTime={props.changeElapsedTime}
          elapsedTime={props.elapsedTime}
          qtrTime={props.qtrTime}
          isPlaying={props.isPlaying}
        />
        <Grid item container justifyContent="space-evenly" sx={{ pt: 2 }}>
          <Grid item container direction="column" xs={4} alignItems="center">
            <Grid item>
              <Typography variant="h5">Receveur</Typography>
            </Grid>
            <Grid
              item
              sx={{
                borderStyle: 'groove',
                px: 2,
                py: 0,
                borderRadius: 2,
                bgcolor: 'black',
              }}
            >
              <Typography color="red" variant="h3">
                {props.homeScore}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={3} alignItems="center">
            <Grid item sx={{ pt: 8 }}>
              Période
            </Grid>

            <Grid
              item
              sx={{
                borderStyle: 'groove',
                px: 2,
                py: 0,
                borderRadius: 2,
                bgcolor: 'black',
              }}
            >
              <Typography variant="h4" color="green">
                {displayQuarter()}
              </Typography>
            </Grid>

            <Grid item container justifyContent="center">
              <Grid item>
                <IconButton
                  onClick={onClickAddQtr}
                  sx={{ p: 0 }}
                  color="primary"
                >
                  <AddCircle />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={onClickReduceQtr}
                  sx={{ p: 0 }}
                  color="primary"
                >
                  <RemoveCircle />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={4} alignItems="center">
            <Grid item>
              <Typography variant="h5">Visiteur</Typography>
            </Grid>
            <Grid
              item
              sx={{
                borderStyle: 'groove',
                px: 2,
                py: 0,
                borderRadius: 2,
                bgcolor: 'black',
              }}
            >
              <Typography variant="h3" color="red">
                {props.visitingScore}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container justifyContent="space-evenly">
          <Grid item container direction="column" xs={4} alignItems="center">
            <Grid item>
              <Typography variant="h6">Fautes</Typography>
            </Grid>
            <Grid
              item
              sx={{
                borderStyle: 'groove',
                px: 2,
                py: 0,
                borderRadius: 2,
                bgcolor: 'black',
              }}
            >
              <Typography variant="h4" color="green">
                {props.homeFouls}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            xs={3}
            justifyContent="flex-end"
          >
            <Grid item container justifyContent="center">
              <Grid item>
                {props.homeBonus ? (
                  <RadioButtonChecked />
                ) : (
                  <RadioButtonUnchecked />
                )}
              </Grid>
              <Grid item>
                <Typography>Bonus</Typography>
              </Grid>
              <Grid item>
                {props.visitingBonus ? (
                  <RadioButtonChecked />
                ) : (
                  <RadioButtonUnchecked />
                )}
              </Grid>
            </Grid>
            <Grid item container justifyContent="center">
              <Grid item>
                <IconButton sx={{ p: 0 }} onClick={onClickPosessionHome}>
                  {props.homePossession ? (
                    <RadioButtonChecked />
                  ) : (
                    <RadioButtonUnchecked />
                  )}
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>Poss</Typography>
              </Grid>
              <Grid item>
                <IconButton sx={{ p: 0 }} onClick={onClickPossessionVisiting}>
                  {props.visitingPossession ? (
                    <RadioButtonChecked />
                  ) : (
                    <RadioButtonUnchecked />
                  )}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={4} alignItems="center">
            <Grid item>
              <Typography variant="h6">Fautes</Typography>
            </Grid>
            <Grid
              item
              sx={{
                borderStyle: 'groove',
                px: 2,
                py: 0,
                borderRadius: 2,
                bgcolor: 'black',
              }}
            >
              <Typography variant="h4" color="green">
                {props.visitingFouls}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
