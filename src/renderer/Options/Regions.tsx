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
import { useEffect, useState } from 'react';
import { allOptionsKeys } from '../../../resources/selection';
import { leagueIds } from '../../../resources/league_id';
import Sections from './Sections';

export default (props) => {
  const [alignment, setAlignment] = useState<string | null>();
  const [region, setRegion] = useState(null);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    setRegion(newAlignment);
  };
  useEffect(() => {
    setRegion(null);
    setAlignment(null);
  }, [props.root]);

  function renderNextStep() {
    if (region === null) {
      return (
        <Grid item container justifyContent="center">
          <Typography align="center">
            Vous devez sélectionner une région
          </Typography>
        </Grid>
      );
    }

    return (
      <Grid item container>
        <Sections data={props.data[region]} root={region} />
      </Grid>
    );
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid container item justifyContent="center">
          <Grid
            item
            sx={{ border: 'solid grey', width: '50%', borderRadius: '20px' }}
          >
            <Typography variant="h6" align="center">
              Choisir la région
            </Typography>
          </Grid>
        </Grid>
        <Grid container item justifyContent="center">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleAlignment}
          >
            {Object.keys(props.data).map((reg, i) => (
              <ToggleButton key={i} value={reg}>
                <Typography>{reg}</Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
        {renderNextStep()}
      </Grid>
    </Container>
  );
};
