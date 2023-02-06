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
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addTeam } from 'renderer/States/scoresheet';
import { useState } from 'react';
import useAxios from 'axios-hooks';

export default (props) => {
  const navigate = useNavigate();
  const onClickSubmit = () => {
    navigate(`/Calendar/${props.data}`);
  };

  return (
    <Container>
      <Grid item container justifyContent="center" sx={{ pt: 2 }}>
        <Button onClick={onClickSubmit} variant="contained">
          Soumettre
        </Button>
      </Grid>
    </Container>
  );
};
