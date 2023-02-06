import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
  Checkbox,
  Box,
  Stack,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
  Fade,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useEffect } from 'react';
import { allOptionsKeys } from '../../../resources/selection';
import { leagueIds } from '../../../resources/league_id';
import Divisions from './Divisions';

export default (props) => {
  const [alignment, setAlignment] = useState();
  const [sex, setSex] = useState(null);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    setSex(newAlignment);
  };
  useEffect(() => {
    setSex(null);
    setAlignment();
  }, [props.root]);

  function renderNextStep() {
    if (sex === null) {
      return (
        <Grid item container justifyContent="center">
          <Typography align="center">
            Vous devez sélectionner le sexe
          </Typography>
        </Grid>
      );
    }
    return (
      <Grid item sx={{ width: '100%' }}>
        <Divisions data={props.data[sex]} root={{ ...props.root, sex }} />
      </Grid>
    );
  }

  return (
    <Container>
      <Grid
        container
        item
        justifyContent="center"
        spacing={2}
        flexDirection="column"
      >
        <Grid container item justifyContent="center">
          <Grid
            item
            sx={{ border: 'solid grey', width: '50%', borderRadius: '20px' }}
          >
            <Typography variant="h6" align="center">
              Choisir le sexe
            </Typography>
          </Grid>
        </Grid>
        <Grid item container justifyContent="center">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleAlignment}
          >
            {Object.keys(props.data).map((sex, i) => (
              <ToggleButton key={i} value={sex}>
                <Typography>{sex}</Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
        {renderNextStep()}
      </Grid>
    </Container>
  );
};
