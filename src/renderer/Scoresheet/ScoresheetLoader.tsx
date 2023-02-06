import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addGameData } from 'renderer/States/scoresheet';
import { Team } from '../api';

interface Props {
  children: JSX.Element;
}

export default (props: Props) => {
  const { gameId } = useParams();
  const globalData = useSelector((state) => state.scoresheet);
  const dispatch = useDispatch();
  const [{ data, loading, error }] = useAxios<Team>(
    `http://s1.rseq.ca/api/GameApi/GetGameDiffusion/?gameId=${gameId}`
  );

  if (loading) {
    return <Typography>Loading</Typography>;
  }
  if (error) {
    return <Typography>Tu suces</Typography>;
  }
  if (data) {
    dispatch(
      addGameData({
        data,
        division: globalData.Division,
        ageClass: globalData.AgeClass,
      })
    );

    return <>{props.children}</>;
  }
  return <Typography>Tu suces</Typography>;
};
