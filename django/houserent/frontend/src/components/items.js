import React from 'react';
import { render } from 'react-dom';
import { NavLink } from 'react-router-dom';
const Items=(props)=>{
  
    return(
        <>
      <div style={{gridArea:props.grid_area,borderRadius:"30px"}} className="content" property="forsale">
      <NavLink to={`housedetail/${props.id}`}><img src={props.image} style={{width:'100%',height:'100%'}} className="img_lists"></img></NavLink>
      </div>    
    </>


    )
};

export default Items
