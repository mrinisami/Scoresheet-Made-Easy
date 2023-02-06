import {
  Grid,
  Typography,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  List,
  ListItemButton,
  IconButton,
} from '@mui/material';

import { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { PlayerStats, Stat } from '../../States/scoresheet';
import NumberEl from '../AddNumber';

interface Props {
  bench: PlayerStats[];
  chosenPlayer: PlayerStats;
  index: number;
  wantedStats: Stat[];
  updateNumber: (playerId: string, number: number) => void;
  onPlayerChange: (index: number, playerId: string) => void;
  onStatChange: (playerId: string, stat: Stat, value: number) => void;
  showButtons: boolean;
}

export default (props: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const formattedName = `${
    props.chosenPlayer.FirstName
  } ${props.chosenPlayer.LastName[1].toUpperCase()}.`;
  const handleChangePlayer = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    i: number,
    playerId: string
  ) => {
    setOpen(false);
    props.onPlayerChange(props.index, playerId);
  };
  const handleClickOpen = () => {
    setOpen(true);
    setSelectedIndex(null);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  const onClickAdd = (stat: Stat) => {
    props.onStatChange(props.chosenPlayer.id, stat, 1);
  };
  const onClickUndo = (stat: Stat) => {
    props.onStatChange(props.chosenPlayer.id, stat, -1);
  };
  return (
    <TableRow>
      <TableCell sx={{ px: 0.5, py: 0 }}>
        <IconButton onClick={handleClickOpen} color="primary" sx={{ p: 0 }}>
          <SwapHorizIcon />
        </IconButton>
      </TableCell>
      <TableCell sx={{ px: 0.5, py: 0.25 }}>
        <NumberEl
          number={props.chosenPlayer.Number}
          updateNumber={props.updateNumber}
          id={props.chosenPlayer.id}
        />
      </TableCell>
      <TableCell sx={{ px: 0.5, py: 0.25 }} style={{ whiteSpace: 'nowrap' }}>
        <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
          {formattedName}
        </Typography>
      </TableCell>
      {props.wantedStats
        .filter((stat) => stat !== 'Pts' && stat !== 'PlusMin')
        .map((stat: Stat) => (
          <TableCell sx={{ px: 0.5, py: 0.25 }}>
            <ElWithButtons
              statName={stat}
              stat={props.chosenPlayer.Total[stat]}
              onClickAdd={onClickAdd}
              onClickUndo={onClickUndo}
              showButtons={props.showButtons}
            />
          </TableCell>
        ))}

      {props.wantedStats.includes('PlusMin') ? (
        <TableCell>
          <Typography>{props.chosenPlayer.Total.PlusMin}</Typography>
        </TableCell>
      ) : (
        <></>
      )}

      <TableCell sx={{ px: 0.5, py: 0.25 }}>
        <Typography>{props.chosenPlayer.Total.Pts}</Typography>
      </TableCell>

      <Dialog onClose={handleClickClose} open={open}>
        <DialogTitle>Choisir le joueur</DialogTitle>
        <List>
          {props.bench.map((playerInfo: PlayerStats, i: number) => {
            return (
              <ListItemButton
                key={playerInfo.id}
                selected={selectedIndex === i}
                onClick={(event) => {
                  handleChangePlayer(event, i, playerInfo.id);
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
interface ElementProps {
  statName: Stat;
  stat: number;
  onClickAdd: (statName: Stat) => void;
  onClickUndo: (statName: Stat) => void;
  showButtons: boolean;
}
function ElWithButtons(props: ElementProps) {
  const [showFoulDialog, setShowFoulDialog] = useState<boolean>(false);
  const handleDialogClose = () => {
    setShowFoulDialog(false);
  };
  const onClickAdd = () => {
    if (
      (props.statName === 'Fouls' && props.stat === 4) ||
      (props.statName === 'Tech' && props.stat === 1)
    )
      setShowFoulDialog(true);
    props.onClickAdd(props.statName);
  };
  const onClickUndo = () => {
    props.onClickUndo(props.statName);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>{showButtonPlus()}</Grid>
      <Grid item>
        <Typography>{props.stat}</Typography>
      </Grid>
      <Grid item>{showButtonMinus()}</Grid>
      <Dialog open={showFoulDialog} onClose={handleDialogClose}>
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }} color="error">
            Fouled Out, player must be ejected
          </Typography>
        </DialogTitle>
      </Dialog>
    </Grid>
  );
  function showButtonPlus() {
    if (props.showButtons) {
      return (
        <IconButton onClick={onClickAdd} color="success" sx={{ p: 0 }}>
          <ArrowDropUpIcon />
        </IconButton>
      );
    }
    return <AddCircleIcon color={undefined} />;
  }
  function showButtonMinus() {
    if (props.showButtons) {
      return (
        <IconButton onClick={onClickUndo} color="error" sx={{ p: 0 }}>
          <ArrowDropDownIcon />
        </IconButton>
      );
    }
    return <RemoveCircleIcon color={undefined} />;
  }
}
