import { useState,useEffect } from "react";
import React from 'react';

const Notfications=(props)=>{
    const [Notfication,setNotfication]=useState([])
    const [successMessage, setSuccessMessage] = useState('');
    const [agent,setagent]=useState(false)
    const [landlord,setlandlord]=useState(false)
    const [Tenante,setTenante]=useState(false)
    useEffect(() => {
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
    // Fetch initial profile data when the component mounts
    const fetchProfile = async () => {
      try {
        const response = await fetch('api/profile');
  
        if (response.ok) {
          const data = await response.json();
          setlandlord(data.is_landlord)
          setagent(data.is_agent)
          setTenante(data.is_tenant)
          set
        } else {
          console.error('Error fetching profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      }
    };
    fetchProfile();
  }, []); 


  const handleAccept = (houseId) => {
    fetch(`agent_accept/${houseId}`)
      .then(response => {
        setSuccessMessage('Successfully accepted the viewing request.');
        removeNotification(houseId);
      })
      .catch(error => {
        console.error('Error accepting the request:', error);
      });
  };

  const handleReject = (houseId) => {
    fetch(`agent_reject/${houseId}`)
      .then(response => {
        setSuccessMessage('Successfully rejected the viewing request.');
        removeNotification(houseId);
      })
      .catch(error => {
        console.error('Error rejecting the request:', error);
      });
  };

  const handleAccept1 = (houseId) => {
    fetch(`owner_accept/${houseId}`)
      .then(response => {
        setSuccessMessage('Successfully accepted the viewing request.');
        removeNotification(houseId);
      })
      .catch(error => {
        console.error('Error accepting the request:', error);
      });
  };

  const handleReject1 = (houseId) => {
    fetch(`owner_reject/${houseId}`)
      .then(response => {
        setSuccessMessage('Successfully rejected the viewing request.');
        removeNotification(houseId);
      })
      .catch(error => {
        console.error('Error rejecting the request:', error);
      });
  };

  const removeNotification = (houseId) => {
    // Update the state to remove the notification with the specified houseId
    setNotfication(prevNotifications => prevNotifications.filter(notification => notification.house_id !== houseId));
  };
  

    return(
      <div>
      <h2>Messages:</h2>
      {successMessage && <p>{successMessage}</p>}
      {agent && (Notfication.length === 0
  ? <p>There is no notification yet.</p>
  : (
      <ul>
        {Notfication.map(message => (
          <li key={message.id}>
            <strong>User {message.user}:</strong> {message.message} ({message.created_at})
            <br />
            <button onClick={() => handleAccept(message.house_id)}>Accept</button>
              <span> | </span>
              <button onClick={() => handleReject(message.house_id)}>Reject</button>
          </li>
        ))}
      </ul>
    )
)}

        {landlord && (Notfication.length ===0
  ? <p>There is no notification yet.</p>
  : (
      <ul>
        {Notfication.map(message => (
          <li key={message.id}>
            <strong>User {message.user}:</strong> {message.message} ({message.created_at})
            <br />
            <button onClick={() => handleAccept1(message.house_id)}>Accept</button>
              <span> | </span>
              <button onClick={() => handleReject1(message.house_id)}>Reject</button>
          </li>
        ))}
      </ul>
    )
)}

{Tenante && (Notfication.length === 0
  ? <p>There is no notification yet.</p>
  : (
      <ul>
        {Notfication.map(message => (
          <li key={message.id}>
            <strong>User {message.user}:</strong> {message.message} ({message.created_at})
            <br />
          </li>
        ))}
      </ul>
    )
)}
    </div>
)};

export default Notfications
