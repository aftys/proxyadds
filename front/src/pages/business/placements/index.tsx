import { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Placements() {
    const { userData } = useStateContext()
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetchData();

    }, []);


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/placements/business/' + userData.user.id);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className="w-full grid grid-cols-3 gap-4">
                {data.map((placement, idx) => (
                    <div 
                    key={idx}
                        className="block py-4 flex flex-col gap-4 rounded-lg bg-white dark:bg-dark-bg-main border-[1px] dark:border-gray-700 border-gray-200">
                        <div
                            className="px-4 flex justify-center dark:border-neutral-600 dark:text-neutral-50">
                            {placement.name}
                        </div>
                        <div className="px-4 flex justify-center ">
                            <Link to={"/business/placements/" + placement._id}>
                                <button
                                    type="button"
                                    className="inline-block rounded bg-primary px-6 text-black pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-cyan-600 dark:text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                >
                                    display
                                </button>
                            </Link>
                        </div>
                    </div>
                )
                )}
            </div>

        </>
    )
}