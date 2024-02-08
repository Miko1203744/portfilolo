import { render } from 'react-dom';
import Items from '../items';
import NavBar from '../Nav';
import Header from '../header';
import item from '../item';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import {  Navigation,Pagination, Scrollbar, A11y, EffectCube,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
/*
const HouseList = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/houses/') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setHouses(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>House List</h1>
      {houses.map(house => (
        <div key={house.id}>
          <h2>{house.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default HouseList;
 <div className="swiper-container">
      <div className="swiper-wrapper">
        {slides.map((slide, index) => (
          <div className="swiper-slide" key={index}>
            <img src={`../../static/images/${slide.image}`} alt={slide.caption} />
            <h3>{slide.caption}</h3>
          </div>
        ))}
      </div>
    </div>
      const slides = [
    { image: 'a1.jpg', caption: 'Slide 1' },
    { image: 'a2.jpg', caption: 'Slide 2' },
    { image: 'about.jpg', caption: 'Slide 3' },
  ];
*/

const Home=()=>{
  const [displayedHouses, setDisplayedHouses] = React.useState(8);
  const [Houses, setHouses] = React.useState([]);
  const [houses, sethouses] = React.useState([]);
  const [Agent, setAgent] = React.useState([]);
  const [location, setLocation] = React.useState('');
  const [bedroom, setBedroom] = React.useState('');
  const [maxFee, setMaxFee] = React.useState('');

  const searchHouses = async () => {
      try {
          const queryParams = new URLSearchParams({
              location: location,
              bedroom: bedroom,
              max_fee: maxFee,
          });

          const response = await fetch(`api/houses/search/?${queryParams}`);
          const data = await response.json();

          setHouses(data);
          console.log(data)
      } catch (error) {
          console.error('Error searching houses:', error);
      }
  };

  React.useEffect(() => {
      // Load initial house list
      searchHouses();
  }, []);
  
const handleSeeMoreClick = () => {
    setDisplayedHouses(houses.length);
};
const handleSeeLessClick = () => {
  setDisplayedHouses(8);
};  
 


  React.useEffect(() => {
    fetch('/api/houses') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => sethouses(data))
      .catch(error => console.log(error));
  }, []);
console.log(houses)

React.useEffect(() => {
  fetch('/api/Agent') // Replace with your API endpoint
    .then(response => response.json())
    .then(data => setAgent(data))
    .catch(error => console.log(error));
}, []);
console.log(Agent)

const Agents=Agent.map(x=>(
  <SwiperSlide> 
          <div>
        <div><img src={x.agent_image} style={{width:"300px"}}/></div>
                    <div class="j">
                        <a href="#">agent</a>
                        <p>{x.user.username}</p>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span>{x.agent_phone_number}</span>
                        <p>{x.agent_workdone}</p>
                        
                    </div>
                    </div>
                </SwiperSlide>
                
))
  const house=houses.slice(0,6).map((x,index)=>{
    return (<Items id={x.id}image={x.house_image} grid_area={`img${index+1}`} />)
  })
  const queryhouse=Houses.slice(0,displayedHouses).map((x,index)=>{
    return ( <NavLink to={`housedetail/${x.id}`}>
      <p>location:{x.house_location}</p>
      <img src={x.house_image} style={{width:"100%",height:"200px"}} alt="house_image"></img>
      <p>price:{x.fees_in_birr}birr</p>
    </NavLink>)
  })
    return(

    <div>
   <NavBar/>
    <Header/>
    <h1 className='text-1'> top most wanted property for you</h1>
    <div className='grid-element'>
   {house}
   </div>
   <div className='form-1'>
   <form onSubmit={(e) => { e.preventDefault(); searchHouses(); }}>
                <label>
                    Location:
                    <select value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="">Select Location</option>
                        <option value="mexico">Mexico</option>
                        <option value="amist kilo">5 kilo</option>
                        <option value="shiromeda">Shiromeda</option>
                        {/* Add other location options as needed */}
                    </select>
                </label>

                <label>
                    Bedroom:
                    <input type="text" value={bedroom} onChange={(e) => setBedroom(e.target.value)} />
                </label>

                <label>
                    Max Fee:
                    <select value={maxFee} onChange={(e) => setMaxFee(e.target.value)}>
                        <option value="">Select Max Fee</option>
                        <option value="500">Up to 500</option>
                        <option value="1000">Up to 1000</option>
                        {/* Add other fee options as needed */}
                    </select>
                </label>

                <button type="submit">Search</button>
            </form>
            </div>
            <div className='house_list'>
       {queryhouse}
       {displayedHouses < Houses.length ?(
        <button style={{height:"30px",width:"70px",marginLeft:"200px"}}onClick={handleSeeMoreClick}>See More</button>
      ):(
        <button style={{height:"30px",width:"70px",marginTop:"300px",marginLeft:"200px"}}onClick={handleSeeLessClick}>See Less</button>
      )}
             </div>
  
   <div>
    <h1 style={{textAlign:"center",marginTop:"100px",marginBottom:"100px"}}>list of Agents</h1>
   <div>
      <Swiper className='k'
       modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube,Autoplay]}
       spaceBetween={50}
       slidesPerView={4}
       autoplay={{delay: 2000}}
       loop={true}
       navigation
       pagination={{ clickable: true }}
       scrollbar={{ draggable: true }}
       onSlideChange={() => console.log('slide change')}
       onSwiper={(swiper) => console.log(swiper)}
       
>
{Agents}
  
</Swiper>
</div>
  </div>
  <hr style={{marginTop:"100px",width:"300px"}}/>
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

export default Home