import React from 'react';
import { render } from 'react-dom';
import './app.css'
import Home from './pages/home';
import Sidebar from './sidebar';
import Header from './header';
import {BrowserRouter as Router, Switch ,Route, Link, Redirect} from 'react-router-dom'
 
// Functional component App
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = React.useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
  )
}

// Render the functional component App into the HTML element with the ID 'app'
const appDivs = document.getElementById("apps");
render(<App/>, appDivs);