import React, { useEffect, useState } from "react";
import TableGridTest from "../../../components/Table";
import AntModal from "../../../components/Modals/Ant";
import axios from "axios";
import Confirmation from "../../../components/Confirmation";
import LocationFormEdit from "../../../components/Forms/Location/editLocation";
import AddBusiness from "../../../components/Forms/Business/addBusiness";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import IBusiness from "../../../interfaces/Business";
import EditBusiness from "../../../components/Forms/Business/EditBusiness";
import GridLoader from "react-spinners/GridLoader";
import { useStateContext } from "../../../contexts";


const Business: React.FC = () => {
  const [data, setData] = useState<IBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate('/login');
  }, [navigate, userData.user]);
  

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
    } catch (error) {
      console.error("Error deleting row:", error);
    }
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
      render: (_: any, record: any) => (
        <span  className="flex gap-4">
          <EditBusiness record={record} />
          <Confirmation handleDelete={() => handleDelete(record._id)} />
          <Link to={"/Businesses/" + record._id + "/Schedules"}><Button className='text-white bg-main-blue dark:bg-blue-950 hover:dark:bg-blue-900'>Schedules</Button></Link>
        </span>
      ),
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
  ];



  return (
    // <>
    //   {loading ? <GridLoader className="fixed top-[40%] right-[47%]" color="#22d3ee" />
    //     :
        <>
          <AntModal name={'Ajouter Business'} size={"130px"}>
            <AddBusiness />
          </AntModal>
          <TableGridTest<IBusiness> columns={customColumns} data={data} loading={loading} />
        </>
      // }
    // </>
  );


};


export default Business;
