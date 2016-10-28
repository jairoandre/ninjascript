'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
    <Main/>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App/>,
  document.getElementById('main')
);
