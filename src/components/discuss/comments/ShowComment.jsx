import React,  { useState, useEffect } from 'react'
import axios from 'axios'
export default function ShowComment(props) {
    const [Comments, setComments] = useState([]);
    const [CmtLoading,  setCmtLoading] = useState(true);
    useEffect(() => {
        const fetchCmt = async () => {
            const res = await axios.get(`/fetch_comments/${props.answerId}`);
            setComments(res.data);
            setCmtLoading(false);
        }
        fetchCmt();

    }, [props.ShowComment]);
    
    return (props.ShowComment)?(
            <>
                <div className="card" id="cmt-card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <form className="row">
        
                                        <div className="col-9">
                                            <input type="text" className="form-control" placeholder="Add a comment ..."/>
                                        </div>
        
                                        <div className="col-3">
                                             <button type="submit" className="btn btn-primary mb-3" id="comments-submit-btn">Add a comment</button>
                                        </div>
                                    </form>
                                </li>
                                
                                {
                                    Comments.map(Comment => 
                                        <li className="list-group-item" key={Comment.cmd_id}>
                                            <div className="d-flex gap-3" id="discuss-profile">
                                                <img src={Comment.profile_pic} alt=""/>
                                                <div>
                                                    <h5 className="profile-name">{Comment.name}</h5>
                                                    <h5>{Comment.comment_date}</h5>
                                                </div>
                                            </div>
                                            <p className="discuss-light">{Comment.comment} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam pariatur ab commodi sequi sint? Non voluptate quas unde, natus iste amet quod numquam commodi, deserunt praesentium accusantium, ipsam illo. Saepe!</p>
                                        </li>
                                    )
                                }

                            </ul>
                 </div>
    
            </>
        ): "";

}
    

