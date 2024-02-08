import React from 'react';
import { render } from 'react-dom';
import './property.css'
import {NavLink} from 'react-router-dom'
const Property_nav=()=>{
return(
    <div className='property_list'>
    <div>
    <NavLink to="/property" activeClassName="active">property type</NavLink>
    </div>
    <div>
    <NavLink to="/property-list" activeClassName="active">property list</NavLink>
    </div>
    <div>
    <NavLink to="/property-agent" activeClassName="active">property agent</NavLink>
    </div>
</div>
)
}

export default Property_nav