import React, {useState}  from 'react'
import '../main/posts.css'
import banner from '../../resources/banner.jpg'
import Leaderboard from './Leaderboard'
import { Link } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalVideo from 'react-modal-video'
import '../../../node_modules/react-modal-video/scss/modal-video.scss';

toast.configure();

export default function Posts({posts, setTrigger}) {
    const [isOpen, setOpen] = useState(false)
    function render(cond){
        if(cond)
            return (
                    <div class="block-peer">
                        <p id = "peer-practice">Peers </p>
                    </div>
            )
        else{
            return (
                    <div class="block-practice">
                        <p id = "peer-practice">Kin </p>
                    </div>
            )
        }
    }
    function checkSignedIn(){
        console.log(posts)
        var userprofilepic = localStorage.getItem('profile_pic')
        if(userprofilepic && userprofilepic.length>0){
            setTrigger(true);
        }
        else
            toast.error("Please Login to Ask Question", {position : toast.POSITION.TOP_CENTER});
    }

    return (
        <>  
             <div className="col-6">

                <div className="card mb-3" id="banner"> 
                    <img id="image" src={banner} alt="" />
                    <div id="text">
                        <h2>Learn from the Kin</h2> 
                        <h2>Practice with the Peers</h2>
                        <h2>Compete with the</h2>
                        <h2>Community</h2>
                    </div>
                    <React.Fragment>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="2UZ7inMt_Fo" onClose={() => setOpen(false)} />
                        <button className="btn video" onClick={()=> setOpen(true)}><i class="fa fa-play" aria-hidden="true"></i> Get Started</button>
                    </React.Fragment>  
                </div>

                {    
                     posts.map(post => 
                        (
                            // <div className="card mb-3" key={post.ques_id} id="post-card">
                                <div id="post-card" key={post.ques_id} className="container mb-3">
                                    <div className="row">
                                        <div className = "col-md-10 h-80 que-content">
                                            <p id="que-box"><Link to={`/discuss/${post.ques_id}`}><div dangerouslySetInnerHTML={{ __html: post.question }}></div></Link></p>
                                        </div>
                                        <div id="case-type" className = "col-md-2 h-80">
                                                {render(post.peer_cases)}
                                        </div>  
                                    </div>
                                </div>

                            // </div>
                         )
                    )
                }

            </div>

            <div className="col-3">
                <button type="button" className="btn btn-primary mb-3" id="ask-btn" onClick={checkSignedIn}>+   Ask a Question</button>
                <Leaderboard/>
            </div>
                       
        </>
    )
}
/*

<div className="container">
    <div className="row">
        <div className = "col md-8">
            <ul className="list-group list-group-flush">
                <li  id="que-box" className="list-group-item"><Link to={`/discuss/${post.ques_id}`}>{post.question}</Link></li>
            </ul>
        </div>
        <div className = "col md-4">
            <p>Practice case</p>
        </div>
    </div>
</div>

*/