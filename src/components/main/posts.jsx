import React from 'react'
import '../main/posts.css'
import banner from '../../resources/banner.jpg'
import Leaderboard from './Leaderboard'
import { Link } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default function Posts({posts, setTrigger}) {

    function checkSignedIn(){
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
                    <h2 id="text"><span>The internet is</span><br/><span>now a forum for</span>
                    <br/><span>for public prosecution</span>
                    </h2>
                </div>

                {
                     posts.map(post => 
                        (
                            <div className="card mb-3" key={post.ques_id} id="post-card">
                                <ul className="list-group list-group-flush">
                                    <li  className="list-group-item"><Link to={`/discuss/${post.ques_id}`}>{post.question}</Link></li>
                                </ul>
                            </div>
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
