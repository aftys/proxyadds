import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStateContext } from '../../contexts';

function ErrorNotice (props:any) {
  return (
      <div className="error-notice">
          <span>{props.message}</span>
          <button onClick={props.clearError}>X</button>
      </div>
  );
}

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);
  const { userData, setUserData } = useStateContext();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginResponse = await axios.post<{
        token: string;
        user: { id: string; displayName: string };
      }>('http://localhost:3000/login', loginUser);

      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });

      localStorage.setItem('auth-token', loginResponse.data.token);
      navigate('/Businesses');
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //         userData && navigate("/Businesses")
  // }
  // ,[])

  return (
  
    // <div className="login">
    //   <h2>Login</h2>
    //   {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
    //   <form onSubmit={submit}>
    //     <label>Email: </label>
    //     <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //     <label>Password: </label>
    //     <input
    //       type="password"
    //       id="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <input type="submit" value="Login" className="btn btn-primary" />
    //   </form>
    // </div>
    <>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={submit}>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          
        </div>
        <div className="mt-2">
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
            required className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" value="Login" className="flex w-full justify-center rounded-md bg-[#22d3ee] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>
  </div>
</div>
</>
  );
}

export default Login;
