import { useEffect, useState } from "react"
import PlacementsInfo from './PlacementInfo'
import UserInfo from './UserInfo'
import SchedulesInfo from './SchedulesInfo'
import { Steps } from "antd";
import axios from "axios";

function AddBusiness() {
  const [current, setCurrent] = useState(0);
  const [userId,setUserId]=useState<number>();
  const [businessId,setBusinessId]=useState<number>();
  const titles: string[] = ['User', 'Placement', 'Schedule'];

  const next = () => {
    setCurrent(current + 1);
  };

  const previous = () => {
    setCurrent(current - 1);
  };

  const items = titles.map((item) => ({ key: item, title: item }));

  function onSubmitUserInfo(values:any){
    console.log(values);
    axios
      .post('http://localhost:3000/users', {
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.phone,
        address: values.address,
        status:0,
      })
      .then(response => {
        console.log('Form data sent successfully:', response.data);
        setUserId(response.data._id);
        next();
      })
      .catch(error => {
        console.error('Error sending form data:', error);
      });

  }

  function onSubmitPlacementInfo(){
    next()

  }

  function onSubmitSchedulesInfo(values:any){
    // console.log(values.location)
    axios
      .post('http://localhost:3000/businesses', {...values,user_id:userId,location_id:values.location[1]})
      .then(response => {
        console.log('Form data sent successfully:', response.data);
        next();
      })
      .catch(error => {
        console.error('Error sending form data:', error);
      });
  }

  return (
    < div className="flex flex-col items-center max-w-screen-md w-full ">
      <Steps  className='max-w-screen-md w-full'  current={current} items={items} />
        <div className="max-w-screen-sm w-full">
          {current == 0 && <UserInfo onSubmit={onSubmitUserInfo}/>}
          {current == 1 && <PlacementsInfo onSubmit={onSubmitSchedulesInfo}/>}
          {current == 2 && <SchedulesInfo onSubmit={onSubmitPlacementInfo}/>}
        </div>


    </div>
  );
}

export default AddBusiness;
