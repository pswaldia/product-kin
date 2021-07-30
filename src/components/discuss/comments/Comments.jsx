import React,  { useState} from 'react'
import ShowComment from './ShowComment'
import '../comments/comments.css'

export default function Comments(props){
    const [ShowComments, setShowComments] = useState(false);
    return(
        <>
            <div className="discuss-cmt-main mt-3 mb-1">
                <button type="button" className="btn btn-link" onClick={() => setShowComments(!ShowComments)}>Comments</button>
            </div>
            <ShowComment ShowComment={ShowComments} answerId = {props.answerId}/>
        </>
    ) 
}
