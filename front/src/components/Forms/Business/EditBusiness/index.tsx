import { useEffect, useState } from "react"
import BusinessInfo from './BusinessInfo'
import UserInfo from './UserInfo'
import { Steps } from "antd";
import axios from "axios";
import IBusiness from "../../../../interfaces/Business";
import AntModal from "../../../Modals/Ant";



function EditBusiness({record}:any) {
  const [current, setCurrent] = useState(0);
  
  const [businessData, setBusinessData] = useState<IBusiness>({
    business_activity_id:record.business_activity_id._id,
    business_type_id:record.business_type_id._id,
    location_id:record.location_id._id,
    email:record.user_id.email,
    address:record.user_id.address,
    phone:record.user_id.phone,
    password:record.user_id.password,
    name:record.user_id.name,
    longitude:record.longitude,
    altitude:record.altitude,


  });
  const titles: string[] = ['User', 'Business'];
  const next = () => {
    current < titles.length - 1 && setCurrent(current + 1);
  };


  const previous = () => {
    current > 0 && setCurrent(current - 1);
  };

  const items = titles.map((item) => ({ key: item, title: item }));






  function onSubmitUser(values: any) {
    setBusinessData({ ...businessData, ...values });
    next();
  };

  async function onSubmitBusiness(values: any) {
    setBusinessData({ ...businessData, ...values ,user_id:record.user_id._id});
    console.log({ ...businessData, ...values ,user_id:record.user_id._id})
    await axios.put('http://localhost:3000/businesses/'+record._id, businessData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }


  return (

    < AntModal name={'Edit'} >
      < div  className="flex flex-col items-center max-w-screen-md w-full p-0 ">
        <Steps className='max-w-screen-md w-full' current={current} items={items} />
        <div className="max-w-screen-sm w-full">
          {current == 0 && <UserInfo onSubmit={onSubmitUser} data={businessData} />}
          {current == 1 && <BusinessInfo onSubmit={onSubmitBusiness} data={businessData} prev={previous} />}
        </div>


      </div>
    </AntModal>
  );
}

export default EditBusiness;
