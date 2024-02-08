import React from 'react'
import { useParams } from 'react-router-dom';
const HouseTypePage=()=>{
    const { type } = useParams();
    const [houseType_List, setHouseType] = React.useState([]);
    React.useEffect(() => {
        fetch(`/api/houseType/${type}`)
            .then(response => response.json())
            .then(data => setHouseType(data))
            .catch(error => console.log(error));
    }, [type]);

    const houseTypes_lists=houseType_List.map((x)=>{
        return (<div>
            <h1>{x.house_location} Details</h1>
            <img src={x.house_image} alt={x.type} />
            <p>birr: {x.fees_in_birr}</p>
        </div>)
      })   
    return (
        <>
       {houseTypes_lists}
       </>
    );
};

export default HouseTypePage;