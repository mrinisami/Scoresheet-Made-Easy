import { Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  updateHomeNumber,
  changeHomePlaying,
  changeVisitingPlaying,
  updateVisitingNumber,
  updateHomePlayerStats,
  statSelector,
  PlayerStats,
  updateVisitingPlayerStats,
  ScoreSheetState,
  displayStat,
  updateQtr,
  updatePossession,
  updateElapsedTime,
  Stat,
  updatePossessionHome,
  updatePossessionVisiting,
  addHomePlaying,
  addVisitingPlaying,
} from '../../States/scoresheet';
import ScoreSheetModifier from '../ScoreSheetModifier';
import Scoreboard from './Scoreboard';

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const percentages = ['FGPerc', 'ThreePerc', 'FTPerc'];
  const data = useSelector((state) =>
    statSelector.BenchPlayers(state.scoresheet)
  );
  const fullState = useSelector((state) => state.scoresheet);
  const homeBench = data[0];
  const homeleftToAdd = data[1];
  const visitingBench = data[2];
  const visitingLeftToAdd = data[3];
  const onCourtHome: string[] = fullState.homeTeam.Playing;
  const onCourtVisiting: string[] = fullState.visitingTeam.Playing;
  const onCourtTotal: number = onCourtHome.length + onCourtVisiting.length;
  const wantedStats = fullState.WantedStats;
  const appStats = wantedStats.filter(
    (stat: string) => !percentages.includes(stat)
  );
  const updateHomeStat = (playerId: string, stat: Stat, value: number) => {
    dispatch(updateHomePlayerStats({ id: playerId, stat, value }));
  };
  const updateVisitingStat = (playerId: string, stat: Stat, value: number) => {
    dispatch(updateVisitingPlayerStats({ id: playerId, stat, value }));
  };
  const changeElapsedTime = (deciSecs: number) => {
    dispatch(updateElapsedTime(deciSecs));
  };
  const changeHomePlayer = (index: number, playerId: string) => {
    dispatch(changeHomePlaying({ index, deleteNb: 1, playerId }));
  };
  const changeVisitingPlayer = (index: number, playerId: string) => {
    dispatch(changeVisitingPlaying({ index, deleteNb: 1, playerId }));
  };
  const addHomePlayer = (index: number, playerId: string) => {
    dispatch(addHomePlaying(playerId));
  };
  const addVisitingPlayer = (index: number, playerId: string) => {
    dispatch(addVisitingPlaying(playerId));
  };
  const addHomeNumber = (playerId: string, number: number) => {
    dispatch(updateHomeNumber({ id: playerId, number }));
  };
  const addVisitingNumber = (playerId: string, number: number) => {
    dispatch(updateVisitingNumber({ id: playerId, number }));
  };
  const qtrChange = (quarter: number) => {
    dispatch(updateQtr(quarter));
  };
  const possessionChangeHome = () => {
    dispatch(updatePossessionHome());
  };
  const possessionChangeVisiting = () => {
    dispatch(updatePossessionVisiting());
  };
  const showButtons = () => {
    if (onCourtTotal < 0) {
      return false;
    }
    return true;
  };
  return (
    <Grid container direction="column" sx={{ pt: 4 }} rowSpacing={3}>
      <Grid item container justifyContent="space-evenly">
        <Grid item>
          <ScoreSheetModifier
            teamName={fullState.homeTeam.Name}
            appStats={appStats}
            onCourt={onCourtHome}
            bench={homeBench}
            players={fullState.homeTeam.Players}
            changePlayer={changeHomePlayer}
            updateStat={updateHomeStat}
            addNumber={addHomeNumber}
            leftToAdd={homeleftToAdd}
            addPlayer={addHomePlayer}
            displayStat={displayStat}
            showButtons={showButtons()}
          />
        </Grid>
        <Grid item>
          <ScoreSheetModifier
            teamName={fullState.visitingTeam.Name}
            appStats={appStats}
            onCourt={onCourtVisiting}
            bench={visitingBench}
            players={fullState.visitingTeam.Players}
            changePlayer={changeVisitingPlayer}
            updateStat={updateVisitingStat}
            addNumber={addVisitingNumber}
            leftToAdd={visitingLeftToAdd}
            addPlayer={addVisitingPlayer}
            displayStat={displayStat}
            showButtons={showButtons()}
          />
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-evenly">
        <Grid item xs={4}>
          <Scoreboard
            qtrTime={fullState.QtrTime}
            homeScore={fullState.homeTeam.Total.Pts}
            visitingScore={fullState.visitingTeam.Total.Pts}
            homeFouls={fullState.homeTeam.Stats[fullState.CurrentQtr - 1].Fouls}
            homeBonus={fullState.homeTeam.Bonus}
            visitingFouls={
              fullState.visitingTeam.Stats[fullState.CurrentQtr - 1].Fouls
            }
            visitingBonus={fullState.visitingTeam.Bonus}
            quarter={fullState.CurrentQtr}
            homePossession={fullState.homeTeam.Possession}
            visitingPossession={fullState.visitingTeam.Possession}
            changeQuarter={qtrChange}
            changePossessionHome={possessionChangeHome}
            changePossessionVisiting={possessionChangeVisiting}
            changeElapsedTime={changeElapsedTime}
            isPlaying={fullState.isMatchLive}
            elapsedTime={fullState.ElapsedTime}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
