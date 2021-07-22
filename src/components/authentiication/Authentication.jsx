import React , {useState} from 'react'
import axios from 'axios';
import logo from '../../resources/logo.png'
import Illustration from '../../resources/Illustration.png'
import './authentication.css'
import { Link , NavLink} from 'react-router-dom'
export default function Authentication() {

window.addEventListener('resize', () => {

})

const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    function handleloginEmailChange(event) {
        setLoginEmail(event.target.value);
    }
    
    function handleloginPasswordChange(event) {
        setLoginPassword(event.target.value);
    }


    function handleLogin(event) {
        event.preventDefault();
        console.log(loginEmail, " ", loginPassword);

        const loginDetails = {
            email : loginEmail,
            password : loginPassword
        };

        console.log(loginDetails)

        axios.post('http://localhost:4000/login', loginDetails)
        .then(function (response) {
            console.log("inside response");
            console.log(response.data);
            // if(response.data.status === "true")
            // {
                  
            // }
        })
        .catch(function (error) {
            console.log(error);
        });

    }

return (
<>

    <div className="container-fluid">

        <div className="img mt-3">
            <img src={logo} alt="" />
        </div>

        <div className="text-center mt-2" id="main-hd">
            <p>A place to share knowledge and to be competent related for the product Roles in the world</p>
        </div>


        <div className="row justify-content-around mt-5">

            <div className="col-6" id="illustration">
                <img src={Illustration} alt="" />
            </div>

            <div className="col-4 form-main">
                <div className="form-ap">
                    <input type="checkbox" className="btn-main " />
                    <form className="login">
                        <div className="login">
                            <p>Doesn’t have an account yet? <a href="">Sign Up</a></p>
                            <div className="form-group mt-3">
                                <label htmlFor="InputEmail">Email</label>
                                <input type="email" className="form-control" id="InputEmail"
                                    placeholder="xyz@example.com" />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="InputPassword">Password</label>
                                <input type="password" className="form-control" id="InputPassword"
                                    placeholder="Enter 6 characters or more" required />
                            </div>
                            <div className="form-check mt-3">
                                <div className="row row justify-content-between ">
                                    <div className="col-4">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                    </div>
                                    <div className="col-4">
                                        <Link exact to="/login/forget">Forgot Password</Link>
                                    </div>
                                </div>
                            </div>
                            {/* <NavLink exact to="/"> */}
                                <button type="submit" className="btn btn-primary mt-3" id="login-2">Login</button>
                            {/* </NavLink> */}
                            <h6 className="mt-4"><span>or login with</span></h6>

                            {/* <div className="d-flex justify-content-around icons-btn">
                                <div>
                                    <button><i className="fa fa-linkedin"></i></button>
                                </div>
                                <div>
                                    <button><i className="fa fa-google"></i></button>
                                </div>
                                <div>
                                    <button><i className="fa fa-facebook"></i></button>
                                </div>

                            </div> */}
                            <button type="submit" className="btn btn-primary mt-3" id="login-3"><i className="fa fa-google"></i> <span>
                                Sign In with Google </span></button>
                        </div>
                    </form>
                    <form className="signup">
                        <div className="signup">


                            <div className="form-group mt-4">
                                <label htmlFor="name">Name <span style={{color: "red"}}>*</span></label>
                                <input type="text" className="form-control" id="exampleInputEmail1"
                                    placeholder="John Bid" />
                            </div>
                            <div className="form-group mt-1">
                                <label htmlFor="exampleInputEmail1">Email <em>*</em></label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                    placeholder="xyz@example.com" required />
                            </div>
                            <div className="form-group mt-1">
                                <label htmlFor="exampleInputPassword1">Password <em>*</em></label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                    placeholder="Enter 6 characters or more" required />
                            </div>
                            <div className="form-group mt-1">
                                <label htmlFor="exampleInputPassword1">Confirm Password <em>*</em></label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                    placeholder="Enter 6 characters or more" required />
                            </div>
                            <div className="form-check mt-2">
                                <div className=" row row justify-content-around ">
                                    <div className="">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Yes, I want to
                                            receive updates on the new challenges</label>
                                    </div>

                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3" id="login-2">Signup</button>
                        </div>
                    </form>

                </div>
            </div>

        </div>


    </div>
</>
)
}
