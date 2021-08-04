import React, {useState , useEffect} from 'react'
import logo from '../../resources/logo.png'
import './header.css'
import { NavLink } from 'react-router-dom'
export default function Header() {
    
    const [userPic , setUserPic] = useState(''); //header me logged in status ke hisaab se button display krna hai
    useEffect(() =>{
        var userprofilepic = localStorage.getItem('profile_pic')
        if(userprofilepic && userprofilepic.length>0){
        setUserPic(userprofilepic)
        }
    })
    function handleLogout(event){
        localStorage.removeItem("accessToken");
        localStorage.removeItem("name");
        localStorage.removeItem("profile_pic");
        window.location="/";

    }

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
                                {
                                    userPic == "" ? (
                            <NavLink exact to="/login">
                                <button className="btn btn-primary" type="submit" id="login-btn">Login</button>
                            </NavLink>

                                    ):(
                                        
                                        <div className="dropdown">
                                        <input type="image" src={userPic} id="profile-pic"/>
                                        <div class="dropdown-content">
                                        <a href="#" onClick={handleLogout}>Logout</a>
                                        </div>  
                                        </div> 
                                    )
                                }
                            
                            </div>
                    </div>

                    </div>
                </div>
             </header>
            
        </>

    )
}