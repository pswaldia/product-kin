import React, {useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import logo from '../../../resources/logo.png'
import ResetImg from '../../../resources/reset.png'
import './reset.css';
import { Link } from "react-router-dom";

export default function Reset() {

    const [resetPassword, setResetPassword] = useState("");
    const [resetPassword2, setResetPassword2] = useState("");
    const [message, setMessage] = useState("");

    const {id, token} = useParams();

    function handleResetPasswordChange(event) {
        setResetPassword(event.target.value);
    }

    function handleResetPassword2Change(event) {
        setResetPassword2(event.target.value);
    }

    function handleResetPassword(event) {
        event.preventDefault();
        
        console.log(id, " ", token);
        //console.log(signupName, " ", signupEmail, " ", signupPassword, " ", signupPassword2);

        if(resetPassword.length < 6)
            setMessage("Password should have atleast 6 characters");
        else if(resetPassword !== resetPassword2)
            setMessage("Password and Confirm Password must be same");
        else{
            const resetPasswordDetails = {
                password : resetPassword
            };
    
            console.log(resetPasswordDetails);
            
            axios.post(`/login/reset/${id}/${token}`, resetPasswordDetails)
            .then(function (response) {
                console.log("inside response");
                console.log(response.data);
                setMessage(response.data.message);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }


    return (
        <>
        
            <div className="container-fluid">

                <div className="img mt-3">
                    <img src={logo} alt=""/>    
                </div>
                <p id="banner-hd">A place to share knowledge and to be competent related for the product Roles in the world</p>

                <div className="row justify-content-around mt-5">

                    <div className="col-6" id="reset_img">
                        <img src={ResetImg} alt=""/>    
                    </div>
 
                    <div className="col-4 form-main" id="reset_password_main">
                    <Link to='/login' class=" e1" >Back to Login</Link>
                       <div className="form-ap">
                         <form className="forget-1" onSubmit = {handleResetPassword}>
                            <div className="form-group mt-3">
                                <h5 id="t2">Reset Password</h5>
                                <p id="t3">Please choose your new password</p>
                                <label id ="g" htmlFor="exampleInputEmail1">Password <em>*</em></label>
                                <input type="password" className="form-control" id="exampleInputPassword1"  placeholder="Enter 6 characters or more" onChange = {handleResetPasswordChange} value={resetPassword} required/>
                                <label id ="g" htmlFor="exampleInputEmail1">Confirm Password <em>*</em></label>
                                <input type="password" className="form-control" id="exampleInputPassword1"  placeholder="Enter 6 characters or more" onChange = {handleResetPassword2Change} value={resetPassword2} required/>
                                {message}
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
