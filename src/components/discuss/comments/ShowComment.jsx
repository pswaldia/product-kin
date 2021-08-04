import React,  { useState, useEffect } from 'react'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../comments/comments.css'

toast.configure();

export default function ShowComment(props) {
    const [Comments, setComments] = useState([]);
    const [CmtLoading,  setCmtLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [toggleOn, setToggleOn]= useState(false)

    useEffect(() => {
        const fetchCmt = async () => {
            const res = await axios.get(`/fetch_comments/${props.answerId}`);
            setComments(res.data);
            setCmtLoading(false);
        }
        fetchCmt();

    }, [props.ShowComment]);

    function handleCommentChange(event){
        setNewComment(event.target.value);
    }


    function addNewComment(event){
        event.preventDefault();
        console.log(newComment);
        setToggleOn(!toggleOn);
        var userprofilepic = localStorage.getItem('profile_pic')
        if(!(userprofilepic && userprofilepic.length>0)){
            toast.error("Please Login to Add comment", {position : toast.POSITION.TOP_CENTER});
            setToggleOn(false);
        }   
        else if(newComment === ""){
            toast.error("Please enter your comment before submitting", {position : toast.POSITION.TOP_RIGHT});
            setToggleOn(false);
        }
        else{
            const commentDetails = {
                ans_id : props.answerId,
                comment : newComment
            };
            const token = localStorage.getItem("accessToken");
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            
            console.log(token);
            axios.post('/add_comment', commentDetails, config)
            .then(function (response) {
                console.log("inside commentDetails response");
                console.log(response.data);
                const fetchCmt = async () => {
                    const res = await axios.get(`/fetch_comments/${props.answerId}`);
                    setComments(res.data);
                    setCmtLoading(false);
                    toast.success("Comment added successfully", {position : toast.POSITION.TOP_RIGHT});
                    setToggleOn(false);
                    setNewComment("");
                }
                fetchCmt();
                
            })
            .catch(function (error) {
                console.log(error);
            });
        } 
    }
    
    return (props.ShowComment)?(
            <>
                <div className="card" id="cmt-card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <form className="row" onSubmit={addNewComment}>
        
                                        <div className="col-9">
                                            <input type="text" className="form-control" onChange={handleCommentChange} value={newComment} placeholder="Add a comment ..."/>
                                        </div>
        
                                        <div className="col-3">
                                             <button type="submit" className="btn btn-primary mb-3" id="comments-submit-btn">&nbsp;{toggleOn ? <span>Adding...&nbsp;<i class="fa fa-spinner fa-spin" ></i></span> :<span>Add a Comment</span> }</button>
                                        </div>
                                    </form>
                                </li>
                                
                                {
                                    Comments.map(Comment => 
                                        <li className="list-group-item" key={Comment.cmd_id}>
                                            <div className="d-flex gap-3" id="discuss-profile">
                                                <img src={Comment.profile_pic} alt="" id="profile-pic"/>
                                                <div>
                                                <h5 className="profile-name"><div dangerouslySetInnerHTML={{ __html: Comment.name }}></div></h5>
                                                    <h5>{Comment.comment_date}</h5>
                                                </div>
                                            </div>
                                            <p className="discuss-light">{Comment.comment} </p>
                                        </li>
                                    )
                                }

                            </ul>
                 </div>
    
            </>
        ): "";

}
    

