import React from 'react';
import { useReducer } from 'react';
import { render } from 'react-dom';
import {NavLink,useHistory,Link} from 'react-router-dom'
import './nav.css'
const NavBar=()=>{
  const [csrfToken, setCsrfToken] = React.useState('');
  const isAuthenticated = localStorage.getItem('authenticated');
  const history=useHistory();

  const [Notfication,setNotfication]=React.useState('')
  const [profileImage, setProfileImage] = React.useState({});
/*  const username=sessionStorage.getItem('username')

  const [profileImagePath, setProfileImagePath] = React.useState(null);

  React.useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(`/api/user_profile_image/${username}/`);
        const data = await response.json();

        if (response.ok) {
          setProfileImagePath(data.profile_image_path);
        } else {
          console.error('Error:', data.error);
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchProfileImage();
  }, [username]);
*/
React.useEffect(() => {
  const fetchNotfication = async () => {
      try {
          const response = await fetch('/api/Notfication');  // Adjust the API endpoint accordingly
          if (!response.ok) {
              throw new Error('Failed to fetch profile');
          }

          const data = await response.json();
          setNotfication(data);
          console.log(data)
        
      }catch (error) {
        console.error('Error occurred:', error.message);

      }
  };

  fetchNotfication();
}, []);



    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/profile');  // Adjust the API endpoint accordingly
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const data = await response.json();
                setProfileImage(data);
                console.log(data)
            }catch (error) {
              console.error('Error occurred:', error.message);

            }
        };

        fetchProfile();
    }, []);

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
          history.push("/sign-in")
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

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

    return(
        <div>
<div className='nav-container'>
      <div className='cont-inside-1'>
      <div>
          0909271567
</div>
<span style={{color:"white", marginLeft:"5px",marginRight:"5px"}}>|</span>
<div>
          mikwossen@gmail.com
          </div>
      </div>
      <div className='cont-inside-2'>
  
    {isAuthenticated ?(<div><button onClick={handleLogout} >Logout</button>
          </div>):
         ( <div>
        <NavLink to="/sign-in" activeClassName="active">Login</NavLink>
          </div>)}
          <span style={{color:"white", marginLeft:"5px",marginRight:"5px"}}>|</span>
<div>
         <NavLink to="/sign-up" activeClassName="active">register</NavLink>
          </div>
      </div>
      </div>
      <div className='nav-3'>
        <div className='logo'>
         <div className='profile_img_c'>
        <Link to="/profile"><img src={profileImage.image} alt="Profile Image"  width={"100px"} height={"50px"}/></Link>
            {/* Add other profile information as needed */}
         </div>
         <div className='logo_list'>
          BETLEMBOSA
         </div>
        </div>
        <div className='list'>
        <ul>
            <li > <NavLink to="/" exact activeClassName="active">home</NavLink></li>
            <li> <NavLink to="/about" activeClassName="active">about </NavLink></li>
            <li> <NavLink to="/service" activeClassName="active">service </NavLink></li>
            <li> <NavLink to="/property" activeClassName="active">property</NavLink></li>
            <li> <NavLink to="/Notfication" activeClassName="active">Notfication</NavLink></li>
            {profileImage.is_landlord &&(<li> <NavLink to="/addhome" activeClassName="active">addhome</NavLink></li>)}
            <li> <NavLink to="/contact" activeClassName="active">contact </NavLink></li>
            </ul>
        </div>
        <div className='sign-up'>
          <div className='sign-up1' ><NavLink to="/sign-up" activeClassName="active">Sign-up</NavLink></div>
        </div>
      </div>
      </div>

    )
};

export default NavBar
