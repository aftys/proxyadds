import React, { useState } from "react";
import { Steps } from "antd";
import axios from "axios";
import CampaignBusinessActivity from "./CampaignBusinessActivity";
import Campaign from "./Campaign";
import CampaignBusinessType from "./CampaignBusinessType";
import CampaignLocation from "./CampaingLocation";
import ICampaign from "../../../../interfaces/Campaign";
import dayjs from "dayjs";


function AddCampaign() {
  const [current, setCurrent] = useState(0);

  const [campaignData, setCampaignData] = useState<ICampaign & Record<string, any>>({
    advertiser_id: "",
    begin_date: dayjs(),
    budget_max: "",
    business_activity_ids: [],
    business_type_ids: [],
    display_hours: "",
    end_date: dayjs(),
    file: null,
    location_ids: [],
    name: "",
    status: "actif",
    url: "",
  });
  const titles: string[] = ['Campaign', 'CampaignBA', 'CampaignBT', 'CampaignL'];

  const next = () => {
    if (current < titles.length - 1) {
      setCurrent(current + 1);
    }
  };

  const previous = () => {
    setCurrent(current - 1);
  };

  const items = titles.map((item) => ({ key: item, title: item }));

  const onSubmit = (values: any) => {
    setCampaignData({ ...campaignData, ...values });
    next();
  };

  const onSubmitCampaign = (values: any, file: File | null) => {
    setCampaignData({ ...campaignData, ...values, file: file });
    next();
  };

  const onSubmitFinal = async (values: any) => {
    const data={ ...campaignData, ...values };
    console.log(campaignData);
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, campaignData[key]);
      }
      const response = await axios.post("http://localhost:3000/campaigns", formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-screen-md w-full">
      <Steps className="max-w-screen-md w-full" current={current} items={items} />
      <div className="max-w-screen-sm w-full">
        {current === 0 && <Campaign onSubmit={onSubmitCampaign} data={campaignData} />}
        {current === 1 && <CampaignBusinessActivity onSubmit={onSubmit} data={campaignData} prev={previous} />}
        {current === 2 && <CampaignBusinessType onSubmit={onSubmit} data={campaignData} prev={previous} />}
        {current === 3 && <CampaignLocation onSubmit={onSubmitFinal} prev={previous} />}
      </div>
    </div>
  );
}

export default AddCampaign;
