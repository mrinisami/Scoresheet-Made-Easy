import {
  Typography,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  List,
  ListItemButton,
  IconButton,
} from '@mui/material';

import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Props {
  bench: string[];
  index: number;
  onAddPlayer: (index: number, playerId: string) => void;
}

export default (props: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setSelectedIndex(null);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  const handleAddPlayer = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    i: number,
    player: string
  ) => {
    setOpen(false);
    props.onAddPlayer(props.index, player);
  };

  return (
    <TableRow>
      <TableCell sx={{ p: 0.5 }}>
        <IconButton onClick={handleClickOpen} color="primary">
          <AddCircleIcon />
        </IconButton>
      </TableCell>
      <Dialog onClose={handleClickClose} open={open}>
        <DialogTitle>Choisir le joueur</DialogTitle>
        <List>
          {props.bench.map((playerInfo, i: number) => {
            return (
              <ListItemButton
                selected={selectedIndex === i}
                onClick={(event) => {
                  handleAddPlayer(event, i, playerInfo.id);
                }}
              >
                <Typography>
                  #{playerInfo.Number} | {playerInfo.Name}
                </Typography>
              </ListItemButton>
            );
          })}
        </List>
      </Dialog>
    </TableRow>
  );
};
