import { useHistory } from "react-router-dom";
import React, { useState } from 'react';

const AddHome = () => {
    const [csrfToken, setCsrfToken] = React.useState('');
    const history=useHistory()
    const [formData, setFormData] = useState({
        house_location: '',
        house_image: null,
        house_bedroom: 0,
        house_size_in_feet: '',
        house_details: '',
        is_house_with_utensil: false,
        is_house_with_kitchen: false,
        is_house_reserved: false,
        house_address: '',
        fees_in_birr: 0,
        type: 1,  // Replace with the actual HouseType ID
    });
   

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
    
    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            house_image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObject = new FormData();
        for (const key in formData) {
            formDataObject.append(key, formData[key]);
        }

        try {
            const response = await fetch('api/create_house', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken,
                      },
                body: formDataObject,
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            // Handle the response as needed
            const data= await response.json()
            console.log(data.house_id)
            history.push(`/add_photo/${data.house_id}`)
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    return (
<div>
        <h1>Add Home for tenant</h1>
        <form onSubmit={handleSubmit}>
            <label>
                House Location:
                <input
                    type="text"
                    name="house_location"
                    value={formData.house_location}
                    onChange={handleChange}
                />
            </label>
<br/>
            <label>
                House Image:
                <input
                    type="file"
                    name="house_image"
                    onChange={handleImageChange}
                />
            </label>
<br/>
            <label>
                House Bedroom:
                <input
                    type="number"
                    name="house_bedroom"
                    value={formData.house_bedroom}
                    onChange={handleChange}
                />
            </label>
<br/>
            <label>
                House Size in Feet:
                <input
                    type="text"
                    name="house_size_in_feet"
                    value={formData.house_size_in_feet}
                    onChange={handleChange}
                />
            </label>
<br/>
            <label>
                House Details:
                <textarea
                    name="house_details"
                    value={formData.house_details}
                    onChange={handleChange}
                />
            </label>
<br/>           
            <label>
                Is House with Utensil:
                <input
                    type="checkbox"
                    name="is_house_with_utensil"
                    checked={formData.is_house_with_utensil}
                    onChange={handleChange}
                />
         </label>
<br/>
            <label>
                Is House with Kitchen:
                <input
                    type="checkbox"
                    name="is_house_with_kitchen"
                    checked={formData.is_house_with_kitchen}
                    onChange={handleChange}
                />
            </label>
<br/>

            <label>
                Is House Reserved:
                <input
                    type="checkbox"
                    name="is_house_reserved"
                    checked={formData.is_house_reserved}
                    onChange={handleChange}
                />
            </label>
<br/>
            <label>
                House Address:
                <input
                    type="text"
                    name="house_address"
                    value={formData.house_address}
                    onChange={handleChange}
                />
            </label>
<br/>
            <label>
                Fees in Birr:
                <input
                    type="number"
                    name="fees_in_birr"
                    value={formData.fees_in_birr}
                    onChange={handleChange}
                />
            </label>
<br/>
            <label>
                House Type ID:
                <input
                    type="number"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                />
            </label>
<br/>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default AddHome;