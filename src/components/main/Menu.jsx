import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import './menu.css' 
import ModalVideo from 'react-modal-video'
import '../../../node_modules/react-modal-video/scss/modal-video.scss';

export default function Menu() {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
             <div className="col-2" id="side-a">
                    
                    <NavLink exact activeClassName="active_class" to="/" className="mb-3"><i className="fa fa-comments"></i>    Forum</NavLink>
                    <NavLink exact activeClassName="active_class" to="/challenges"><i className="fa fa-bullseye"></i>    Challenges</NavLink>
                    <br/>
                    <React.Fragment>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="2UZ7inMt_Fo" onClose={() => setOpen(false)} />
                        <button className="btn-primary" onClick={()=> setOpen(true)}>View Demo</button>
                    </React.Fragment>   
             </div>
        </>
    )
}
