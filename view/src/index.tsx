import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './style/index.css';
import { initializeIcons } from '@uifabric/icons';

import { loadTheme } from 'office-ui-fabric-react';

initializeIcons();
loadTheme({
    palette: {
      themePrimary: '#0674f5',
      themeLighterAlt: '#f5f9ff',
      themeLighter: '#d6e8fd',
      themeLight: '#b2d4fc',
      themeTertiary: '#67abf9',
      themeSecondary: '#2285f6',
      themeDarkAlt: '#0469dc',
      themeDark: '#0459ba',
      themeDarker: '#034189',
      neutralLighterAlt: '#faf9f8',
      neutralLighter: '#f3f2f1',
      neutralLight: '#edebe9',
      neutralQuaternaryAlt: '#e1dfdd',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c6c4',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
    }});


ReactDOM.render(<App />, document.getElementById('app'));
