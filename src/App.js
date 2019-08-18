import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Generos from './components/Generos';
import NewGenres from './NewGenres';
import EditGenres from './EditGenres';


const Home =() => {
  return (
    <h1>HOME</h1>
  );
}



function App() {
  const[data, setData] = useState();
  useEffect(() => {
    axios.get('/api').then(res => {
      setData(res.data);
    })
  }, []);

  return (
    <Router>
      <div>
      <Header/>
      <Route path="/" exact component={Home} />
      <Route path="/generos/new" exact component={NewGenres} />
      <Route path="/generos/:id" exact component={EditGenres} />
      <Route path="/generos" exact component={Generos} />
      </div>
    </Router>
  );
}

export default App;
