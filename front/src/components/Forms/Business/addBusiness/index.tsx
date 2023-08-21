import {  useState } from "react"
import BusinessInfo from './BusinessInfo'
import UserInfo from './UserInfo'
import { Steps } from "antd";
import axios from "axios";
import PlacementInfo from "./PlacementInfo";
import IBusiness from "../../../../interfaces/Business";
function AddBusiness() {
  const [current, setCurrent] = useState(0);
  const [businessData, setBusinessData] = useState<IBusiness>({});
  const titles: string[] = ['User', 'Business', 'Placement'];

  const next = () => {
    current <titles.length - 1  && setCurrent(current + 1);
  };


  const previous = () => {
    current > 0  && setCurrent(current - 1);
  };

  const items = titles.map((item) => ({ key: item, title: item }));

 




  function onSubmit(values: any) {
    setBusinessData({ ...businessData, ...values });
    next();
  };

  async function onSubmitFinal(values:any){
    setBusinessData({ ...businessData, ...values,role:'business' });
    console.log(businessData)
    await axios.post('http://localhost:3000/businesses',{ ...businessData, ...values,role:'business' })
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
  }

  
  return (
    < div className="flex flex-col items-center max-w-screen-md w-full p-0 ">
      <Steps className='max-w-screen-md w-full' current={current} items={items} />
      <div className="max-w-screen-sm w-full">
        {current == 0 && <UserInfo onSubmit={onSubmit} data={businessData} />}
        {current == 1 && <BusinessInfo onSubmit={onSubmit} data={businessData} prev={previous} />}
        {current == 2 && <PlacementInfo onSubmit={onSubmitFinal} prev={previous} data={businessData} />}
      </div>


    </div>
  );
}

export default AddBusiness;
