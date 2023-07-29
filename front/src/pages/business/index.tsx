import React, { useEffect, useState } from "react";
import TableGridTest from "../../components/Table";
import AntModal from "../../components/Modals/Ant";
import axios from "axios";
import Confirmation from "../../components/Confirmation";
import LocationFormEdit from "../../components/Forms/Location/editLocation"; 
import AddBusiness from "../../components/Forms/Business/addBusiness";
import { Link } from "react-router-dom";
import { Button } from "antd";


const Business: React.FC = () => {
  const [data, setData] = useState<MyData[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchData();
    }, [data]); // Include 'data' in the dependency array to refetch when data state changes
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/businesses');
        setData(response.data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const handleDelete = async (index: any) => {

      console.log("Delete row with id:", index);
      try {
        // Send a DELETE request to your backend API to delete the row with the given ID
        await axios.delete(`http://localhost:3000/businesses/${index}`);
        // Assuming the ID property is named 'id'. Modify the URL accordingly based on your API
  
        // After successful deletion, you can update the state to reflect the changes
        // setData((prevData) => prevData.filter((data) => data.id !== id));
      } catch (error) {
        console.error("Error deleting row:", error);
      }
    };

type MyData = {
  _id: string;
  region: string;
  city: string;
  secteur: string;
  longitude: number;
  latitude: number;
};

const customColumns = [
  {
    title: "Name",
    dataIndex: ["user_id", "name"],
    key: "name",
    width: "30%",
    className: "dark:bg-dark-bg-main dark:text-gray-300",
  },
  {
    title: "Email",
    dataIndex: ["user_id", "email"],
    key: "email",
    width: "20%",
    className: "dark:bg-dark-bg-main dark:text-gray-300",
  },
  {
    title: "Phone",
    dataIndex: ["user_id", "phone"],
    key: "phone",
    className: "dark:bg-dark-bg-main dark:text-gray-300",
  },  
  {
    title: "Region",
    dataIndex: ["location_id", "region"],
    key: "secteur",
    className: "dark:bg-dark-bg-main dark:text-gray-300",
  },
  {
    title: "Ville",
    dataIndex: ["location_id", "city"],
    key: "secteur",
    className: "dark:bg-dark-bg-main dark:text-gray-300",
  },
  {
    title: "Secteur",
    dataIndex: ["location_id", "secteur"],
    key: "secteur",
    className: "dark:bg-dark-bg-main dark:text-gray-300",
  },
  
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (_:any, record:any) => (
      <span className="flex gap-4">
        <LocationFormEdit record={record}/>
        <Confirmation handleDelete={() => handleDelete(record._id)} />
        <Link to={"/Businesses/"+record._id+"/Schedules"}><Button className='text-white bg-main-blue dark:bg-blue-950 hover:dark:bg-blue-900'>Schedules</Button></Link>
      </span>
    ),
    className: "dark:bg-dark-bg-main dark:text-gray-300",
  },
];



return (
  <>
    <AntModal name={'Ajouter Business'} size={"130px"}>
      <AddBusiness/>
    </AntModal>
    <TableGridTest<MyData> columns={customColumns} data={data} loading={loading} />
  </>
);


};
    

export default Business;
