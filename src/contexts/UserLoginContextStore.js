import React,{useState} from 'react'
import { loginContext } from './loginContext';
import axios from 'axios';
// import 

function UserLoginContextStore({children}) {
    let [currentUser,setCurrentUser] = useState({})
    let [error, setError] = useState("");
    let [userLoginStatus, setUserLoginStatus] = useState(false)
    // User Login
    const loginUser=(userCredObj)=>{
        axios.post("http://localhost:4000/users-api/login-user",userCredObj)
        .then(response=>{
            if(response.data.message==="Login Succesful"){
                // update current user state
                setCurrentUser({...response.data.user})
                // update login status
                setUserLoginStatus(true)
                //update error status
                setError("")
                // storing jwt token in local or session storage in the application tab in the dev tools    
                localStorage.setItem("token",response.data.token)
                // sessionStorage.setItem()
            }
            else{
                setError(response.data.message)
            }
        })
        .catch()
    }
    // User Logout
    const logoutUser=(userCredObj)=>{
        localStorage.clear()
        setUserLoginStatus(false)
        
    }
  return (
    <div>
        <loginContext.Provider value={[currentUser,error,userLoginStatus,loginUser,logoutUser]} >
            {children}
        </loginContext.Provider>

    </div>
  )
}

export default UserLoginContextStore