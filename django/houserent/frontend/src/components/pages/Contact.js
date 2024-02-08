import React from 'react';
import { render } from 'react-dom';
import NavBar from '../Nav';
import '../property.css';
import Property_nav from '../property-nav';

const Contact=()=>{
    return(
        <div>
            <NavBar/>
        <div className='contact-cont'>
         <h1 style={{paddingTop:"100px",paddingLeft:"100px"}}>GET IN TOUCH</h1>
         <input style={{marginLeft:"100px"}} type="email" placeholder="Email Address"/><br/>
         <input style={{marginLeft:"100px"}} type="text" placeholder="Phone Number"/><br/>
         <input style={{marginLeft:"100px"}} type="text" placeholder="Message"/><br/>
         <input style={{marginLeft:"100px"}} type="submit" value="submit"/>
        </div>
        </div>
    )
};

export default Contact