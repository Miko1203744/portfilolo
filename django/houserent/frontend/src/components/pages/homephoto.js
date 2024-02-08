import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../homephoto.css'
const HomePhoto = () => {
    const { house_id } = useParams();
    const [photos, setPhotos] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [csrfToken, setCsrfToken] = React.useState('');
/*
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`api/photos/${house_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }

        const data = await response.json();
        setPhotos(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching photos:', error.message);
      }
    };

    fetchPhotos();
  }, [selectedFiles]); // Re-run effect when houseId changes
*/

   
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

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFiles.length) {
            alert('Please select at least one photo to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('house_id', house_id);

        selectedFiles.forEach((file) => {
            formData.append('photos', file);
        });

        try {
            const response = await fetch('../api/upload_photos', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken,
                      },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload photos.');
            }
            const data =await response.json()
            setPhotos(data)
            // Optionally, you can handle success (e.g., show a success message)
            alert('Photos uploaded successfully!');
        } catch (error) {
            console.error('Error uploading photos:', error.message);
        }
    };
       const photoss=photos.map((x,index)=>(
        <img src={x.image}/>
       ))
    return (
        <div>
            <h2>Upload Photos</h2>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} accept="image/*" multiple />
                <button type="submit">Upload</button>
            </form>
            <div className='photo2'>
            {photoss}
            </div>
        </div>
    );
};

export default HomePhoto;