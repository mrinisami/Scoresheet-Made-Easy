import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  themeGreen,
  themeBlue,
  themeBrown,
  themeTeal,
  themePink,
} from '../theme';

interface ThemeOptionsProps {
  changeThemeColor: (color: string) => void;
}

export default (props: ThemeOptionsProps) => {
  const [open, setOpen] = useState(false);
  const onClickOptions = () => {
    setOpen(true);
  };
  const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOpen(false);
  };
  const onClickSetColor = (color: string) => {
    props.changeThemeColor(color);
    setOpen(false);
  };
  return (
    <>
      <IconButton color={undefined} onClick={onClickOptions}>
        <SettingsIcon sx={{ fontSize: 30 }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography>Couleurs de l'application</Typography>
        </DialogTitle>
        <IconButton
          sx={{ color: 'white' }}
          onClick={() => onClickSetColor('default')}
        >
          <CircleIcon />
        </IconButton>
        <IconButton
          sx={{ color: 'black' }}
          onClick={() => onClickSetColor('dark')}
        >
          <CircleIcon />
        </IconButton>
        <IconButton
          sx={{ color: '#455a64' }}
          onClick={() => onClickSetColor('green')}
        >
          <CircleIcon />
        </IconButton>
        <IconButton
          sx={{ color: '#000080' }}
          onClick={() => onClickSetColor('blue')}
        >
          <CircleIcon />
        </IconButton>
        <IconButton
          sx={{ color: '#6d4c41' }}
          onClick={() => onClickSetColor('brown')}
        >
          <CircleIcon />
        </IconButton>
        <IconButton
          sx={{ color: '#00796b' }}
          onClick={() => onClickSetColor('teal')}
        >
          <CircleIcon />
        </IconButton>
        <IconButton
          sx={{ color: '#512da8' }}
          onClick={() => onClickSetColor('pink')}
        >
          <CircleIcon />
        </IconButton>
      </Dialog>
    </>
  );
};
