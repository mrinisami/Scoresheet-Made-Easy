import { AddCircle } from '@mui/icons-material';
import {
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';

interface LineupChangeProps {
  addPlayer: (
    playerId: string,
    playerName: string,
    playerNumber: number,
    playerFirstName: string,
    playerLastName: string
  ) => void;
  removePlayer: (playerId: string) => void;
}

export default (props: LineupChangeProps) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [number, setNumber] = useState(-1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const randomId = (Math.random() + 1).toString(36).substring(2);
  const fullName = `${firstName} ${lastName}`;
  const onClickAdd = () => {
    setOpenAdd(true);
  };
  const onClickAddClose = (
    playerId: string,
    playerName: string,
    playerNumber: number,
    playerFirstName: string,
    playerLastName: string
  ) => {
    setOpenAdd(false);
    if (!(number === -1 || firstName === '' || lastName === '')) {
      props.addPlayer(
        playerId,
        playerName,
        parseInt(playerNumber),
        playerFirstName,
        playerLastName
      );
    }
  };
  const handleNumberInput = (event) => {
    setNumber(event.target.value);
  };
  const handleClose = () => {
    setOpenAdd(false);
  };
  const handleFirstNameInput = (event) => setFirstName(event.target.value);

  const handleLastNameInput = (event) => setLastName(event.target.value);

  return (
    <Grid item container>
      <Grid item sx={{ pt: 1, pr: 1 }}>
        <Button startIcon={<AddCircle />} onClick={onClickAdd}>
          <Typography>Ajouter un joueur</Typography>
        </Button>
      </Grid>
      <Dialog open={openAdd} onClose={handleClose}>
        <DialogTitle>Écrivez le nom et numéro du joueur</DialogTitle>
        <Grid item container direction="column" rowSpacing={2}>
          <Grid item container justifyContent="space-evenly">
            <Grid item xs={2}>
              <TextField
                value={number}
                label="Numéro"
                required
                onChange={handleNumberInput}
                color="primary"
              >
                <Typography>Numéro</Typography>
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                value={firstName}
                label="Prénom"
                required
                onChange={handleFirstNameInput}
              >
                Prénom
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                value={lastName}
                label="Nom"
                required
                onChange={handleLastNameInput}
              >
                Nom
              </TextField>
            </Grid>
          </Grid>
          <Grid item alignSelf="center" sx={{ pb: 1 }}>
            <Button
              variant="outlined"
              onClick={() =>
                onClickAddClose(randomId, fullName, number, firstName, lastName)
              }
            >
              <Typography>Soumettre</Typography>
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
};
