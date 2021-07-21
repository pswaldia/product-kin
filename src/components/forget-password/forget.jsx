import React from 'react'
import logo from '../../resources/logo.png'
import Illustration1 from '../../resources/Illustration1.png'
import './forget.css'
import { Link } from "react-router-dom";

export default function Forget() {
    return (
        <>
        
            <div className="container-fluid">

                <div className="img mt-3">
                    <img src={logo} alt=""/>    
                </div>
                <p id="banner">A place to share knowledge and to be competent related for the product Roles in the world</p>

                <div className="row justify-content-around mt-5">

                    <div className="col-6">
                        <img src={Illustration1} alt=""/>    
                    </div>
 
                    <div className="col-4 form-main">
                       <Link to='/login' class=" e1" >Back to Login</Link>
                       <div className="form-ap">
                         <form className="forget-1">
                            <div className="form-group mt-3">
                                <h5 id="t2">Forget Password</h5>
                                <p id="t3">Send a link to your email to reset the password</p>
                                <label id="f" htmlFor="exampleInputEmail1">Email <em>*</em></label>
                                <input type="email" className="form-control" id="exampleInputEmail1"  placeholder="xyz@example.com"/>
                            </div>
                           
                            <button type="submit"   className="btn btn-primary mt-3" id="login-2" required>SEND RESET LINK</button>
                            
                         </form>
                        </div>
                         
                    </div>
                </div>

            </div>


            
        </>
    )
}
