import React from 'react'
import { useState } from 'react';
import {  useNavigate} from 'react-router-dom';


const SignUp = (props) => {
  const[credentials,setCredentials]=useState({name:"",email:"",password:""});
    let history= useNavigate();
    
  
        const handleSubmit = async (e) => {

        e.preventDefault();
        const {name,email,password}=credentials
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
               },
            body: JSON.stringify({name,email,password} ),
        });
        const json = await response.json();
        console.log(json);
      
        if(json.success){
            localStorage.setItem('token',json.authToken);
            history("/")
            props.showAlert("Account created successfully","success")

        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }
    const style1={backgroundColor:"rgb(125,31,163)"};
    const style2={marginTop:"10px"}
  return (
    <div>
     <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp" placeholder="Enter Your Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="password" name="password" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="cpassword" name="cpassword" placeholder="Confirm Password" />
                </div>

                <button type="submit" className="btn btn-primary" style={{...style1,...style2}}>Submit</button>
            </form>
        </div>
  
  )
}

export default SignUp

