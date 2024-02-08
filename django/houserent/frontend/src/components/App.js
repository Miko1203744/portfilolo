import React from 'react';
import { render } from 'react-dom';
import NavBar from './Nav';
import Home from './pages/home';
import About from './pages/About';
import HouseDetail from './pages/housedetail';
import Service from './pages/Service';
import Property from './pages/Property';
import SignIn from './pages/signin';
import Notfications from './pages/notfication';
import Agent from './pages/agent';
import Profile from './pages/profile';
import SignUp from './pages/signup';
import HouseTypePage from './pages/HouseTypePage';
import Contact from './pages/Contact';
import Property_agent from './pages/property-agent';
import Property_list from './pages/property-list';
import {BrowserRouter as Router, Switch ,Route, Link, Redirect} from 'react-router-dom'
import AddHome from './pages/addhome';
import HomePhoto from './pages/homephoto';
 
// Functional component App
const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route  path="/" exact component={Home}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/service" component={Service}></Route>
        <Route path="/property" component={Property}></Route>
        <Route path="/contact" component={Contact}></Route>
        <Route path="/sign-up" component={SignUp}></Route>
        <Route path="/sign-in" component={SignIn}></Route>
        <Route path="/property-list" component={Property_list}></Route>
        <Route path="/property-agent" component={Property_agent}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/house/:type" component={HouseTypePage} />
        <Route path="/addhome" component={AddHome} />
        <Route path="/housedetail/:house_id" component={HouseDetail}></Route>
        <Route path="/add_photo/:house_id" component={HomePhoto} />
        <Route path="/Notfication" component={Notfications}></Route>
        <Route path="/Agent" component={Agent}></Route>
      </Switch>
    </Router>
  )

};

// Render the functional component App into the HTML element with the ID 'app'
const appDiv = document.getElementById("app");
render(<App/>, appDiv);