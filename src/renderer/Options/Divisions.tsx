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
import Teams from './Teams';
import Regions from './Regions';
import Sections from './Sections';

export default (props) => {
  const [alignment, setAlignment] = useState();
  const [division, setDivision] = useState(null);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    setDivision(newAlignment);
  };
  useEffect(() => {
    setDivision(null);
    setAlignment();
  }, [props.root]);

  function renderNextStep() {
    console.log(props.root);
    console.log(division);
    if (division === null) {
      return (
        <Grid item container justifyContent="center">
          <Typography align="center">
            Vous devez sélectionner une division
          </Typography>
        </Grid>
      );
    }

    if (typeof props.data[division] === 'string') {
      return (
        <Grid item container>
          <Teams leagueId={props.data[division]} />
        </Grid>
      );
    }
    if (division === 'Division 3') {
      return (
        <Grid item container>
          <Regions data={props.data[division]} root={division} />
        </Grid>
      );
    }
    if (props.root.ageGroup === 'Secondaire' && props.root.cat === 'Cadet') {
      return (
        <Grid item container>
          <Sections data={props.data[division]} root={division} />
        </Grid>
      );
    }
    if (
      props.root.ageGroup === 'Secondaire' &&
      props.root.cat === 'Juvénile' &&
      division === 'Division 2'
    ) {
      return (
        <Grid item container>
          <Sections data={props.data[division]} root={division} />
        </Grid>
      );
    }
    return (
      <Grid item container>
        <Regions data={props.data[division]} root={division} />
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
              Choisir la division
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
            {Object.keys(props.data).map((div, i) => (
              <ToggleButton key={i} value={div}>
                <Typography>{div}</Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
        {renderNextStep()}
      </Grid>
    </Container>
  );
};
