import React from 'react';
import { render } from 'react-dom';
import NavBar from '../Nav';
import '../property.css';
import Property_nav from '../property-nav';
const Property_agent=()=>{
    const [Agents,setAgents]=React.useState([])
    React.useEffect(() => {
        fetch('/api/Agent') // Replace with your API endpoint
          .then(response => response.json())
          .then(data => setAgents(data))
          .catch(error => console.log(error));
      }, []);
      console.log(Agents)

  const agent=Agents.map(x=>(
     <div>
    <img src={x.agent_image}/>
    <p>{x.user.username}</p>
    <p>{x.agent_phone_number}</p>
    <p>country:usa</p>
   </div>     
  ))
return(
    <div>
   <NavBar/>
   <Property_nav/>
   <div className='p_list'>
    <img src="../../static/images/t.jpeg"/>
    <h1 style={{color:"red"}}>property Agent</h1>
   </div>
   <div className='agent'>
    {agent}
    
   </div>
   </div>
)
}


export default Property_agent