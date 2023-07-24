// import React, { useEffect, useState } from "react";
// import TableGridTest from "../../components/TableTest";
// import { Modal, Steps } from 'antd';
// import { Button } from "antd";
// import AntModal from "../../components/Modals/Ant";
// import LocationForm from "../../components/Forms/Location/addLocation";
// import axios from "axios";
// import Confirmation from "../../components/Confirmation";
// import LocationFormEdit from "../../components/Forms/Location/editLocation"; 

// const Locations: React.FC = () => {
//   const [isModalOpen,setIsModalOpen] = useState(false);
//   const [isEditModalOpen,setIsEditModalOpen] = useState(false);
//   const [data, setData] = useState<MyData[]>([]);

//     // Fetch data from the backend when the component mounts and whenever the data state changes
//     useEffect(() => {
//       fetchData();
//     }, [data]); // Include 'data' in the dependency array to refetch when data state changes
  
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/locations');
//         setData(response.data);
//         // fetchData();
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     const handleEdit = (record: MyData) => {
//       // Implement the logic for handling row edit here
//       console.log("Edit row:", record);
//     };
  
//     const handleDelete = async (index: any) => {

//       console.log("Delete row with id:", index);
//       try {
//         // Send a DELETE request to your backend API to delete the row with the given ID
//         await axios.delete(`http://localhost:3000/locations/${index}`);
//         // Assuming the ID property is named 'id'. Modify the URL accordingly based on your API
  
//         // After successful deletion, you can update the state to reflect the changes
//         // setData((prevData) => prevData.filter((data) => data.id !== id));
//       } catch (error) {
//         console.error("Error deleting row:", error);
//       }
//     };

// type MyData = {
//   _id: string;
//   region: string;
//   city: string;
//   secteur: string;
//   longitude: number;
//   latitude: number;
// };

// const customColumns = [
//   {
//     title: "Region",
//     dataIndex: "region",
//     key: "region",
//     width: "30%",
//     className: "dark:bg-dark-bg-main dark:text-gray-300",
//     // Add other custom properties if needed...
//   },
//   {
//     title: "City",
//     dataIndex: "city",
//     key: "city",
//     width: "20%",
//     className: "dark:bg-dark-bg-main dark:text-gray-300",
//     // Add other custom properties if needed...
//   },
//   {
//     title: "Secteur",
//     dataIndex: "secteur",
//     key: "secteur",
//     className: "dark:bg-dark-bg-main dark:text-gray-300",
//   },
//   {
//     title: "Longitude",
//     dataIndex: "longitude",
//     key: "longitude",
//     className: "dark:bg-dark-bg-main dark:text-gray-300",
//   },
//   {
//     title: "Latitude",
//     dataIndex: "latitude",
//     key: "latitude",
//     className: "dark:bg-dark-bg-main dark:text-gray-300",
//   },
//   {
//     title: 'Action',
//     dataIndex: '',
//     key: 'x',
//     render: (_:any, record:any) => (
//       <span className="flex">
//         <AntModal isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} name={'Edit'}>
//         <LocationFormEdit record={record}/>
//         </AntModal>
//         {/* <Button type="link" onClick={() => handleDelete(record. _id)}>
//           Delete
//         </Button> */}
//         <Confirmation handleDelete={()=> handleDelete(record. _id)}/>
      
//       </span>
//     ),
//     className: "dark:bg-dark-bg-main dark:text-gray-300",

//   },
  
//   // Add other custom columns as needed...
// ];



// //   return <TableGridTest columns={customColumns} />;
// return (
//   <>
//     <AntModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} name={'modal open'}>
//       {/* <Step /> */}
//       < LocationForm />
//     </AntModal>
//     <TableGridTest<MyData> columns={customColumns} data={data} />;
//   </>
// );
// };

// export default Locations;
import React, { useEffect, useState } from "react";
import TableGridTest from "../../components/TableTest";
import { Modal, Steps } from 'antd';
import { Button } from "antd";
import AntModal from "../../components/Modals/Ant";
import LocationForm from "../../components/Forms/Location/addLocation";
import axios from "axios";
import Confirmation from "../../components/Confirmation";
import LocationFormEdit from "../../components/Forms/Location/editLocation"; 

const Locations: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalStates, setEditModalStates] = useState<boolean[]>([]);
  const [data, setData] = useState<MyData[]>([]);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/locations');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (record: MyData) => {
    // Find the index of the record being edited
    const index = data.findIndex(item => item._id === record._id);

    if (index !== -1) {
      // Create a new array based on the current editModalStates
      const newEditModalStates = [...editModalStates];
      // Set the specific edit modal state to true
      newEditModalStates[index] = true;
      setEditModalStates(newEditModalStates);
    }
  };

  const handleDelete = async (id: string) => {
    console.log("Delete row with id:", id);
    try {
      // Send a DELETE request to your backend API to delete the row with the given ID
      await axios.delete("http://localhost:3000/locations/${id}");
      // After successful deletion, update the state to reflect the changes
      setData(prevData => prevData.filter(dataItem => dataItem._id !== id));
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
      title: "Region",
      dataIndex: "region",
      key: "region",
      width: "30%",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: "20%",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: "Secteur",
      dataIndex: "secteur",
      key: "secteur",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      key: "longitude",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
      key: "latitude",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_:any, record:any, index:number) => (
        <span className="flex">
          <AntModal isModalOpen={editModalStates[index] || false} setIsModalOpen={isOpen => {
            // Create a new array based on the current editModalStates
            const newEditModalStates = [...editModalStates];
            // Set the specific edit modal state to the new value
            newEditModalStates[index] = isOpen;
            setEditModalStates(newEditModalStates);
          }} name={'Edit'}>
            <LocationFormEdit record={record}/>
          </AntModal>
          <Confirmation handleDelete={() => handleDelete(record._id)} />
        </span>
      ),
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
  ];

  return (
    <>
      {/* Add location modal */}
      <AntModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} name={'modal open'}>
        <LocationForm />
      </AntModal>

      {/* Location table */}
      <TableGridTest<MyData> columns={customColumns} data={data} />
    </>
  );
};

export default Locations;
