import {
  Button,
  TextField,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  IconButton,
} from '@mui/material';

import { useState } from 'react';

import DoneIcon from '@mui/icons-material/Done';

interface NumberProps {
  number: number;
  id: string;
  updateNumber: (playerId: string, number: number) => void;
}

export default (props: NumberProps) => {
  const [number, setNumber] = useState(props.number);
  const [openNumber, setOpenNumber] = useState(false);
  const handleCloseNumber = () => {
    setOpenNumber(false);
  };

  const handleNumberInput = (event) => {
    setNumber(event.target.value);
  };
  const onClickConfirm = () => {
    setOpenNumber(false);
    props.updateNumber(props.id, number);
  };

  return (
    <Grid item container direction="column" alignItems="center">
      <Grid item onClick={() => setOpenNumber(true)} sx={{ cursor: 'pointer' }}>
        <Typography>{number}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Dialog onClose={handleCloseNumber} open={openNumber} maxWidth="xs">
          <DialogTitle># Joueur</DialogTitle>
          <TextField
            label="number"
            variant="filled"
            value={number}
            onChange={handleNumberInput}
          />
          <IconButton onClick={onClickConfirm} color="primary">
            <DoneIcon />
          </IconButton>
        </Dialog>
      </Grid>
    </Grid>
  );
};
