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

const Agent=()=>{
  
    return(

    <div>
   <NavBar/>
    <Header/>
   
    </div>
    )
};

export default Agent