import { Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addTeam } from 'renderer/States/scoresheet';
import { addTeamGames } from 'renderer/States/loadingInfo';

interface CalendarLoaderProps {
  children: JSX.Element;
}

export default (props: CalendarLoaderProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const team = useParams().teamId;
  const [{ data, loading, error }] = useAxios(`
  http://s1.rseq.ca/api/TeamApi/GetTeamDiffusion/?teamId=${team}`);

  if (loading) {
    return <Typography>loading</Typography>;
  }
  if (error) {
    return <Typography>Error</Typography>;
  }
  if (data) {
    dispatch(addTeam(data));
    dispatch(addTeamGames(data));
    return <>{props.children}</>;
  }
  return <Typography>Error</Typography>;
};
