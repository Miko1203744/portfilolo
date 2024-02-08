import React from 'react';
import { render } from 'react-dom';
import NavBar from '../Nav';
import '../property.css';
import Property_nav from '../property-nav';
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
const Property_list=()=>{
const [houses,sethouses]=React.useState([])
React.useEffect(() => {
    fetch('/api/houses') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => sethouses(data))
      .catch(error => console.log(error));
  }, []);
console.log(houses)
const house=houses.map((x,index)=>{
    return (<div className='p_list_b'>
    <img src={x.house_image}/>
    <p>cfghfgdfjgf</p>
    <div style={{display:"flex",marginTop:"5px",marginBottom:"5px"}}>
        <div style={{flex:"0.5"}}>$&nbsp;1200</div>
        <div style={{flex:"0.5"}}>for rent</div>
    </div>
    <div style={{display:"flex"}}>
        <div style={{flex:"0.5"}}></div>
        <div style={{flex:"0.5"}}><i class="fa-solid fa-location-dot"></i>addis abeba</div>
    </div>
    <div style={{display:"flex",gap:"20px" ,marginLeft:"10px",marginTop:"10px"}}>
        <div>
        <i class="fa-solid fa-kitchen-set"></i>
            <p>kitchen</p>
        </div>
        <div>
        <i class="fa-solid fa-bed"></i>
            <p>bedroom</p>
        </div>
        <div>
        <i class="fa-solid fa-bath"></i>
            <p>bathroom</p>
        </div>
    </div>
    </div>)
  })
return(
    <div>
        <div>
   <NavBar/>
   <Property_nav/>
   <div className='p_list'>
    <img src="../../static/images/R.jpeg"/>
    <h1>property List</h1>
   </div>
   <div className='p_list1'>
   {house}
    </div>
   </div>
   <p style={{textAlign:"center",marginTop:"20px"}}><a>1&nbsp;&nbsp;</a><a>2&nbsp;&nbsp;</a><a>3&nbsp;&nbsp;</a><a>4&nbsp;&nbsp;</a></p>
   </div>
)
}


export default Property_list