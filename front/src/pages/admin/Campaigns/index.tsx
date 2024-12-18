import { useEffect, useState } from "react";
import TableGridTest from "../../../components/Table";
import AntModal from "../../../components/Modals/Ant";
import axios from "axios";
import { Dayjs } from 'dayjs';
import Confirmation from "../../../components/Confirmation/deleteConfirmation";
import AddCampaign from "../../../components/Forms/Campaigns/addCampaign";
import EditCampaign from "../../../components/Forms/Campaigns/editCampaign";

enum CampaignStatus {
  ACTIF = "actif",
  PENDING = "pending",
  INACTIF = "inactif",
  FINISHED = "finished",
}
function Campaigns() {
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
          <EditCampaign record={record as any} />
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
