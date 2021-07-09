import React from 'react'
import '../main/posts.css'
export default function Posts({posts}) {
    return (
        <>
            <div className="container-sm">
               <div className="row mt-5" id="post-row">
                    {
                        posts.map(post => 
                            (
                                <div className="card col-12 mb-3" key={post.id} id="post-card">
                                    <ul className="list-group list-group-flush">
                                        <li  className="list-group-item">{post.description}</li>
                                    </ul>
                                </div>
                            )
                        )
                    }
               </div>
            </div>
        </>
    )
}
