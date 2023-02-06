import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import AppTable from './AppTable';

export default () => {
  const players = useSelector((state) => state.scoresheet.homeTeam);
  const team = useSelector((state) => state.scoresheet.homeTeam.TeamId);
  const navigate = useNavigate();
  const onClickListOfGames = () => {
    navigate(`/Calendar2/${team}`);
  };
  const onClickHome = () => {
    navigate('/');
  };
  return <AppTable />;
};
