import React from 'react';
import { NavLink } from 'react-router-dom';
const HouseType=(props)=>{
  
    return(
        <NavLink to={`/house/${props.type}`}>
        <div>
        <img src={props.icon}/>
       <p>{props.type}</p>
     </div>
     </NavLink>
    )
};

export default HouseType
