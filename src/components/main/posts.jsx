import React from 'react'
import '../main/posts.css'
import banner from '../../resources/banner.jpg'
import Leaderboard from './Leaderboard'
export default function Posts({posts}) {
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
                            <div className="card mb-3" key={post.id} id="post-card">
                                <ul className="list-group list-group-flush">
                                    <li  className="list-group-item"><a href="">{post.description}</a></li>
                                </ul>
                            </div>
                         )
                    )
                }

            </div>

            <div className="col-3">
                <button type="button" class="btn btn-primary mb-3" id="ask-btn">+   Ask a Question</button>
                 <Leaderboard/>
            </div>
                       
        </>
    )
}
