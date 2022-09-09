import { useRef, useState, useEffect } from "react";
import React from 'react'
import {useUserContext } from "./context/userContext";

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const { User, logOut }  = useUserContext();
    const logIn = useUserContext();
    const onSubmit = (data) => {
      logIn(data.username);
      console.log("form data", data);
    }



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
        console.log(user, password);
        setUser("");
        setPassword("");
        setSuccess(true);
     }


  return (
    <>
       {success ? ( 
        <section className="success--msg">
            <h1>Welcome,{User.name} You are logged in!</h1>
            <br />
            <p>
                <a href="#">Go to Home</a>
            </p>
        </section> 
       ) : ( 
     <section className="form-sign">
       <p ref={errRef} className={errMsg ? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className="form-tab">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" ref={userRef} autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
             value={user}
             required
             />
             
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
             value={password}
             required
             />    
             <button onClick={onSubmit}>Sign in</button>
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