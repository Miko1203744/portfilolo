import React from 'react'
import NavBar from '../Nav'
import '../profile.css'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react'
const Profile=()=>{ 
const [username, setusername] = React.useState('');
const [gender, setGender] = React.useState('');
const [landlord,setlandlord]=React.useState(false);
const [agent,setagent]=React.useState(false);

const [phoneNumber, setphoneNumber] = React.useState('');
const [workDone,setworkDone]=React.useState('');

const [image, setImage] = React.useState(null);
const [csrfToken, setCsrfToken] = React.useState('');
const [houses, setHouses] = useState([]);
const [displayedHouses, setDisplayedHouses] = useState(8);
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch('api/UserHouses');
        if (!response.ok) {
          throw new Error('Failed to fetch houses');
        }

        const data = await response.json();
        setHouses(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching houses:', error.message);
      }
    };

    fetchHouses();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

const handleSeeMoreClick = () => {
    setDisplayedHouses(houses.length);
};
const handleSeeLessClick = () => {
  setDisplayedHouses(8);
};
const UsrHouses=houses.slice(0,displayedHouses).map((x,index)=>(
  <NavLink to={`housedetail/${x.id}`}><div>
  <h1>location:{x.house_location}</h1>
  <img src={x.house_image} style={{height:"200px",width:"100%"}}/>
  <p>price:{x.fees_in_birr}</p>
  </div>
  </NavLink>
))
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
  // Fetch initial profile data when the component mounts
  const fetchProfile = async () => {
    try {
      const response = await fetch('api/profile');

      if (response.ok) {
        const data = await response.json();
        setusername(data.user || ''); // Set to empty string if undefined
        setGender(data.gender || ''); // Set to empty string if undefined
        setImage(data.image); // You may need to handle image differently based on your API response
        setlandlord(data.is_landlord)
        setagent(data.is_agent)
      } else {
        console.error('Error fetching profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
  };
  fetchProfile();
}, []); 

React.useEffect(() => {
  // Fetch initial profile data when the component mounts
  const fetchProfile = async () => {
    try {
      const response = await fetch('api/AgentInfo');

      if (response.ok) {
        const data = await response.json();
        setphoneNumber(data.phonenumber || ''); // Set to empty string if undefined
        setworkDone(data.workdone || ''); // Set to empty string if undefined
      } else {
        console.error('Error fetching profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
  };
  fetchProfile();
}, []); 

const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('gender', gender);
      formData.append('image', image);

      const response = await fetch('api/update-profile', {
        method: 'POST',
        headers: {
      'X-CSRFToken': csrfToken,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);  // Handle success message
      } else {
        const errorData = await response.json();
        console.error('Error updating profile:', errorData.error);
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };


  const handleAgentinfo = async () => {
    try {
      const formData = new FormData();
      formData.append('phonenumber', phoneNumber);
      formData.append('workdone', workDone);

      const response = await fetch('api/update_Agent', {
        method: 'POST',
        headers: {
      'X-CSRFToken': csrfToken,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);  // Handle success message
      } else {
        const errorData = await response.json();
        console.error('Error updating profile:', errorData.error);
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

    return(
        <div>
        <NavBar/>
        
       <div className='prof_page_c'>

       </div>
       <div className='prof_img'>
       {image && typeof image === 'string' ? (
    <img
      src={image}
      style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}}
      alt="Profile"
    />
  ) : image && image instanceof File ? (
    <img
      src={URL.createObjectURL(image)}
      style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}}
      alt="Profile"
    />
  ) : (
    <span>No image selected</span>
  )}
       </div>
       <div className='prof_info'>
        <div>
        <label>Usernames:
        <input type="text" value={username} onChange={(e) => setusername(e.target.value)} />
        </label> 
      <br/>
      <label> Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Choose an option</option>
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </label>
    <br/>
      <label>image:
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <br/>
      <button onClick={handleUpdateProfile}>Update&nbsp;Profile</button>
      </div>
      {agent &&
      (<div>
       <label>phone number
        <input type="text" value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)}/>
        </label> 
        <br/>
        <label>workdone
        <input type="text" value={workDone} onChange={(e) => setworkDone(e.target.value)}/>
        </label> 
        <br/>
        <button onClick={handleAgentinfo}>agentInfo</button>
      </div>)}
       </div>
       {landlord && (<div>
       <div style={{textAlign: "center",marginTop:"50px", border:"1px solid black" }}>list of add Houses</div>
       <div className='house_list'>
       {UsrHouses}
       {displayedHouses < houses.length ?(
        <button style={{height:"30px",width:"70px",marginLeft:"200px"}}onClick={handleSeeMoreClick}>See More</button>
      ):(
        <button style={{height:"30px",width:"70px",marginTop:"300px",marginLeft:"200px"}}onClick={handleSeeLessClick}>See Less</button>
      )}
             </div>
       </div>)}
        </div>
    )
}

export default Profile