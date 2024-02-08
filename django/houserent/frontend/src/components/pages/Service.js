import React from 'react';
import { render } from 'react-dom';
import NavBar from '../Nav';
import '../service.css'
import { Swiper, SwiperSlide} from 'swiper/react';
import {  Navigation,Pagination, Scrollbar, A11y, EffectCube,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const Service=()=>{
    return(
        <div>
        <NavBar/>
        <div className='video_cont'>
        <video  src='../../static/videos/video.mp4'  autoPlay loop muted />
        <h1 className='text-2'>Our &nbsp; Services</h1>
       </div> 
      <h1 style={{textAlign:"center",marginTop:"100px",fontWeight:"bold"}}>list of service that we offer </h1> 
      <Swiper className='r'
       modules={[Navigation, Pagination, Scrollbar]}
       spaceBetween={50}
       slidesPerView={2}
       navigation
       pagination={{ clickable: true }}
       scrollbar={{ draggable: true }}
       onSlideChange={() => console.log('slide change')}
       onSwiper={(swiper) => console.log(swiper)}
       
>
  <SwiperSlide >
 <div><img src="../../static/images/t.jpeg"  style={{height:"200px",width:"200px",borderRadius:"30px"}} alt="dhgfdfhg"/>
 <h3>efficent supply rent houses</h3>
  <p>.provide house that fit to our customer need</p>
    </div> </SwiperSlide>
    <SwiperSlide style={{height:"200px",width:"200px"}}>
 <div><img src="../../static/images/aksa.jpeg" height={"200px"} width={"200px"} style={{borderRadius:"30px"}} alt="dhgfdfhg"/>
 <h3>succesfull introduce your house if you are landlord </h3>
  <p>.let landlord to display the house that they offer for rent</p>
    </div> </SwiperSlide>
    <SwiperSlide>
 <div><img src="../../static/images/x.jpg" height={"200px"} width={"200px"} style={{borderRadius:"30px"}} alt="dhgfdfhg"/>
 <h3>we provide seamless environment for agents</h3>
  <p>3</p>
    </div> </SwiperSlide>

    </Swiper>

    <div className='fotter'>
    <div className='list-1'>
   <ul style={{ listStyle:"none"}}>
   <li style={{textDecoration:"underline"}}>lists</li>
    <li>
      Home
    </li>
    <li>
     About
    </li>
    <li>Service</li>
    <li>Contact</li>
   </ul>
    </div>
    <div className='list-2'>
<ul style={{ listStyle:"none"}}>
  <li style={{textDecoration:"underline"}}>SocialMedia</li>
<li>
     facebook
    </li>
    <li>
      linkedn
    </li>
    <li>whatsapp</li>
</ul>
    </div>
    <div className='list-3' >
      <ul style={{ listStyle:"none"}}>
      <li style={{textDecoration:"underline"}}>Info</li>
      <li>
     phone:+25909271567
    </li>
    <li>
     email:mikwossen@gmail.com
    </li>
    <li>
      city:addisAbeba Ethiopia 
    </li>
      </ul>

    </div>
   </div>
        </div>

    )
};

export default Service
