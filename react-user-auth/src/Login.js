import { useRef, useState, useEffect } from "react";
import React from 'react';
import AuthContext from "./context/AuthProvider";
import axios from "./api/axios";

const LOGIN_URL = "/auth";

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

     useEffect(() => {
        userRef.current.focus();
     }, [])

     useEffect(() => {
        setErrMsg("");
     }, [user, password])

     const handleSubmit = async (e) => {
        e.preventDefault();
     
        try{
            const response = await axios.post(LOGIN_URL,
              JSON.stringify({ user, password }), 
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              } 
              );
              console.log(JSON.stringify(response?.data));
              // console.log(JSON.stringify(response));
              const accessToken = response?.data?.accessToken
              const roles = response?.data?.roles;
              setAuth({ user, password, roles, accessToken })
              setUser("");
              setPassword("");
              setSuccess(true);
        } catch (err) {
              if (!err?.response){
                  setErrMsg("No server Response");
              }  else if (err.response?.status === 400) {
                   setErrMsg("Missing Username or Password") 
              } else if (err.response?.status === 401){
                   setErrMsg("Unauthorized");
              }  else {
                   setErrMsg("Login Failed"); 
              }
              errRef.current.focus();
        }
     }


  return (
    <>
       {success ? (
        <section className="success--msg">
            <h1>You are logged in!</h1>
            <br />
            <p>
                <a href="#">Go to Home</a>
            </p>
        </section> 
       ) : ( 
     <section className="form-sign">
       <p ref={errRef} className={errMsg ? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" ref={userRef} autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
             value={user}
             required
             />
             
        <label htmlFor="password" className="pswd">Password:</label>
        <input type="password" id="password" autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
             value={password}
             required
             />    
             <button>Sign in</button>
      </form>
      <p className="footer">
        Need an Account?<br />
        <span className="line">
            {/*put router link here */}
          <a href="#">Sign up</a>  
        </span>
      </p>
    </section>
       )}
    </>
  )
}



export default Login