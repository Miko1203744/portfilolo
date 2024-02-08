import React from 'react';
import { render } from 'react-dom';
import '../signin.css'
import NavBar from '../Nav';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
const SignIn=()=>{
  const [csrfToken, setCsrfToken] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        password: '',

    });
   

    React.useEffect(() => {
      const fetchCSRFToken = async () => {
        try {
          const response = await fetch('/get_csrf_token/');
          const data = await response.json();
          setCsrfToken(data.csrfToken);
          localStorage.setItem('csrftoken', data.csrfToken);
          
        } catch (error) {
          console.error('Error fetching CSRF token:', error);
        }
      };
      fetchCSRFToken();
    }, []);
    
    
    const history = useHistory()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const formDatas = {
          username: formData.username, // Replace 'ss' with the actual username
          password: formData.password, // Replace '804510@#' with the actual password
        };
        const requestOptions = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken,  //Include the CSRF toke
            },
            body: JSON.stringify(formDatas),
         };
         fetch("/api/login_form", requestOptions)
         .then((response) => {
          if (response.ok) {
            localStorage.setItem('authenticated', 'true');
            return response.json();  // Return the promise
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then((data) => { 
          // Use history.push for navigation
          window.location.href = data.redirect;
        })
        .catch((error) => {
          // Handle fetch error - network issues, etc.
          console.error("Error:", error);
        });
        }
    return(
        <div className="signup-cont">
        <NavBar/>
        <div className='cont1'>
        <div className='cont-inside'>
           <div className='section1'>

           </div>
           <div className='section2'>
               <h1>Dive a head first in to success</h1>
               <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
               <div style={{display:"flex", gap:"50px"}}>
               <div>sign  with gmail</div>
               <div>sign with facebook</div>
               </div>
               <div>
               <form onSubmit={handleSubmit}>
         
     <label>
       Usernames:
       <input
         type="text"
         name="username"
         value={formData.username}
         onChange={handleChange}
         autocomplete="username"
       />
     </label>
     <br/>
     <label>
       passwords:
       <input
         type="password"
         name="password"
         value={formData.password}
         onChange={handleChange}
         autocomplete="current-password"
       />
     </label>
     <br/>
     <button type="submit">Login</button>
     </form>
     </div>
     
     </div>
     </div>
     </div>
     </div>
    )
};

export default SignIn
