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
import Sexes from './Sexes';

export default (props) => {
  const [alignment, setAlignment] = useState();
  const [category, setCategory] = useState(null);
  const [isCategory, setIsCategory] = useState();

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    setCategory(newAlignment);
  };
  useEffect(() => {
    setCategory(null);
  }, [props.root]);

  function renderNextStep() {
    if (category === null) {
      return (
        <Grid item container justifyContent="center">
          <Typography align="center">
            Vous devez choisir une catégorie en premier
          </Typography>
        </Grid>
      );
    }

    return (
      <Grid container item>
        <Sexes
          data={props.categories[category]}
          root={{ cat: category, ageGroup: props.root }}
        />
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
              Choisir la catégorie
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
            {Object.keys(props.categories).map((el, i) => (
              <ToggleButton key={i} value={el}>
                <Typography>{el}</Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
        {renderNextStep()}
      </Grid>
    </Container>
  );
};
