import { useEffect, useState } from "react";
import TableGridTest from "../../components/Table";
import AntModal from "../../components/Modals/Ant";
import axios from "axios";
import Confirmation from "../../components/Confirmation";
import AddAdvertiser from "../../components/Forms/Advertiser/addAdvertiser";
import EditAdvertiser from "../../components/Forms/Advertiser/editAdvertiser";


function BusinessActivities() {

  const [data, setData] = useState<MyData[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/advertisers');
      setData(response.data);
      console.log(response.data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleDelete = async (index: any) => {

    console.log("Delete row with id:", index);
    try {
      await axios.delete(`http://localhost:3000/advertisers/${index}`);
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
      title: "Address",
      dataIndex: ["user_id", "address"],
      key: "address",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: "Activity",
      dataIndex: ["act_id", "name"],
      key: "activity",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_: any, record: any) => (
        <span className="flex gap-4">
          <EditAdvertiser record={record} />
          <Confirmation handleDelete={() => handleDelete(record._id)} />
        </span>
      ),
      className: "dark:bg-dark-bg-main dark:text-gray-300",

    },

  ];



  return (
    <>
      <AntModal name={'add advertiser'} size={"130px"}>
        <AddAdvertiser />
      </AntModal>
      <TableGridTest loading={loading} columns={customColumns} data={data} />
    </>
  );
}
export default BusinessActivities;