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

import { useEffect, useState } from 'react';
import Submit from './Submit';
import Teams from './Teams';

export default (props) => {
  const [alignment, setAlignment] = useState();
  const [section, setSection] = useState(null);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    setSection(newAlignment);
  };
  useEffect(() => {
    setSection(null);
    setAlignment();
  }, [props.root]);
  function renderNextStep() {
    if (section === null) {
      return (
        <Grid item container justifyContent="center">
          <Typography align="center">Vous devez choisir une section</Typography>
        </Grid>
      );
    }
    return (
      <Grid container item>
        <Teams leagueId={props.data[section]} />
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
              Choisir la section
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
            {Object.keys(props.data).map((sec, i) => (
              <ToggleButton key={i} value={sec}>
                <Typography>{sec}</Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
        {renderNextStep()}
      </Grid>
    </Container>
  );
};
