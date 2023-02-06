import { Grid, Tab, Paper } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default () => {
  const { gameId } = useParams();
  const [value, setValue] = useState('Total');
  const navigate = useNavigate();
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper>
      <TabContext value={value}>
        <Grid item>
          <TabList onChange={handleTabChange}>
            <Tab
              value="Total"
              label="Feuille complète"
              onClick={() => navigate(`/Scoresheet/${gameId}/Total`)}
            />
            <Tab
              value="1"
              label="Stats 1er quart"
              onClick={() => navigate(`/Scoresheet/${gameId}/1`)}
            />
            <Tab
              value="2"
              label="Stats 2e quart"
              onClick={() => navigate(`/Scoresheet/${gameId}/2`)}
            />
            <Tab
              value="HalfTime"
              label="Stats mi-temps"
              onClick={() => navigate(`/Scoresheet/${gameId}/HalfTime`)}
            />
            <Tab
              value="3"
              label="Stats 3e quart"
              onClick={() => navigate(`/Scoresheet/${gameId}/3`)}
            />
            <Tab
              value="4"
              label="Stats 4e quart"
              onClick={() => navigate(`/Scoresheet/${gameId}/4`)}
            />
          </TabList>
        </Grid>
      </TabContext>
    </Paper>
  );
};
