import React from 'react'
import logo from '../../resources/logo.png'
import './header.css'
export default function header() {
    return (
        <>
            <div className="container-fluid d-flex d-flex justify-content-sm-around" id="head">

                <div className="mt-3">
                    <img className="logo" src={logo} alt="" />   
                </div>
                <div className="mt-4 form-div">
                    <form>
                        <i class="fa fa-search"></i>
                        <input type="text" placeholder="Search for Topics..." id="Search"/>
                    </form>
                </div>
                <div className="mt-4 login-btn">
                    <button>login</button>
                </div>
                

            </div>
        </>

    )
}
