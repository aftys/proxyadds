import { useEffect, useState } from "react";
import TableGridTest from "../../components/Table";
import AntModal from "../../components/Modals/Ant";
import axios from "axios";
import Confirmation from "../../components/Confirmation";
import AddPlacement from "../../components/Forms/Placement/addPlacement";
import EditPlacement from "../../components/Forms/Placement/editPlacement";





function Placements() {
  const [data, setData] = useState<MyData[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchData();

  }, []); 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/placements');
      setData(response.data);
      console.log("Placements data", response.data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (index: any) => {

    console.log("Delete row with id:", index);
    try {
      await axios.delete(`http://localhost:3000/placements/${index}`);
      fetchData();
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
      key: "name",
      width: "30%",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: "Business",
      dataIndex: ["business_id", "user_id"],
      key: "user_id",
      width: "20%",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_: any, record: any) => (
        <span className="flex gap-4">
          <EditPlacement record={record} />
          <Confirmation handleDelete={() => handleDelete(record._id)} />
        </span>
      ),
      className: "dark:bg-dark-bg-main dark:text-gray-300",

    },

  ];





  return (
    <>
      <AntModal name={'add Placement'} size={"130px"}>
        <AddPlacement />
      </AntModal>
      <TableGridTest loading={loading} columns={customColumns} data={data} />
    </>
  );
}
export default Placements;