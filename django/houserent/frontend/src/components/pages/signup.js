import { render } from 'react-dom';
import '../signup.css'
import NavBar from '../Nav';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
/*
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here, e.g., send form data to the server
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

*/
const SignUp=()=>{
  
  const history = useHistory()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [booleanFields, setBooleanFields] = useState({
    is_agent: false,
    is_tenant: false,
    is_landlord: false,
  });
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  
  const handleBooleanChange = (fieldName) => {
    setBooleanFields((prevFields) => ({
      ...prevFields,
      [fieldName]: !prevFields[fieldName],
    }));
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const value1 = {
      name: formData.username,
      email: formData.email,
      password:formData.password,
      confirmPassword:formData.confirmPassword,
      is_agent:booleanFields.is_agent,
      is_landlord:booleanFields.is_landlord,
      is_tenant:booleanFields.is_tenant,
      gender: selectedOption
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json",
     },
      body: JSON.stringify(
       value1
      ),
    };
    fetch("/api/register_form", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        history.push("/sign-in"); 

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
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br/>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autocomplete="current-password"
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Select gender:
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Choose an option</option>
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </label>
      <br/>
       <label>
        is_agent:
        <input
          type="checkbox"
          checked={booleanFields.is_agent}
          onChange={() => handleBooleanChange('is_agent')}
        />
      </label>
      <br />
      <label>
        is_landlord:
        <input
          type="checkbox"
          checked={booleanFields.is_landlord}
          onChange={() => handleBooleanChange('is_landlord')}
        />
      </label>
      <br />
      <label>
        is_tenant:
        <input
          type="checkbox"
          checked={booleanFields.is_tenant}
          onChange={() => handleBooleanChange('is_tenant')}
        />
      </label>
      <button type="submit">Register</button>
    </form>
                </div>
               
            </div>
            <div className='section3'>
                <p>if you have already an account &nbsp;<span>
                    sign-in</span></p>
            </div>
         </div>
         </div>
        </div>
    );
}
export default SignUp;
