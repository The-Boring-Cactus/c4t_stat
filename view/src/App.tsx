import React from 'react';
import { Stack, Text, Link, FontWeights,Fabric } from 'office-ui-fabric-react';
import {NavBar} from './components/NavBar'
import {Footer} from './components/Footer'
import {SidebarMenu} from './components/SiderbarMenu'
import {Content} from  './components/Content'
import logo from './logo.png';
import './style/Content.css';
const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};

(window as any).myGrid = null;
(window as any).globaldata = {};
(window as any).currentID = '' ;

export const App: React.FunctionComponent = () => {
  return (
    <Fabric className="App">
    <div className="header">
      <NavBar />
    </div>        
    <div className="body">
      <div className="content">
        <Content />
      </div>
      <div className="sidebar">
        <SidebarMenu />
      </div>      
    </div>
    <div className="footer">
      <Footer />
    </div>
  </Fabric>
  );
};
