import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import './App.css';
import HomePage from './pages/HomePage.js'
import ListPage from './pages/ListPage.js'
import DataPage from './pages/DataPage.js'
import DashboardPage from './pages/DashboardPage.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/interesting_finds' component={ListPage} />
          <Route exact path='/interesting_finds/:findID' component={DataPage} />
          <Route exact path='/data' component={DashboardPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
