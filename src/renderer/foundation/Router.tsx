import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from 'renderer/Home/Home';
import Scoresheet from 'renderer/Scoresheet/Scoresheet';
import Options from 'renderer/Options/Options';
import Calendar2 from 'renderer/Calendar/Calendar2';
import App from 'renderer/Scoresheet/ModificationApp/App';
import SideBar from 'renderer/Navigation/SideBar';
import { Grid, ThemeProvider, CssBaseline } from '@mui/material';
import { useAppSelector } from 'renderer/Store/hooks';
import ThemePv from 'ui/ThemePv';

export default () => {
  return (
    <Grid
      container
      sx={{ minHeight: '100vh' }}
      justifyContent="stretch"
      columns={36}
    >
      <Grid item xs={1}>
        <SideBar />
      </Grid>
      <Grid item xs={35} sx={{ px: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Scoresheet/:gameId/:timeOfGame"
            element={<Scoresheet />}
          />
          <Route path="/Options" element={<Options />} />
          <Route path="/Calendar/:teamId" element={<Calendar2 />} />
          <Route path="/App" element={<App />} />
        </Routes>
      </Grid>
    </Grid>
  );
};
