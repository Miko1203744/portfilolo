import React from 'react';
import NavBar from '../Nav';
import { render } from 'react-dom';
import '../about.css'
const About=()=>{
    return(
 <div>
    <NavBar/>
<div className='container-2'>
    <div className='row1-1'>
    <img src={`../../static/images/house2img5.webp`} style={{width:"600px", height:"300px"}}/>
    </div>
    <div className='row1-2'>
     <h1>OURGOAL</h1>
     <p>ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnnnnnnnnnnn</p>
    </div>
</div>
<div className='container-3'>
    <div className='row1-1'>
    <h1>OURMISSION</h1>
     <p>gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnnnnnnnnnnn</p>
    </div>

    <div className='row1-2'>
    <img src={`../../static/images/house2img5.webp`} style={{width:"600px", height:"300px"}}/>
    </div>
</div>
<div className='container-2'>
    <div className='row1-1'>
    <img src={`../../static/images/house2img5.webp`} style={{width:"600px", height:"300px"}}/>
    </div>
    <div className='row1-2'>
     <h1>OURSTORY</h1>
     <p>ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnnnnnnnnnnn</p>
    </div>
</div>
</div>
    )
};

export default About
