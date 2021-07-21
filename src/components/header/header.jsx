import React from 'react'
import logo from '../../resources/logo.png'
import './header.css'
import {Link} from 'react-router-dom'
export default function Header() {
    return (
        <>
            <header>

                <div className="container" id="header-main">
                    <div className="row justify-content-around py-3">
                        <div className="col-2">
                            <img src={logo} alt="" />
                        </div>
                    <div className="col-6">
                            <div className="col-auto">
                                <label className="sr-only" htmlFor="searchInput">Username</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-search"></i></div>
                                    </div>
                                    <input type="text" className="form-control" id="searchInput" placeholder="Search for Topics ..."/>
                                </div>
                            </div>
                    </div>
                    <div className="col-3 header-login">
                            <div className="row justify-content-around">
                                <div className="col-2">
                                    <button className="btn btn-primary btn-sm" id="search-btn"><i className="fa fa-search"></i></button>
                                </div>
                                <div className="col-8">
                                       <Link to="/login">
                                <button class="btn btn-primary" type="submit" id="login-btn">Login</button>
                                      
                                      
                                      </Link> 
                                    
                                </div>
                            </div>
                    </div>

                    </div>
                </div>
             </header>
            
        </>

    )
}
