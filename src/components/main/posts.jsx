import React, {useState}  from 'react'
import '../main/posts.css'
import banner from '../../resources/banner.jpg'
import Leaderboard from './Leaderboard'
import { Link } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default function Posts({posts, setTrigger}) {

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
                    <h2 id="text"><span>Learn from the Kin</span><br/><span>Practice with the Peers</span>
                    <br/><span> Compete with the Community </span>
                    </h2>
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