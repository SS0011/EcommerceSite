import React, { useState, useEffect } from 'react';
import style from './Login.module.css';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
  const data = {
    userName: '',
    password: '',
  };

  const [check, setCheck] = useState(false);
  const [allUserData, setAllUserData] = useState([]);
  const [userData, setUserData] = useState(data);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let data = Cookies.get('allUserData');
    let user = Cookies.get('user');
    if (data) {
      setAllUserData(JSON.parse(data));
    }
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);


  const handleLogin = () => {
    const regiteredUser = allUserData.find(
      (data) => data.userName === userData.userName
    );
    if (regiteredUser && regiteredUser.password !== userData.password) {
      setError('Wrong Password');
    } else if (!regiteredUser) {
      alert('You are not Register');
    } else {
      alert('Login Successfully');
      navigate('/home');
    }

    if (check && regiteredUser) {
      Cookies.set('user', JSON.stringify(userData));
    } else {
      Cookies.set('user', JSON.stringify(data));
    }
    console.log(regiteredUser, 'find');
  };

  useEffect(() => {
    setError('');
  }, [userData]);

  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <div className={style.container}>
       <div className={style.form}>
      <div className={style.left}>
        <img src="https://imgur.com/ACIyhde.jpg"/>
        </div>
        <div className={style.right}>
          <h2>Welcome To Nostra</h2>
      <p className={style.today}>Login</p>
      <input
        type="text"
        placeholder="Username"
        value={userData.userName}
        onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
        className={style.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        className={style.input}
      />
      <label className={style.remember}>
        <input type="checkbox" checked={check} onChange={handleCheck} />
        Remember Me
      </label>
      <p className={style.error}>{error}</p>
      <button onClick={handleLogin}>Login</button>
      </div></div>
    </div>
  );
}
