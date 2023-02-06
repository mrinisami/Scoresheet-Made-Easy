import { Tabs, Tab, Drawer, IconButton, Grid, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TableViewIcon from '@mui/icons-material/TableView';
import RemoveIcon from '@mui/icons-material/Remove';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import { useNavigate, useLocation } from 'react-router-dom';
import { statSelector } from 'renderer/States/scoresheet';
import { useAppSelector } from 'renderer/Store/hooks';
import { useDispatch } from 'react-redux';
import { changeThemeColor } from 'renderer/States/Theme';
import ThemeOptions from './ThemeOptions';

export default () => {
  const { pathname } = useLocation();
  const navData = useAppSelector((state) =>
    statSelector.navigateData(state.scoresheet)
  );
  const team = useAppSelector((state) => state.scoresheet.homeTeam.TeamId);
  const game = useAppSelector((state) => state.scoresheet.GameId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setThemeColor = (color: string) => {
    dispatch(changeThemeColor(color));
  };

  return (
    <Paper sx={{ minHeight: '100vh' }}>
      <Grid
        container
        direction="column"
        sx={{ minHeight: '100vh' }}
        justifyContent="space-between"
      >
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          rowSpacing={2}
        >
          <Grid item>
            <IconButton
              color={pathname === '/' ? 'primary' : undefined}
              onClick={() => navigate('/')}
            >
              <HomeIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <RemoveIcon sx={{ fontSize: 30 }} color={undefined} />
          </Grid>

          <Grid item>{renderIconCalendar()}</Grid>
          <Grid item>{renderIconScoresheet()}</Grid>
          <Grid item>{renderIconScoreboard()}</Grid>
        </Grid>
        <Grid item container justifyContent="center">
          <Grid item>
            <ThemeOptions changeThemeColor={setThemeColor} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
  function renderIconCalendar() {
    if (typeof team !== 'string') {
      return <CalendarMonthIcon color={undefined} />;
    }
    return (
      <IconButton
        color={pathname.startsWith('/Calendar') ? 'primary' : undefined}
        onClick={() => navigate(`/Calendar/${navData.teamId}`)}
      >
        <CalendarMonthIcon />
      </IconButton>
    );
  }
  function renderIconScoresheet() {
    if (typeof game !== 'string') {
      return <TableViewIcon color={undefined} />;
    }
    return (
      <IconButton
        color={pathname.startsWith('/Scoresheet') ? 'primary' : undefined}
        onClick={() => navigate(`/Scoresheet/${navData.gameId}/Total`)}
      >
        <TableViewIcon />
      </IconButton>
    );
  }
  function renderIconScoreboard() {
    if (typeof game !== 'string') {
      return <ScoreboardIcon color={undefined} />;
    }
    return (
      <IconButton
        color={pathname.startsWith('/App') ? 'primary' : undefined}
        onClick={() => navigate(`/App`)}
      >
        <ScoreboardIcon sx={{ fontSize: 30 }} />
      </IconButton>
    );
  }
};
