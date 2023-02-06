import {
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Icon,
} from '@mui/material';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { AddCircle, Check, RemoveCircle } from '@mui/icons-material';

interface StopWatchProps {
  changeElapsedTime: (deciSecs: number) => void;
  elapsedTime: number;
  qtrTime: number;
  isPlaying: boolean;
}

export default (props: StopWatchProps) => {
  const [deciSec, setDeciSec] = useState(props.elapsedTime);
  const [open, setOpen] = useState(false);
  const [editMin, setEditMin] = useState<number>(currentTime(deciSec)[0]);
  const [editSec, setEditSec] = useState<number>(currentTime(deciSec)[1]);
  const [editDsec, setEditDsec] = useState<number>(0);

  function currentTime(elapsed: number) {
    const current = props.qtrTime * 600 - elapsed;
    const currentMin: number = Math.floor(current / 600);
    const currentSec: number = Math.floor((current - currentMin * 600) / 10);

    return [currentMin, currentSec];
  }
  const onClickAddSecond = () => {
    setDeciSec(deciSec - 10);
  };
  const onClickRemoveSecond = () => {
    setDeciSec(deciSec + 10);
  };
  const onClickStartStopTimer = () => {
    props.changeElapsedTime(deciSec);
  };
  const onClickEditTime = () => {
    setOpen(true);
  };
  const handleTimerClose = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setOpen(false);
  };

  const handleChangeMin = (event) => setEditMin(event.target.value);
  const handleChangeSec = (event) => setEditSec(event.target.value);
  const handleChangeDsec = (event) => setEditDsec(event.target.value);

  const onClickSubmitEdittedTime = () => {
    const timeElapsed = editMin * 600 + editSec * 10 + editDsec;
    props.changeElapsedTime(props.qtrTime * 600 - timeElapsed);
    setOpen(false);
  };

  function formatTime(stdLength: number) {
    const stdInDec = stdLength * 600;
    const timeDec = stdInDec - deciSec;
    const min = Math.floor(timeDec / 600);
    const sec = Math.floor((timeDec % 600) / 10);
    const deci = timeDec - (min * 60 + sec) * 10;

    if (min === 0) {
      return `${sec}:${deci}`;
    }
    if (sec < 10) {
      return `${min}:0${sec}`;
    }
    return `${min}:${sec}`;
  }
  useEffect(() => {
    if (props.isPlaying) {
      const interval = setInterval(() => {
        setDeciSec((old) => old + 1);
      }, 100);
      return () => {
        clearInterval(interval);
      };
    }
  }, [props.isPlaying, props.elapsedTime]);

  useEffect(
    () => {
      setDeciSec(props.elapsedTime);
      setEditMin(currentTime(deciSec)[0]);
      setEditSec(currentTime(deciSec)[1]);
    },
    [props.elapsedTime],
    currentTime
  );

  return (
    <Grid item container justifyContent="center" alignItems="center">
      <Grid item sx={{ pr: 2 }}>
        <IconButton color="primary" sx={{ p: 0 }} onClick={onClickEditTime}>
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid
        item
        sx={{
          borderStyle: 'groove',
          px: 0,
          py: 0,
          borderRadius: 2,
          bgcolor: 'black',
          cursor: 'pointer',
          minWidth: 130,
          maxWidth: 130,
        }}
        onClick={onClickStartStopTimer}
      >
        <Typography color="orange" variant="h3" align="center">
          {formatTime(props.qtrTime)}
        </Typography>
      </Grid>
      <Grid item sx={{ pl: 2 }}>
        <Grid item>
          <IconButton color="primary" sx={{ p: 0 }} onClick={onClickAddSecond}>
            <AddCircle />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            color="primary"
            sx={{ p: 0 }}
            onClick={onClickRemoveSecond}
          >
            <RemoveCircle />
          </IconButton>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleTimerClose}>
        <DialogTitle>
          <Typography align="center">Insérer le temps désiré</Typography>
        </DialogTitle>
        <Grid item container direction="column">
          <Grid item container justifyContent="space-evenly" sx={{ pb: 1 }}>
            <Grid item xs={2}>
              <TextField
                value={displayTextField(editMin)}
                onChange={handleChangeMin}
                color="primary"
                required
                label="Mins"
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                value={displayTextField(editSec)}
                onChange={handleChangeSec}
                color="primary"
                required
                label="Secs"
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                value={displayTextField(editDsec)}
                onChange={handleChangeDsec}
                color="primary"
                label="Décisecs"
              />
            </Grid>
          </Grid>
          <Grid item alignSelf="center" sx={{ pb: 1 }}>
            <Button startIcon={<Check />} onClick={onClickSubmitEdittedTime}>
              <Typography>Valider</Typography>
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
  function displayTextField(value: number) {
    if (value === 0) {
      return '';
    }
    return value;
  }
};
