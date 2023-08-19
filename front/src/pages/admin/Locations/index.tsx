import React, { useEffect, useState } from "react";
import TableGridTest from "../../../components/Table";
import AntModal from "../../../components/Modals/Ant";
import LocationForm from "../../../components/Forms/Location/addLocation";
import axios from "axios";
import Confirmation from "../../../components/Confirmation/deleteConfirmation";
import LocationFormEdit from "../../../components/Forms/Location/editLocation";

const Locations: React.FC = () => {
  const [data, setData] = useState<MyData[]>([]);
  const [loading, setLoading] = useState(true);


  // Fetch data from the backend when the component mounts and whenever the data state changes
  useEffect(() => {
    fetchData();
  }, [data]); // Include 'data' in the dependency array to refetch when data state changes

  const fetchData = async () => {

    await axios.get('http://localhost:3000/locations')
      .then((response) => {
        setData(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
  };



  const handleDelete = async (index: any) => {

    console.log("Delete row with id:", index);
    try {
      await axios.delete(`http://localhost:3000/locations/${index}`);

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
      // Add other custom properties if needed...
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: "20%",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
      // Add other custom properties if needed...
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
      render: (_: any, record: any) => (
        <span className="flex gap-4">
          <LocationFormEdit record={record} />
          {/* <Button type="link" onClick={() => handleDelete(record. _id)}>
          Delete
        </Button> */}
          <Confirmation handleDelete={() => handleDelete(record._id)} />

        </span>
      ),
      className: "dark:bg-dark-bg-main dark:text-gray-300",

    },

    // Add other custom columns as needed...
  ];



  //   return <TableGridTest columns={customColumns} />;
  return (
    <>
      <AntModal name={'add Location'} size={"130px"}>
        {/* <Step /> */}
        < LocationForm />
      </AntModal>
      <TableGridTest<MyData> columns={customColumns} data={data} loading={loading} />
    </>
  );
};

export default Locations;
