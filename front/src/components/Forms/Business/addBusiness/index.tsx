import { useEffect, useState } from "react"
import BusinessInfo from './BusinessInfo'
import UserInfo from './UserInfo'
import { Steps } from "antd";
import axios from "axios";
import PlacementInfo from "./PlacementInfo";
import IUser from "../../../../interfaces/User";

function AddBusiness() {
  const [current, setCurrent] = useState(0);
  const [userId, setUserId] = useState<number>();
  // const [businessId, setBusinessId] = useState<number>();
  const [userData, setUserData] = useState<IUser>({email:'',password:'',name:'',phone:'',address:''});
  const [businessData, setBusinessData] = useState<any>({});
  const [placementData, setPlacementData] = useState<any>({});
  const titles: string[] = ['User', 'Business', 'Placement'];

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
      // Send the user data to the 'users' endpoint
      await axios.post('http://localhost:3000/users', {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        status: 0,
      }).then(response => {
        console.log('user data sent successfully:', response.data);
        setUserId(response.data._id);
      })
        .catch(error => {
          console.error('Error sending the user data:', error);
        });

       await axios.post('http://localhost:3000/businesses', {
        ...businessData,
        user_id: userId,
        location_id: businessData.location[1], // Or replace this with the appropriate location data
      }).then(response => {
        console.log('business data sent successfully:', response.data);
      })
        .catch(error => {
          console.error('Error sending the business data:', error);
        });

       axios.post('http://localhost:3000/placements', {
        name: placementData.name,
        business_id: placementData.business_id
      }).then(response => {
        console.log('Placement created successfully!', response.data);
      })
        .catch(error => {
          console.error('Error sending the Placement data:', error);
        });

      console.log('Form data sent successfully!');
      setCurrent(0);

    } catch (error) {
      console.error('Error sending form data:', error);
      // Handle error, e.g., show an error message to the user
    }
  }


  return (
    < div className="flex flex-col items-center max-w-screen-md w-full ">
      <Steps className='max-w-screen-md w-full' current={current} items={items} />
      <div className="max-w-screen-sm w-full">
        {current == 0 && <UserInfo onSubmit={onSubmitUserInfo} userData={userData} />}
        {current == 1 && <BusinessInfo onSubmit={onSubmitBusinessInfo} prev={previous} />}
        {current == 2 && <PlacementInfo onSubmit={onSubmitPlacementInfo} prev={previous} />}
        {/* {current == 2 && <SchedulesInfo onSubmit={onSubmitPlacementInfo}/>} */}
      </div>


    </div>
  );
}

export default AddBusiness;
