import { Dialog, DialogTitle } from '@mui/material';

import { useState } from 'react';
import Scoresheet from './Scoresheet';

export default () => {
  const [open, setOpen] = useState(false);
  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClickClose} open={open}>
      <DialogTitle>Feuille de match</DialogTitle>
      <Scoresheet />
    </Dialog>
  );
};
