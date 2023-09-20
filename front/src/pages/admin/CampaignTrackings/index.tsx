import { useEffect, useState } from "react";
import TableGridTest from "../../../components/Table";
import axios from "axios";
import { Dayjs } from 'dayjs';
import { Link, useParams } from "react-router-dom";
import { Button, Descriptions } from "antd";
import type { DescriptionsProps } from 'antd';
enum CampaignStatus {
    ACTIF = "actif",
    PENDING = "pending",
    INACTIF = "inactif",
    FINISHED = "finished",
}
function CampaignTrackings() {
    const [data, setData] = useState<ICampaign[]>([]);
    const [Campaign, setCampaign] = useState<ICampaign>();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();


    useEffect(() => {
        fetchData();
        fetchCampign()
    }, [data]);

    const fetchCampign = async () => {
        try {
            const response = await axios.get<ICampaign>("http://localhost:3000/Campaigns/" + id);
            setCampaign(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/trackings/" + id);
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
            title: "business",
            dataIndex: "business",
            key: "name",
            width: "150px",
            className: "dark:bg-dark-bg-main dark:text-gray-300",
        },
        {
            title: "placement",
            dataIndex: "budget_max",
            key: "budget_max",
            width: "150px",
            className: "dark:bg-dark-bg-main dark:text-gray-300",
        },
        {
            title: "display time",
            dataIndex: "display_hours",
            key: "display_hours",
            width: "150px",
            className: "dark:bg-dark-bg-main dark:text-gray-300 ",
        },
        {
            title: "display date",
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

        <>
            <div className="flex w-[850px] w-full  p-6 border-gray-200  dark:text-white dark:border-gray-700 border bg-white dark:bg-dark-bg-main  rounded-md  ">
                <div className="flex flex-col w-1/2">
                    
                    <div className="w-full">
                    <div className="flex   mb-4 gap-4 ">
                        <label className="w-1/4 text-sm font-medium p-1 mb-2 bg-gray-100  dark:bg-app border-gray-200  rounded-lg dark:border-gray-700 border">ID</label>
                        <span className="w-3/4 text-sm p-1    font-medium">{Campaign?._id }</span>
                    </div>
                    <div className="flex   mb-4 gap-4 ">
                        <label className="w-1/4 text-sm font-medium p-1 mb-2 bg-gray-100  dark:bg-app border-gray-200  rounded-lg dark:border-gray-700 border">Name</label>
                        <span className="w-3/4 text-sm p-1    font-medium">{ Campaign?.name }</span>
                    </div>
                    <div className="flex   mb-4 gap-4 ">
                        <label className="w-1/4 text-sm font-medium p-1 mb-2 bg-gray-100  dark:bg-app border-gray-200  rounded-lg dark:border-gray-700 border">Budget</label>
                        <span className="w-3/4 text-sm p-1    font-medium">{Campaign?.budget_max }</span>
                    </div>
                    <div className="flex   mb-4 gap-4 ">
                        <label className="w-1/4 text-sm font-medium p-1 mb-2 bg-gray-100  dark:bg-app border-gray-200  rounded-lg dark:border-gray-700 border">Start Date</label>
                        <span className="w-3/4 text-sm p-1    font-medium">{ Campaign?.begin_date.toString() }</span>
                    </div>
                </div>   
                </div>   

                <div className="flex flex-col w-1/2">
                    <div className="flex   mb-4 gap-4 ">
                        <label className="w-1/4 text-sm font-medium p-1 mb-2 bg-gray-100  dark:bg-app border-gray-200  rounded-lg dark:border-gray-700 border">End Date</label>
                        <span className="w-3/4 text-sm p-1    font-medium">{ Campaign?.end_date.toString()}</span>
                    </div>
                    <div className="flex   mb-4 gap-4 ">
                        <label className="w-1/4 text-sm font-medium p-1 mb-2 bg-gray-100  dark:bg-app border-gray-200  rounded-lg dark:border-gray-700 border">Display Hours</label>
                        <span className="w-3/4 text-sm p-1    font-medium">{Campaign?.display_hours}</span>
                    </div>
                    <div className="flex   mb-4 gap-4 ">
                        <label className="w-1/4 text-sm font-medium p-1 mb-2 bg-gray-100  dark:bg-app border-gray-200  rounded-lg dark:border-gray-700 border">Status</label>
                        <span className="w-3/4 text-sm p-1    font-medium">{ Campaign?.status }</span>
                    </div>
                    <div className="flex   mb-4 gap-4 ">
                        <label className="w-1/4 text-sm font-medium p-1 mb-2 bg-gray-100  dark:bg-app border-gray-200  rounded-lg dark:border-gray-700 border">URL</label>
                        <a className="w-3/4 text-sm p-1    font-medium" href="{{ Campaign.url }}">View Campaign</a>
                    </div>
                    </div>
                </div>
            <TableGridTest loading={loading} columns={customColumns} data={data} />
        </>
    );
}
export default CampaignTrackings;