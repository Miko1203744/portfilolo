import React from 'react';
import { render } from 'react-dom';
import CreateRoomPage from './CreateRoomPage'
import RoomJoinPage from './RoomJoinPage'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom"
// Functional component App
const HomePage = (props) => {
  return(
    <Router>
      <Switch>
        <Route exact path='/'><p>This is the home page</p></Route>
        <Route path='/join' component={RoomJoinPage}></Route>
        <Route path='/create' component={CreateRoomPage}></Route>
      </Switch>
    </Router>
  )
};

export default HomePage;
