import React, { useEffect, useState } from "react";
import TableGridTest from "../../components/Table";
import AntModal from "../../components/Modals/Ant";
import AddBusinessType from "../../components/Forms/BusinessTypes/addBusinessType";
import axios from "axios";
import Confirmation from "../../components/Confirmation";
import EditBusinessType from "../../components/Forms/BusinessTypes/editBusinessType"; 



function BusinessTypes() {
  const [data, setData] = useState<MyData[]>([]);
  const [loading, setLoading] = useState(true);

    // Fetch data from the backend when the component mounts and whenever the data state changes
    useEffect(() => {
      fetchData();
    }, []); // Include 'data' in the dependency array to refetch when data state changes
  
    const fetchData = async () => {
      await axios.get('http://localhost:3000/business-types')
      .then((response)=>{setData(response.data);setLoading(false);
        console.log("Business Types data", response.data)
      })
      .catch((error)=>console.error('Error fetching data:', error))
    };

  
    const handleDelete = async (index: any) => {

      console.log("Delete row with id:", index);
      try {
        // Send a DELETE request to your backend API to delete the row with the given ID
        await axios.delete(`http://localhost:3000/business-types/${index}`);
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
  activity_id: string;
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
    title: "activity",
    dataIndex: ["activity_id","name"],
    key: "activity_id",
    width: "30%",
    className: "dark:bg-dark-bg-main dark:text-gray-300",
    // Add other custom properties if needed...
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (_:any, record:any) => (
      <span className="flex gap-4">
        <EditBusinessType record={record}/>
        {/* <Button type="link" onClick={() => handleDelete(record. _id)}>
          Delete
        </Button> */}
        <Confirmation handleDelete={()=> handleDelete(record. _id)}/>
      
      </span>
    ),
    className: "dark:bg-dark-bg-main dark:text-gray-300",

  },
  
  // Add other custom columns as needed...
];



return (
  <>
    <AntModal name={'ajouter type'} size={"100px"}>
      {/* <Step /> */}
      <AddBusinessType />
    </AntModal>
    <TableGridTest<MyData> columns={customColumns} data={data} loading={loading} />
  </>
);
  }
  export default BusinessTypes;