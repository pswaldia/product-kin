import React,{useState} from 'react'
import '../main/menu.css'
import ModalVideo from 'react-modal-video'
import '../../../node_modules/react-modal-video/scss/modal-video.scss';

export default function Menu({filterItem}) {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            <div className="col-2" id="menu-main">
                <div className="row">
                    <button type="button" className={localStorage.getItem("case_no") == 0 ? 'btn active': 'btn'} onClick={() => filterItem('all', 0)}>All</button>
                </div>
                <div className="row menu-btn mt-2">
                    <button type="button" className={localStorage.getItem("case_no") == 1 ? 'btn active': 'btn'}  onClick={() => {filterItem(true, 1);}}>Peers</button>
                </div>
                <div className="row menu-btn mt-2">
                    <button type="button" className={localStorage.getItem("case_no") == 2 ? 'btn active': 'btn'} onClick={() => filterItem(false, 2)}> Kin</button>
                </div>
                <br/>
                <br/>
                <div className="row menu-btn mt-2">
                    <React.Fragment>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="2UZ7inMt_Fo" onClose={() => setOpen(false)} />
                        <button className="btn video" onClick={()=> setOpen(true)}>View Demo <i class="fa fa-video-camera" aria-hidden="true"></i></button>
                    </React.Fragment>  
                </div>
            </div>
        </>
    )
}
