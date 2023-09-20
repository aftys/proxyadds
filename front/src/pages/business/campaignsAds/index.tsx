import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../../contexts";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CampaignAds: React.FC = () => {
    const { userData } = useStateContext();
    const [data, setData] = useState<any[]>([]);
    const { placementId } = useParams();

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchData();
        console.log(data)
    }, []);

    const currentIndexRef = useRef<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            currentIndexRef.current = (currentIndexRef.current + 1) % data.length;
            setCurrentIndex(currentIndexRef.current);
            sendTracking(data[currentIndexRef.current]._id);
            console.log(currentIndexRef)
        }, 10000);

        return () => clearInterval(intervalId);
    }, [data]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/test/" + userData.user.id
            );
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const sendTracking=async(campaignId:string)=>{
        console.log(campaignId);
        try {
            const response = await axios.post(
                "http://localhost:3000/trackings",{
                    campaign_id:campaignId,
                    placement_id:placementId,
                    date:new Date(),
                    display_time:'15',
                    type:'test'
                }
            );
            console.log(response.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }



    return (
        <>
            <Link to="/business/placements">
                <button className="bg-white z-50 h-10 fixed top-4 left-4">placements</button>
            </Link>
            <div className="fixed z-40 w-screen h-screen bg-black top-0 bottom-0 left-0 right-0">

                <div>
                    {data[currentIndex] && `http://localhost:3000/${data[currentIndex].file}`.endsWith(".mp4") ? (
                        <video controls autoPlay>
                            <source src={data[currentIndex] && `http://localhost:3000/${data[currentIndex].file}`} type="video/mp4" />
                        </video>
                    ) : (
                        <img className="fixed   w-full top-0 bottom-0 left-0 right-0 object-cover bg-black"  src={data[currentIndex]  && `http://localhost:3000/${data[currentIndex].file}`} alt={`Media ${currentIndex}`} />
                    )}
                </div>fixed top-4 left-4
            </div>
        </>
    );
};

export default CampaignAds;
