import { Button } from 'bootstrap';
import React, { useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";

// import { useLocation } from 'react-router-dom';

function Navbar(props) {

    let location = useLocation();
    const setActiveLink = (locc) => {
        let cla = "";
        cla = (locc === '/') ? "home" : locc.slice(1);

        const allLinks = document.getElementsByClassName('nav-link');
        // to remove the active links from all the nav items 
        for (let i = 0; i < allLinks.length; i++) {
            allLinks[i].classList.remove('active');
        }
        // // to add the active link to the the selected link
        const allAdded = document.getElementsByClassName(cla);
        for (let i = 0; i < allAdded.length; i++) {
            allAdded[i].classList.add('active');
        }
    }
    const handleOnLogout = () =>{
        localStorage.setItem('token' , '');
    }

    setActiveLink(location.pathname);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand home" to="/">{props.title}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link home active " aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link about" to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') && <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
                        </form>}
                        {
                            localStorage.getItem('token') &&
                            <Link className="btn btn-primary mx-2" to="/login" onClick={handleOnLogout} role="button">Logout</Link>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
