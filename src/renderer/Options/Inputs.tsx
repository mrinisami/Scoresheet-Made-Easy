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
import { useState } from 'react';
import { allOptionsKeys } from '../../../resources/selection';
import { leagueIds } from '../../../resources/league_id';
import Categories from './Categories';
import Sexes from './Sexes';

export default (props) => {
  const [academicLvl, setAcademicLvl] = useState(null);
  const [alignmentAcademic, setAlignmentAcademic] = useState('');
  const [isSecondaire, setIsSecondaire] = useState(false);
  const [isCollegial, setIsCollegial] = useState(false);

  const handleAlignmentAcademic = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignmentAcademic(newAlignment);
    setAcademicLvl(newAlignment);
  };

  const onClickSecondaire = () => {
    setIsSecondaire(!isSecondaire);
  };
  const onClickCollegial = () => {
    setIsCollegial(!isCollegial);
  };
  function renderNextStep() {
    if (academicLvl == null) {
      return (
        <Grid item container justifyContent="center">
          <Typography align="center">
            Vous devez choisir le niveau académique en premier
          </Typography>
        </Grid>
      );
    }
    if (academicLvl === 'Secondaire') {
      return (
        <Grid item sx={{ width: '100%' }}>
          <Categories categories={props.data[academicLvl]} root={academicLvl} />
        </Grid>
      );
    }
    return (
      <Grid item sx={{ width: '100%' }}>
        <Sexes data={props.data[academicLvl]} root={academicLvl} />
      </Grid>
    );
  }

  return (
    <Container>
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Typography align="center" variant="h4">
            Vous devez compléter les étapes suivantes dans le bon ordre:
          </Typography>
        </Grid>

        <Grid item container justifyContent="center" spacing={2}>
          <Grid
            item
            sx={{
              border: 'solid grey',
              width: '50%',
              borderRadius: '20px',
            }}
          >
            <Typography variant="h6" align="center">
              Choisir le niveau académique
            </Typography>
          </Grid>
          <Grid container item justifyContent="center">
            <ToggleButtonGroup
              color="primary"
              value={alignmentAcademic}
              exclusive
              onChange={handleAlignmentAcademic}
            >
              <ToggleButton value="Secondaire" onClick={onClickSecondaire}>
                <Typography>Secondaire</Typography>
              </ToggleButton>
              <ToggleButton value="Collégial" onClick={onClickCollegial}>
                <Typography>Collégial</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {renderNextStep()}
        </Grid>
      </Grid>
    </Container>
  );
};
