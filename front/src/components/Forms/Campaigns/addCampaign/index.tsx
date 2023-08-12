import { useEffect, useState } from "react"
import { Steps } from "antd";
import axios from "axios";
import CampaignBusinessActivity from "./CampaignBusinessActivity";
import Campaign from "./Campaign";
import CampaignBusinessType from "./CampaignBusinessType";
import CampaignLocation from "./CampaingLocation";
function AddCampaign() {
  const [current, setCurrent] = useState(0);

  const [campaignData, setCampaignData] = useState<any>({});
  const titles: string[] = ['Campaign','CampaignBA', 'CampaignBT', 'CampaignL'];

  const next = () => {
    current === titles.length - 1 ? onSubmitForm() : setCurrent(current + 1);
  };


  const previous = () => {
    setCurrent(current - 1);
  };

  const items = titles.map((item) => ({ key: item, title: item }));

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
    console.log('campaigndata', campaignData);
    axios
    .post('http://localhost:3000/campaign-business-activities', {
      businessActivity_ids: values.businessActivity_id,
      campaign_id: campaignData._id,
    })
    .then(response => {
      console.log('Form data sent successfully:', response.data);
      next();
    })
    .catch(error => {
      console.error('Error sending form data:', error);
    });
  };

  function onSubmitCampaignBusinessType(values: any){
    console.log('values', values);
    axios
    .post('http://localhost:3000/campaign-business-types', {
      businessType_ids: values.businessType_ids,
      campaign_id: campaignData._id,
    })
    .then(response => {
      console.log('campaign-business-types data sent successfully:', response.data);
      next();
    })
    .catch(error => {
      console.error('Error sending campaign-business-types data:', error);
    });
  };

  function onSubmitCampaignLocation(values: any){
    console.log('values', values);
    axios
    .post('http://localhost:3000/campaign-locations', {
      location_ids: values.location_ids,
      campaign_id: campaignData._id,
    })
    .then(response => {
      console.log('campaign-locations data sent successfully:', response.data);
      next();
    })
    .catch(error => {
      console.error('Error sending campaign-locations data:', error);
    });
  };

  return (
    < div className="flex flex-col items-center max-w-screen-md w-full ">
      <Steps className='max-w-screen-md w-full' current={current} items={items} />
      <div className="max-w-screen-sm w-full">
        {current == 0 && <Campaign setCampaignData={setCampaignData } next={next}/>}
        {current == 1 && <CampaignBusinessActivity onSubmit={onSubmitCampaignBusinessActivity} prev={previous} />}
        {current == 2 && <CampaignBusinessType onSubmit={onSubmitCampaignBusinessType} prev={previous} />}
        {current == 3 && <CampaignLocation onSubmit={onSubmitCampaignLocation} prev={previous} />}
      </div>
    </div>
  );
}

export default AddCampaign;
