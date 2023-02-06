import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
} from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { ScoreSheetState } from 'renderer/States/scoresheet';
import { useState } from 'react';

interface Props {
  hTeamName: string;
  vTeamName: string;
  hTeamPts: number;
  vTeamPts: number;
  loadData: (oldState: ScoreSheetState) => void;
  oldState: ScoreSheetState;
}

export default (props: Props) => {
  const [open, setOpen] = useState(false);
  const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOpen(false);
  };
  const onClickOpenPrevInfo = () => setOpen(true);

  return (
    <Grid item>
      <Button variant="contained" onClick={onClickOpenPrevInfo}>
        <Typography>Previous Scoresheet</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography>Game Info</Typography>
        </DialogTitle>
        {displayDialog()}
      </Dialog>
    </Grid>
  );
  function displayDialog() {
    if (props.oldState.GameId === '') {
      return <Typography>No previous game</Typography>;
    }
    return (
      <Grid container alignItems="space-evenly" justifyContent="space-evenly">
        <Grid item container justifyContent="space-evenly" xs={12}>
          <Grid item>
            <Typography>{props.hTeamName}</Typography>
          </Grid>

          <Grid item sx={{ borderStyle: 'groove', px: 2, borderRadius: 8 }}>
            <Typography>{`${props.hTeamPts} - ${props.vTeamPts}`}</Typography>
          </Grid>

          <Grid item>
            <Typography>{props.vTeamName}</Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ pt: 1 }}>
          <Button
            endIcon={<ArrowCircleRightIcon />}
            onClick={() => props.loadData(props.oldState)}
          >
            <Typography>Load</Typography>
          </Button>
        </Grid>
      </Grid>
    );
  }
};
