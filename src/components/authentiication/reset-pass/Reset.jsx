import React from 'react'
import logo from '../../../resources/logo.png'
import Reset from '../../../resources/reset.png'
import './reset.css';
import { Link } from "react-router-dom";
export default function reset() {
    return (
        <>
        
            <div className="container-fluid">

                <div className="img mt-3">
                    <img src={logo} alt=""/>    
                </div>
                <p id="banner-hd">A place to share knowledge and to be competent related for the product Roles in the world</p>

                <div className="row justify-content-around mt-5">

                    <div className="col-6" id="reset_img">
                        <img src={Reset} alt=""/>    
                    </div>
 
                    <div className="col-4 form-main" id="reset_password_main">
                    <Link to='/login' class=" e1" >Back to Login</Link>
                       <div className="form-ap">
                         <form className="forget-1">
                            <div className="form-group mt-3">
                                <h5 id="t2">Reset Password</h5>
                                <p id="t3">Please choose your new password</p>
                                <label id ="g" htmlFor="exampleInputEmail1">Password <em>*</em></label>
                                <input type="password" className="form-control" id="exampleInputPassword1"  placeholder="Enter 6 characters or more" required/>
                                <label id ="g" htmlFor="exampleInputEmail1">Confirm Password <em>*</em></label>
                                <input type="password" className="form-control" id="exampleInputPassword1"  placeholder="Enter 6 characters or more" required/>
                            </div>
                           
                            <button type="submit"   className="btn btn-primary mt-3" id="login-2" required>SAVE NEW PASSWORD</button>
                            
                         </form>
                        </div>
                         
                    </div>
                </div>

            </div>


            
        </>
    )
}
