import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../components/Home';
import UserEdit from '../components/UserEdit';

const RootRouting = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/:id' component={UserEdit}/>
    </Switch>
  </main>
)

export default RootRouting