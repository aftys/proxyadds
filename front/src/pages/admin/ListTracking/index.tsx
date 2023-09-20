import { useEffect, useState } from "react";
import TableGridTest from "../../../components/Table";
import AntModal from "../../../components/Modals/Ant";
import axios from "axios";
import { Dayjs } from 'dayjs';
import { Link } from "react-router-dom";
import { Button } from "antd";

enum CampaignStatus {
  ACTIF = "actif",
  PENDING = "pending",
  INACTIF = "inactif",
  FINISHED = "finished",
}
function ListTrackings() {
  const [data, setData] = useState<ICampaign[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/campaigns");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  type ICampaign = {
    _id: string;
    name: string;
    budget_max: number;
    begin_date: Dayjs;
    end_date: Dayjs;
    file: Object;
    display_hours: string;
    status: CampaignStatus;
    url: string;
    advertiser_id: number;
  };

  const customColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "150px",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: "Budget Max",
      dataIndex: "budget_max",
      key: "budget_max",
      width: "150px",
      className: "dark:bg-dark-bg-main dark:text-gray-300",                                   
    },
    {
      title: "display hours",
      dataIndex: "display_hours",
      key: "display_hours",
      width: "150px",
      className: "dark:bg-dark-bg-main dark:text-gray-300 ",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "150px",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: ' ',
      dataIndex: '',
      key: 'x',
      render: (_: any, record: any) => (
        <Link to={"/admin/tracking/" + record._id} >
          <Button type="primary" className='text-white bg-main-blue dark:bg-blue-950 hover:dark:bg-blue-900'>
            Trackings
          </Button>
        </Link>
      ),
      className: "dark:bg-dark-bg-main dark:text-gray-300",

    },

  ];



  return (

    <TableGridTest loading={loading} columns={customColumns} data={data} />
  );
}
export default ListTrackings;