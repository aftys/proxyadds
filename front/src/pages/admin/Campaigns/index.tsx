import { useEffect, useState } from "react";
import TableGridTest from "../../../components/Table";
import AntModal from "../../../components/Modals/Ant";
import axios from "axios";
import { Dayjs } from 'dayjs';
import Confirmation from "../../../components/Confirmation";
import AddCampaign from "../../../components/Forms/Campaigns/addCampaign";
import EditCampaign from "../../../components/Forms/Campaigns/editCampaign";
import { CampaignStatus } from "../../../../../Server/src/enums/campaignStatus.enum";
import { useStateContext } from "../../../contexts";
import { useNavigate } from "react-router-dom";

function Campaigns() {
  const [data, setData] = useState<ICampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate('/login');
  }, [navigate, userData.user]);
  

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

  const handleDelete = async (index: string) => {
    console.log("Delete campaign with id:", index);
    try {
      await axios.delete(`http://localhost:3000/campaigns/${index}`);
    } catch (error) {
      console.error("Error deleting campaign:", error);
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
      width: "15%",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: "Budget Max",
      dataIndex: "budget_max",
      key: "budget_max",
      width: "10%",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    // {
    //   title: "Begin Date",
    //   dataIndex: "begin_date",
    //   key: "begin_date",
    //   width: "10%",
    //   className: "dark:bg-dark-bg-main dark:text-gray-300",
    // },
    // {
    //   title: "End Date",
    //   dataIndex: "end_date",
    //   key: "end_date",
    //   width: "10%",
    //   render: (_: any, record: ICampaign) => (
    //     <p>
    //       {record.end_date.format('DD/MM/YYYY')}
    //     </p>
    //   ),
    //   className: "dark:bg-dark-bg-main dark:text-gray-300",
    // },
   
    {
      title: "display hours",
      dataIndex: "display_hours",
      key: "display_hours",
      width: "10%",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: "File",
      // dataIndex: "file",
      // key: "file",
      render: (_: any, record: ICampaign) => (
        <a  className="text-white p-2 hover:text-white font-semibold rounded-lg bg-main-blue dark:bg-blue-950 hover:dark:bg-blue-900" key={record._id} target="_blank" href={"http://localhost:3000/"+record.file}>
            visite
        </a>
      ),
      width: "10%",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_: any, record: ICampaign) => (
        <span className="flex gap-4">
          <EditCampaign record={record} />
          <Confirmation handleDelete={() => handleDelete(record._id)} />
        </span>
      ),
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    
  ];

  return (
    <>
      <AntModal name={"add campaign"} size={"130px"}>
        <AddCampaign />
      </AntModal>
      <TableGridTest loading={loading} columns={customColumns} data={data} />
    </>
  );
}

export default Campaigns;