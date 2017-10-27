import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import Categories from './Categories';

const App = () => (
  <div>
    <NavLink to="/categories">Latest</NavLink>
    <Switch>
      <Route path="/categories" component={Categories} />
    </Switch>
  </div>
);

export default App;
