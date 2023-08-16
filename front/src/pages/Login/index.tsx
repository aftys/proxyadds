import React, { useState, useContext } from 'react';
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
  const { setUserData } = useStateContext();
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
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
      <form onSubmit={submit}>
        <label>Email: </label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default Login;
