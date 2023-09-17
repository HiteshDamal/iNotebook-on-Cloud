import React  from 'react';
import {Link,useLocation}  from "react-router-dom";
import {  useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Navbar() {
    const location =useLocation();
    let history= useNavigate();
    const handleLogout =()=>{
        localStorage.removeItem('token')
        history("/login")


    }
    
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark bg-body-tertiary">
                <div className="container-fluid">
                    <Link className={`nav-link navbar-brand ${location.pathname==="/"?"active":""}`} to="/"style={{fontSize:'30px',border:"none"}}>iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className= {`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/"style={{fontSize:'25px'}} >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className= {`nav-link ${location.pathname==="/about"?"active":""}`} to="/about"style={{fontSize:'25px'}}>About</Link>
                            </li>
                        </ul>

                        {!localStorage.getItem('token')?<form className="d-flex" role="search">    
                        <Button component={Link} to="/SignUp" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" ,margin:"20px" }}>Sign up </Button>
                        <Button component={Link} to="/login" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem",margin:"20px" }}>Login </Button>
                       
                        </form>:<button onClick={handleLogout} className="btn btn-primary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem",margin:"20px" ,backgroundColor:"rgb(125,31,163)"}}>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

