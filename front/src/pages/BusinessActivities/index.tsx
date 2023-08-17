import React, { useEffect, useState } from "react";
import TableGridTest from "../../components/Table";
import AntModal from "../../components/Modals/Ant";
import AddBusinessActivities from "../../components/Forms/BusinessActivities/addBusinessActivities";
import axios from "axios";
import Confirmation from "../../components/Confirmation";
import EditBusinessActivities from "../../components/Forms/BusinessActivities/editBusinessActivities";
import { useStateContext } from "../../contexts";
import { useNavigate } from "react-router-dom";


function BusinessActivities() {

  const [data, setData] = useState<MyData[]>([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate('/login');
  }, [navigate, userData.user]);
  

  // Fetch data from the backend when the component mounts and whenever the data state changes
  useEffect(() => {
    fetchData();
  }, [data]); // Include 'data' in the dependency array to refetch when data state changes

  const fetchData = async () => {
    await axios.get('http://localhost:3000/business-activities')
      .then((response) => { setData(response.data); setLoading(false); })
      .catch((error) => console.error('Error fetching data:', error))
  };


  const handleDelete = async (index: any) => {

    console.log("Delete row with id:", index);
    try {
      // Send a DELETE request to your backend API to delete the row with the given ID
      await axios.delete(`http://localhost:3000/business-activities/${index}`);
      // Assuming the ID property is named 'id'. Modify the URL accordingly based on your API

      // After successful deletion, you can update the state to reflect the changes
      // setData((prevData) => prevData.filter((data) => data.id !== id));
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  type MyData = {
    _id: string;
    name: string;
  };

  const customColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "neme",
      width: "30%",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
      // Add other custom properties if needed...
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_: any, record: any) => (
        <span className="flex gap-4">
          <EditBusinessActivities record={record} />
          <Confirmation handleDelete={() => handleDelete(record._id)} />
        </span>
      ),
      className: "dark:bg-dark-bg-main dark:text-gray-300",

    },

    // Add other custom columns as needed...
  ];



  return (
    <>
      <AntModal name={'ajouter activité'} size={"130px"}>
        {/* <Step /> */}
        <AddBusinessActivities />
      </AntModal>
      <TableGridTest<MyData> columns={customColumns} data={data} loading={loading} />
    </>
  );
}
export default BusinessActivities;