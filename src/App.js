import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Generos from './components/Generos';
import NewGenres from './NewGenres';
import EditGenres from './EditGenres';
import Series from './components/Series';
import NewSerie from './NewSerie';
import InfoSerie from './InfoSerie';

const Home =() => {
  return (
    <h1>HOME</h1>
  );
}

function App() {

  return (
    <Router>
      <div>
      <Header/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/generos" exact component={Generos} />
        <Route path="/generos/new" exact component={NewGenres} />
        <Route path="/generos/:id" exact component={EditGenres} />
        <Route path="/series/" exact component={Series} />
        <Route path="/series/new" exact component={NewSerie} />
        <Route path="/series/:id" exact component={InfoSerie} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
