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
import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';
import { SingleEntryPlugin } from 'webpack';
import Submit from './Submit';
import { League } from '../api';

export default () => {
  return (
    <Container>
      <Grid item container justifyContent="center">
        <Typography>Quel match souhaitez-vous?</Typography>
      </Grid>
    </Container>
  );
};
