import React from 'react'
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';


const Login = (props) => {
    const[credentials,setCredentials]=useState({email:"",password:""});
    let history= useNavigate();
  
        const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ email:credentials.email, password:credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // save the auth toke and redirect
            localStorage.setItem('token',json.authToken);
            history("/")
            props.showAlert("Logged in Successfully","success")
        }else{
            props.showAlert("Invalid credentials","danger")
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }
    const style1={backgroundColor:"rgb(125,31,163)"};
    const style2={marginTop:"10px"}


    return (
        <>

        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" onChange={onChange}value={credentials.email} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password}id="password" name="password" placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary" style={{...style1,...style2}}>Submit</button>
                
            </form>
        </div>
        </>
    )
}

export default Login


