import React, {useState} from 'react';
import axios from 'axios';
import logo from '../../../resources/logo.png'
import Illustration1 from '../../../resources/Illustration1.png'
import './forget.css'
import { Link } from "react-router-dom";

export default function Forget() {

    const [message, setMessage] = useState("");
    const [forgotEmail, setForgotEmail] = useState("");
    const [FtoggleOn, setFToggleOn]= useState(false)

    function handleForgotEmailChange(event) {
        setForgotEmail(event.target.value);
    }

    function handleForgotEmail(event) {
        event.preventDefault();
        setFToggleOn(!FtoggleOn)
        console.log(forgotEmail);

        const forgotEmailDetails = {
            email : forgotEmail,
        };

        console.log(forgotEmailDetails)

        axios.post('/forgot-password', forgotEmailDetails)
        .then(function (response) {
            console.log("inside response");
            console.log(response.data);
            alert(response.data.message);
            window.location="/login"
        })
        .catch(function (error) {
            console.log(error);
        });

    }


    return (
        <>
        
            <div className="container-fluid">

                <div className="img mt-3">
                    <img src={logo} alt=""/>    
                </div>
                <p id="banner-hd">A place to share knowledge and to be competent related for the product Roles in the world</p>

                <div className="row justify-content-around mt-5">

                    <div className="col-6" id="Illustration1">
                        <img src={Illustration1} alt=""/>    
                    </div>
 
                    <div className="col-4 form-main" id="forget_password_main">
                       <Link to='/login' className="e1" >Back to Login</Link>
                       <div className="form-ap">
                         <form className="forget-1" onSubmit={handleForgotEmail}>
                            <div className="form-group mt-3" id="forget_password_field">
                                <h5 id="t2">Forget Password</h5>
                                <p id="t3">Send a link to your email to reset the password</p>
                                <label id="f" htmlFor="exampleInputEmail1">Email <em>*</em></label>
                                <input type="email" className="form-control" id="exampleInputEmail1"  placeholder="xyz@example.com"
                                    onChange = {handleForgotEmailChange} value={forgotEmail} required
                                />
                                {/* {message} */}
                            </div>
                           
                            <button type="submit"   className="btn btn-primary mt-3" id="login-2" required><span>SEND RESET LINK</span>&nbsp;{FtoggleOn ? <i class="fa fa-spinner fa-spin" ></i> :"" }</button>
                            
                         </form>
                        </div>
                         
                    </div>
                </div>

            </div>


            
        </>
    )
}