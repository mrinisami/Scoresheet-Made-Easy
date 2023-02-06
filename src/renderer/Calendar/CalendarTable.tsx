import useAxios from 'axios-hooks';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Box,
  IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { ProgressPlugin } from 'webpack';
import { Team } from '../api';

function MatchRow(props: MatchRowProps) {
  const navigate = useNavigate();
  const vScore = props.game.VisitingTeamScore;
  const hScore = props.game.HomeTeamScore;

  const gameScore = () => {
    if (hScore < 0) {
      return <TableCell />;
    }
    const gameResults = `${vScore} - ${hScore}`;
    return (
      <TableCell>
        <Grid item sx={{ borderStyle: 'groove', borderRadius: 8, py: 1 }}>
          <Typography fontWeight="bold" align="center">
            {gameResults}
          </Typography>
        </Grid>
      </TableCell>
    );
  };
  const showSS = () => {
    if (hScore < 0) {
      return (
        <TableCell>
          <IconButton
            onClick={onClickViewScoresheet}
            color="primary"
            size="large"
          >
            <AssignmentIcon />
          </IconButton>
        </TableCell>
      );
    }
    return <TableCell />;
  };
  const onClickViewScoresheet = () => {
    navigate(`/Scoresheet/${props.game.GameId}/Total`);
  };

  return (
    <TableRow>
      <TableCell>
        <Typography>{props.game.GameDayOfWeek}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.game.GameDateFormatted}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.game.GameTimeFormatted}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.game.VisitingTeamName}</Typography>
      </TableCell>
      {gameScore()}
      <TableCell>
        <Typography>{props.game.HomeTeamName}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.game.SportFacilityDescription}</Typography>
      </TableCell>
      {showSS()}
    </TableRow>
  );
}

export default (props) => {
  const navigate = useNavigate();
  const onClickViewSS = () => {
    navigate(`/Scoresheet/${props.games[props.id].GameId}/Total`);
  };
  return (
    <Grid container rowSpacing={5} alignItems="center" direction="column">
      <Grid item alignSelf="stretch">
        <Paper elevation={10}>
          <Grid
            container
            direction="column"
            rowSpacing={3}
            sx={{ borderRadius: '20px' }}
          >
            <Grid item>
              <Typography
                sx={{ fontWeight: 'bold', fontSize: '2rem' }}
                align="center"
              >
                Votre prochain match
              </Typography>
            </Grid>
            <Grid container item justifyContent="space-evenly">
              <Grid item>
                <Typography sx={{ fontSize: '1.2rem' }}>
                  {props.games[props.id].GameDayOfWeek}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: '1.2rem' }}>
                  {props.games[props.id].GameDateFormatted}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: '1.2rem' }}>
                  {props.games[props.id].GameTimeFormatted}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: '1.2rem' }}>
                  {props.games[props.id].VisitingTeamName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: '1.2rem' }}>vs</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: '1.2rem' }}>
                  {props.games[props.id].HomeTeamName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: '1.2rem' }}>@</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: '1.2rem' }}>
                  {props.games[props.id].SportFacilityDescription}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={onClickViewSS}
                  color="primary"
                  size="large"
                >
                  <AssignmentIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold" fontSize="1.5rem">
                    Jour
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold" fontSize="1.5rem">
                    Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold" fontSize="1.5rem">
                    Heure
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold" fontSize="1.5rem">
                    Visiteur
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold" fontSize="1.5rem">
                    Résultat
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold" fontSize="1.5rem">
                    Receveur
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold" fontSize="1.5rem">
                    Lieu
                  </Typography>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {props.games.map((game, i) => (
                <MatchRow key={i} game={game} />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};
