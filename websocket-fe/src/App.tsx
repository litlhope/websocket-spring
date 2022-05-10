import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import './App.css';
import Router from "./Router";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <div id="root-modal" />
    </RecoilRoot>
  );
}

export default App;
