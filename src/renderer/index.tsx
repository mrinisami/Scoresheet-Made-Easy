import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider, useSelector } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import ThemePv from 'ui/ThemePv';
import App from './foundation/Router';
import { store } from './Store/store';

// const theme = useSelector((state) => state.scoresheet.ThemeColor);

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ThemePv>
      <CssBaseline />
      <HashRouter>
        <App />
      </HashRouter>
    </ThemePv>
  </Provider>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
