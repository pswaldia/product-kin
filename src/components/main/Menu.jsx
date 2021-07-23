import React from 'react'
import { NavLink } from 'react-router-dom'
import './menu.css'
export default function Menu() {
    return (
        <>
             <div className="col-2" id="side-a">
                        <NavLink exact activeClassName="active_class" to="/" className="mb-3"><i className="fa fa-comments"></i>    Forum</NavLink>
                        <NavLink exact activeClassName="active_class" to="/challenges"><i className="fa fa-bullseye"></i>    Challenges</NavLink>
             </div>
        </>
    )
}
