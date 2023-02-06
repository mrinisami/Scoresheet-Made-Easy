import { ArrowRight, SettingsPowerRounded } from '@mui/icons-material';
import {
  Drawer,
  Checkbox,
  Grid,
  Button,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Stat } from 'renderer/States/scoresheet';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

interface DesiredProps {
  allStats: Stat[];
  defaultStats: [Stat, boolean][];
  saveWantedStats: (stats: Stat[]) => void;
  displayStat: Record<Stat, string>;
}

export default (props: DesiredProps) => {
  const [open, setOpen] = useState(false);
  const boolList: boolean[] = props.defaultStats.map(
    (stat: [Stat, boolean]) => stat[1]
  );
  const [checked, setChecked] = useState(boolList);
  const onClickOpenDrawer = () => {
    setOpen(true);
  };
  const onClickAddStat = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };
  const onClickSubmit = () => {
    const statToSend = props.allStats.filter((stat, i) => checked[i]);
    props.saveWantedStats(statToSend);
    setOpen(false);
  };
  const handleDrawerClose = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setOpen(false);
  };
  return (
    <>
      <Button startIcon={<ArrowRight />} onClick={onClickOpenDrawer}>
        <Typography>Stats conservées</Typography>
      </Button>
      <Drawer open={open} anchor="top" onClose={handleDrawerClose}>
        <Grid item container>
          {props.allStats.map((stat: Stat, i: number) => (
            <Grid item key={stat}>
              <ListItemButton onClick={() => onClickAddStat(i)}>
                <ListItemIcon>
                  <Checkbox checked={checked[i]} />
                </ListItemIcon>
                <ListItemText primary={props.displayStat[stat]} />
              </ListItemButton>
            </Grid>
          ))}
          <Grid item>
            <ListItemButton onClick={onClickSubmit}>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="Soumettre" />
            </ListItemButton>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};
