import React, {useState} from 'react'
import logo from '../../resources/logo.png'
import './header.css'
import { NavLink } from 'react-router-dom'
export default function Header() {
    
    const [isLoggedIn , setIsLoggedIn] = useState('false'); //header me logged in status ke hisaab se button display krna hai

    return (
        <>
            
            <header>
                
                <div className="container" id="header-main">
                    <div className="row justify-content-between py-3">
                        <div className="col-2">
                            <img src={logo} alt="productkin logo" />
                        </div>
                    <div className="col-2 header-login">
                            <div className="row justify-content-around">
                            <NavLink exact to="/login">
                                <button className="btn btn-primary" type="submit" id="login-btn">Login</button>
                            </NavLink>
                            
                            </div>
                    </div>

                    </div>
                </div>
             </header>
            
        </>

    )
}
