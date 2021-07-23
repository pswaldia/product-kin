import React, {useState} from 'react'
import logo from '../../resources/logo.png'
import './header.css'
import { NavLink } from 'react-router-dom'
export default function Header() {
    
    const [isLoggedIn , setIsLoggedIn] = useState(false);

    const checkAuthenticated = () => {
        localStorage.getItem("user_id") == null ? setIsLoggedIn(false) : setIsLoggedIn(true);
        // console.log("he");
        // if(isLoggedIn)
        //     return <NavLink exact to="/login">
        //                 <button className="btn btn-primary" type="submit" id="login-btn">Login</button>
        //             </NavLink>
        // else
        //     return <h1> NO </h1>;
    }

    return (
        <>
            <header>

                <div className="container" id="header-main">
                    <div className="row justify-content-between py-3">
                        <div className="col-2">
                            <img src={logo} alt="" />
                        </div>
                    <div className="col-2 header-login">
                            <div className="row justify-content-around">
                            {isLoggedIn ? 
                                <NavLink exact to="/login">
                                    <button className="btn btn-primary" type="submit" id="login-btn">Login</button>
                                </NavLink> : <h1> Logo here </h1>
                                }
                            </div>
                    </div>

                    </div>
                </div>
             </header>
            
        </>

    )
}
