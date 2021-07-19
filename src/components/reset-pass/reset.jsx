import React from 'react'
import logo from '../../resources/logo.png'
import Illustration1 from '../../resources/reset.png'
import './reset.css'

export default function reset() {
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
                       <a href="" class=" e1" >Back to Login</a>
                       <div className="form-ap">
                         <form className="forget-1">
                            <div className="form-group mt-3">
                                <h5 id="t2">Reset Password</h5>
                                <p id="t3">Please choose your new password</p>
                                <label htmlFor="exampleInputEmail1">Password <em>*</em></label>
                                <input type="password" className="form-control" id="exampleInputPassword1"  placeholder="Enter 6 characters or more" required/>
                                <label htmlFor="exampleInputEmail1">Confirm Password <em>*</em></label>
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
