import {
  Grid,
  ListItemButton,
  ListItemText,
  Collapse,
  List,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

export default (props) => {
  const [openMode, setOpenMode] = useState(false);

  const handleClickMode = () => setOpenMode(!openMode);

  return (
    <Grid item>
      <List>
        <ListItemButton onClick={handleClickMode}>
          <ListItemText primary="Mode" />
          {openMode ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openMode} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Safe Mode" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Pro Mode" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Grid>
  );
};
