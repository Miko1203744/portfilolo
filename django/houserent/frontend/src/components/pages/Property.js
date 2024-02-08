import React from 'react';
import { render } from 'react-dom';
import NavBar from '../Nav';
import '../property.css'
import {NavLink} from 'react-router-dom'
import Property_nav from '../property-nav';
import HouseType from '../HouseType';
const Property=()=>{
   const [houseType, setHouseType] = React.useState([]);

   React.useEffect(() => {
      fetch('/api/HouseType') // Replace with your API endpoint
        .then(response => response.json())
        .then(data => setHouseType(data))
        .catch(error => console.log(error));
    }, []);

  
   
    const houseTypes=houseType.map((x)=>{
      return (<HouseType type={x.type} icon={x.Icon} />)
    })   
    return(
        <div>
            <NavBar/>
            <Property_nav/>
            <div className='type-grids'>
               {houseTypes}
             {/*<div>
                <img src="../../static/images/icon-apartment.png"/>
                <p>apartment</p>
             </div>
             <div>
             <img src="../../static/images/icon-building.png"/>
                <p>building</p>
             </div>
             <div>
             <img src="../../static/images/icon-condominium.png"/>
                <p>condominium</p>
             </div>
           <div>
             <img src="../../static/images/icon-house.png"/>
                <p>cottage</p>
             </div>
             <div>
             <img src="../../static/images/icon-luxury.png"/>
                <p>motel</p>
             </div>
             <div>
             <img src="../../static/images/icon-neighborhood.png"/>
                <p>Dormitory</p>
             </div>
             <div>
             <img src="../../static/images/icon-villa.png"/>
                <p>villa</p>
             </div>
             <div>
             <img src="../../static/images/icon-search.png"/>
                <p>tent</p>
             </div>
             <div>
             <img src="../../static/images/icon-housing.png"/>
                <p>container-house</p>
             </div>
             <div>
             <img src="../../static/images/icon-deal.png"/>
                <p>qallllaE</p>
             </div>*/}
            </div>
        </div>
    )
};

export default Property
