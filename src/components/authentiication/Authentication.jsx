import React from 'react'
import logo from '../../resources/logo.png'
import Illustration from '../../resources/Illustration.png'
export default function Authentication() {
    return (
        <>
            <div className="container-fluid">

                <div className="img mt-3">
                    <img src={logo} alt=""/>    
                </div>

                <div className="row justify-content-around mt-5">

                    <div className="col-6">
                        <img src={Illustration} alt=""/>    
                    </div>

                    <div className="col-4 form-main">
                        <form>
                        <input type="checkbox" className="btn-main "  />
                        <div className="login">
                            <p>Doesn’t have an account yet? <a href="">Sign Up</a></p>
                            <div className="form-group mt-3">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"  placeholder="xyz@example.com"/>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"  placeholder="Enter 6 characters or more"/>
                            </div>
                            <div className="form-check mt-3">
                                <div className="row row justify-content-between ">
                                    <div className="col-4">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                    </div>
                                    <div className="col-4">
                                        <a href="">Forgot Password</a>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3" id="login-2">Login</button>
                            <h6 className="mt-4"><span>or login with</span></h6>

                            <div className="d-flex justify-content-around icons-btn">
                                <div>
                                    <button><i className="fa fa-linkedin"></i></button>
                                </div>
                                <div>
                                    <button><i className="fa fa-google"></i></button>
                                </div>
                                <div>
                                    <button><i className="fa fa-facebook"></i></button>
                                </div>
                                
                            </div>
                         </div>
                         <div className="signup">
                           
                    
                       <div className="form-group mt-4">
                                <label htmlFor="name">Name <span style={{color: "red"}}>*</span></label>
                                <input type="text" className="form-control" id="exampleInputEmail1"  placeholder="John Bid" />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="exampleInputEmail1">Email *</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"  placeholder="xyz@example.com" />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="exampleInputPassword1">Password *</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"  placeholder="Enter 6 characters or more" />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="exampleInputPassword1">Confirm Password *</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"  placeholder="Enter 6 characters or more"/>
                            </div>
                            <div className="form-check mt-3">
                                <div className=" row row justify-content-around ">
                                    <div className="">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                        <label className="form-check-label" htmlFor="exampleCheck1">Yes, I want to receive updates on the new challenges</label>
                                    </div>
                                   
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3" id="login-2">Signup</button>
                            
                            
                       </div>
                        </form>
                    </div>

                </div>


            </div>
        </>
    )
}
