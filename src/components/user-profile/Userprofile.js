import React from 'react'
import { useContext } from "react";
import { loginContext } from "../../contexts/loginContext";
import axios from 'axios';
import { useState } from 'react';

function Userprofile() {
  let [currentUser,error,userLoginStatus,loginUser,logoutUser] = useContext(loginContext)
  let [data,setData] = useState("")
  let [err,setErr] = useState("")

  const getProtectedData=()=>{

    // get token from local storeage
    let token = localStorage.getItem('token')
    axios.get("http://localhost:4000/users-api/test",{headers:{"Authorization":"Beared "+token}})
    .then(
      response=>{
        setData(response.data.message)
      }
    )
    .catch(err=>{
      setErr(err.message)
    })
  }

  return (
    <div>
      <button onClick={getProtectedData}>Get data</button>
      <p>{data}</p>
    </div>
  )
}

export default Userprofile