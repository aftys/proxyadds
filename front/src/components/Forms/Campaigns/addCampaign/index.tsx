import { useEffect, useState } from "react"
import { Steps } from "antd";
import axios from "axios";
import CampaignBusinessActivity from "./CampaignBusinessActivity";
import Campaign from "./Campaign";
function AddCampaign() {
  const [current, setCurrent] = useState(0);
  const [userId, setUserId] = useState<number>();
  const [businessId, setBusinessId] = useState<number>();



  const [userData, setUserData] = useState<any>({});
  const [businessData, setBusinessData] = useState<any>({});
  const [placementData, setPlacementData] = useState<any>({});
  const titles: string[] = ['CampaignBA'];

  const next = () => {
    current === titles.length - 1 ? onSubmitForm() : setCurrent(current + 1);
  };


  const previous = () => {
    setCurrent(current - 1);
  };

  const items = titles.map((item) => ({ key: item, title: item }));

  function onSubmitUserInfo(values: any) {
    setUserData(values);
    next();
  }

  // function onSubmitPlacementInfo(){
  //   next()

  // }

  function onSubmitBusinessInfo(values: any) {
    setBusinessData(values);
    next();
  }

  function onSubmitPlacementInfo(values: any) {
    setPlacementData(values);
    next();
  };

   async function onSubmitForm() {
    try {
      // send your Campaign data to the 'Campaigns' endpoint
    } catch (error) {
      console.error('Error sending form data:', error);
      // Handle error, e.g., show an error message to the user
    }
  }


  function onSubmitCampaignBusinessActivity(values: any){
    console.log('values', values);
    axios
    .post('http://localhost:3000/campaign-business-activities', {
      businessActivity_ids: values.businessActivity_id,
      campaign_id: "64c643928749f528b81a481d",
    })
    .then(response => {
      console.log('Form data sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending form data:', error);
    });
  };

  return (
    < div className="flex flex-col items-center max-w-screen-md w-full ">
      <Steps className='max-w-screen-md w-full' current={current} items={items} />
      <div className="max-w-screen-sm w-full">
        {current == 0 && <Campaign />}
        {/* {current == 1 && <BusinessInfo onSubmit={onSubmitBusinessInfo} prev={previous} />}
        {current == 2 && <PlacementInfo onSubmit={onSubmitPlacementInfo} prev={previous} />} */}
        {/* {current == 2 && <SchedulesInfo onSubmit={onSubmitPlacementInfo}/>} */}
      </div>


    </div>
  );
}

export default AddCampaign;
