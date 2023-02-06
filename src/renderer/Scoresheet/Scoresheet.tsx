import {
  Grid,
  Container,
  TableBody,
  Table,
  Paper,
  Button,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  statSelector,
  updateWantedStats,
  Stat,
  updateVisitingNumber,
  updateHomeNumber,
  displayStat,
  addHomePlayer,
  addVisitingPlayer,
  updateSortedStats,
  AllStats,
  PlayerStats,
} from 'renderer/States/scoresheet';
import { useAppSelector } from 'renderer/Store/hooks';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import React, { useRef } from 'react';
import { BrowserWindow } from 'electron';
import PlayerTable from './Table';
import ScoresheetLoader from './ScoresheetLoader';
import ScoreHeader from './ScoreHeader';
import DesiredStats from './DesiredStats';
import StatTabs from './StatTabs';
import CreateRow from './ScoresheetRow';
import Tabletest from './tabletest';
import TeamTableHeader from './TeamTableHeader';
import CreateTeamRow from './CreateTeamRow';
import TeamStats from './TeamStats';

export default () => {
  const handlePrint = () => {
    const data = document.getElementById('print');
  };
  const { timeOfGame } = useParams();
  const dispatch = useDispatch();
  const data = useAppSelector((state) => state.scoresheet);

  const { gameId } = useParams();
  const statBool = useAppSelector((state) =>
    statSelector.statChecked(state.scoresheet)
  );
  const gameLoaded = useAppSelector((state) =>
    statSelector.isGameOn(state.scoresheet)
  );
  const updateSort = (colStat: Stat | 'Number') => {
    dispatch(updateSortedStats(colStat));
  };
  const updateStats = (wantedStats: Stat[]) => {
    dispatch(updateWantedStats(wantedStats));
  };
  const addHomeNumber = (playerId: string, number: number) => {
    dispatch(updateHomeNumber({ id: playerId, number }));
  };
  const addVisitingNumber = (playerId: string, number: number) => {
    dispatch(updateVisitingNumber({ id: playerId, number }));
  };
  const addHPlayer = (
    playerId: string,
    name: string,
    number: number,
    firstName: string,
    lastName: string
  ) => {
    dispatch(
      addHomePlayer({ id: playerId, name, number, firstName, lastName })
    );
  };
  const addVPlayer = (
    playerId: string,
    name: string,
    number: number,
    firstName: string,
    lastName: string
  ) => {
    dispatch(
      addVisitingPlayer({ id: playerId, name, number, firstName, lastName })
    );
  };
  const createSorting = (stat: Stat | 'Number', direction: boolean) => {
    if (stat === 'Number') {
      if (direction) {
        return (a, b) => a.Number - b.Number;
      }
      return (a, b) => b.Number - a.Number;
    }
    if (direction) {
      return (a, b) => a.Total[stat] - b.Total[stat];
    }
    return (a, b) => b.Total[stat] - a.Total[stat];
  };
  const orderedHomePlayers: PlayerStats[] = Object.values(
    data.homeTeam.Players
  ).sort(createSorting(data.sortedCol, data.sortOrderAsc));
  const orderedVisitingPlayers: PlayerStats[] = Object.values(
    data.visitingTeam.Players
  ).sort(createSorting(data.sortedCol, data.sortOrderAsc));
  if (gameLoaded && gameId === data.GameId) {
    return renderContent();
  }

  return <ScoresheetLoader>{renderContent()}</ScoresheetLoader>;
  function renderContent() {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        rowSpacing={2}
      >
        <Grid item alignSelf="flex-end">
          <DesiredStats
            allStats={AllStats}
            defaultStats={statBool}
            saveWantedStats={updateStats}
            displayStat={displayStat}
          />
        </Grid>
        <Grid item>
          <StatTabs />
        </Grid>
        <Grid item>
          <Grid item container direction="column" rowSpacing={3}>
            <Grid item>
              <ScoreHeader
                gameDate={data.GameDate}
                gameTime={data.GameTime}
                gameCourt={data.GameCourt}
                homeName={data.homeTeam.Name}
                visitingName={data.visitingTeam.Name}
              />
            </Grid>
            <Grid item>
              <Button onClick={handlePrint}>Print</Button>
            </Grid>
            <Grid item>
              <Paper elevation={20}>
                <Grid item>
                  <TeamTableHeader
                    teamName={data.homeTeam.Name}
                    addPlayer={addHPlayer}
                  />
                  <Table>
                    <Tabletest
                      wantedStats={data.WantedStats}
                      displayStats={displayStat}
                      asc={data.sortOrderAsc}
                      changeSortedCol={updateSort}
                    />
                    <TeamStats
                      orderedPlayers={orderedHomePlayers}
                      timeOfGame={timeOfGame}
                      WantedStats={data.WantedStats}
                      addNumber={addHomeNumber}
                      teamName={data.homeTeam.Name}
                      teamStats={data.homeTeam}
                      playing={data.homeTeam.Playing}
                    />
                  </Table>
                </Grid>
              </Paper>
            </Grid>

            <Grid item>
              <Paper elevation={20}>
                <Grid item>
                  <TeamTableHeader
                    teamName={data.visitingTeam.Name}
                    addPlayer={addVPlayer}
                  />
                  <Table>
                    <Tabletest
                      wantedStats={data.WantedStats}
                      displayStats={displayStat}
                      asc={data.sortOrderAsc}
                      changeSortedCol={updateSort}
                    />
                    <TeamStats
                      orderedPlayers={orderedVisitingPlayers}
                      timeOfGame={timeOfGame}
                      WantedStats={data.WantedStats}
                      addNumber={addVisitingNumber}
                      teamName={data.visitingTeam.Name}
                      teamStats={data.visitingTeam}
                    />
                  </Table>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};
