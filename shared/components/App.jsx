import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import Categories from './Categories';

const App = () => (
  <div>
    <NavLink to="/categories">Categories</NavLink>
    <Switch>
      <Route exact path="/categories" component={Categories} />
    </Switch>
  </div>
);

export default App;
