import React from 'react'
import { useState } from 'react';
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { loginContext } from '../../contexts/loginContext';
import { useEffect } from 'react';

function Login() {

  let [currentUser,error,userLoginStatus,loginUser,logoutUser] = useContext(loginContext)
  let { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  // let [err, setErr] = useState("");
  const handleLoginUser=(userCredObj)=>{
    // console.log(userCredObj)
    loginUser(userCredObj)
  }
  
  useEffect(()=>{
    if(userLoginStatus==true){
      navigate("/user-profile")
    }
  },[userLoginStatus])

  console.log("current user is ",currentUser)

  return (
    <div>
      <h1 className='text-center'>Login</h1>
      <div className="d-flex justify-content-center row">
        <div className="container w-25 border border-dark rounded">
          <form onSubmit={handleSubmit(handleLoginUser)}>
            <div className="form-group mb-2">
              <label for="username">Username</label>
              <input
                type="text"
                className="form-control font-weight-bold"
                id="username"
                placeholder="Username"
                {...register("username")}
              />
              <p className="text-danger">{error}</p>
            </div>
            <div className="form-group mb-2">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control font-weight-bold"
                id="password"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            <div className="mb-2">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login