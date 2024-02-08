import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import NavBar from '../Nav';
import '../housedetail.css'
import { Swiper, SwiperSlide} from 'swiper/react';
import {  Navigation,Pagination, Scrollbar, A11y, EffectCube,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css';
import { NavLink } from 'react-router-dom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import DatePicker from 'react-datepicker';
const HouseDetail=()=>{
    const { house_id} = useParams();
    const [housedetail,sethousedetail]=useState([])
    const [selectedDate, setSelectedDate] =useState(new Date());
    const [houses,sethouses]=useState([])
    const [photos,setphotos]=useState([])
    const [Agent,setAgent]=useState([])
    const [Tenante,setTenante]=useState(false)
    const [relatehouse,setrelatehouse]=useState([])
    const [csrfToken,setCsrfToken]=useState('')




    React.useEffect(() => {
      const fetchCSRFToken = async () => {
        try {
          const response = await fetch('/get_csrf_token/');
          const data = await response.json();
          setCsrfToken(data.csrfToken);
        } catch (error) {
          console.error('Error fetching CSRF token:', error);
        }
      };
      fetchCSRFToken();
    }, []);


  React.useEffect(() => {
  fetch('/api/random_agent') // Replace with your API endpoint
    .then(response => response.json())
    .then(data =>{setAgent(data);
    console.log(data);
    console.log(data.user);
  })
    .catch(error => console.log(error));
   
}, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      const formDatas = {
        Date: selectedDate, // Replace 'ss' with the actual username
        house_id:house_id,
        agent_id:Agent.agent_info.id
      };
      const requestOptions = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,  //Include the CSRF toke
          },
          body: JSON.stringify(formDatas),
       };
       fetch("../api/CreateViewSchedule", requestOptions)
       .then((response) => {
        if (response.ok) {
          return response.json();  // Return the promise
        } else {
          throw new Error('Network response was not ok');
        }
      })

    }
    useEffect(() => {
        const fetchhousedetail = async () => {
          try {
            const response = await fetch(`../api/housedetail/${house_id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch photos');
            }

            const data = await response.json();
            sethousedetail(data);
            setphotos(data.photos)
            sethouses(data.house)
          } catch (error) {
            console.error('Error fetching photos:', error.message);
          }
        };
    
        fetchhousedetail();
      }, []); 


      React.useEffect(() => {
        // Fetch initial profile data when the component mounts
        const fetchProfile = async () => {
          try {
            const response = await fetch('../api/profile');
      
            if (response.ok) {
              const data = await response.json();
              setTenante(data.is_tenant)
            } else {
              console.error('Error fetching profile:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching profile:', error.message);
          }
        };
        fetchProfile();
      }, []); 
      

      useEffect(() => {
        const relatehouse = async () => {
          try {
            const response = await fetch(`../api/userrelatehouse/${houses.house_location}`);
            if (!response.ok) {
              throw new Error('Failed to fetch photos');
            }

            const data = await response.json();
            setrelatehouse(data);
           console.log(data)
          } catch (error) {
            console.error('Error fetching photos:', error.message);
          }
        };
    
        relatehouse();
      }, [houses]);   
     
     const phot=photos.map((x,index)=>(
       <SwiperSlide><img src={x.image} style={{width:"100%",height:"100%"}} alt="housephoto"/>
       </SwiperSlide>
     ))
     const relathouses=relatehouse.map((x,index)=>(
     <div style={{marginTop:"50px"}}>
      <p>location:{x.house_location}</p>
      <img src={x.house_image} style={{width:"200px"}}alt="relate image"/>
      <p>fees:{x.fees_in_birr }</p>
     </div>
     ))

     const handleDateChange = (date) => {
      setSelectedDate(date);
      // Handle the selected date as needed
      console.log('Selected Date:', date);
    };
  
   
  
    const handleLogout = () => {
      fetch('/api/logouts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,  //Include the CSRF toke
          },
        })
          .then(response=>{
          if (response.ok) {
            localStorage.removeItem('authenticated');
            console.log("a")
            history.push("../sign-in")
            // Handle successful logout (e.g., clear local storage, redirect, etc.)
          } else {
            // Handle logout failure
            console.log("ferror")
          }
        })
        .catch(error => {
          console.log("xerror")
        });
    };
  

   return (
    
    <div>
       
      <NavBar/>
   <div className='house_detail_cont'>
    <div className='house_detail_lis1'>
     <p >related properties</p>
     {relatehouse.length>0?relathouses:(<p>sorry there is no relate house</p>)}
    </div>
    <div className='house_detail_lis2'>
     <p>house photo </p>
     <Swiper className='M'
       modules={[Navigation, Pagination, Scrollbar]}
       spaceBetween={50}
       slidesPerView={1}
       navigation
       pagination={{ clickable: true }}
       scrollbar={{ draggable: true }}
       onSlideChange={() => console.log('slide change')}
       onSwiper={(swiper) => console.log(swiper)}
       >
        <SwiperSlide><img src={houses.house_image} style={{width:"100%",height:"100%"}} alt="housephoto"/>
       </SwiperSlide>
        {phot}
       </Swiper>
       <p>house detail:</p>
    </div>
    <div className='house_detail_lis3'>
    <p>price</p>
    <p>feeprice:{houses.fees_in_birr}birr</p>
    {Tenante?(<div style={{marginTop:"50px"}}>
      <div style={{marginBottom:"50px"}}>
        <p>agent information</p>
       <img src={Agent.agent_info.agent_image} style={{width:"100px",height:"100px"}}></img>
       <p>{Agent.agent_info.agent_phone_number}</p>
       <p>{Agent.user}</p>
      </div>
      <p style={{textDecoration:"underline"}}>view Schedule</p>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Select a Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="Click to select a date"
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    </div>):(<div><p>to schedule the house</p><button onClick={handleLogout}>login in as tenante</button></div>
    )}
    </div>
   </div>
    </div>
   )
}

export default HouseDetail