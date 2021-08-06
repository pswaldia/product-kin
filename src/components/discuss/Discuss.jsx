import React, { useState, useEffect } from 'react'
import { Modal, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Leaderboard from '../main/Leaderboard';
import '../discuss/discuss.css'
import Comments from '../discuss/comments/Comments'
import Answer from './answer/Answer';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default function Discuss() {
    const [quesLoading, setQuesLoading] = useState(true);
    const [ansLoading, setAnsLoading] = useState(true);
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [showAnswerEditor, setShowAnswerEditor] = useState(false);
    const [showHintModal, setShowHintModal] = useState(false);
    const [clipboardValue, setClipBoardValue] = useState(window.location.href);
    const [formattedAns, setFormattedAns] = useState("");

    const handleHintClose = () => setShowHintModal(false);
    const handleHintShow = () => setShowHintModal(true);

    const {id} = useParams();

    useEffect(() => {
        const fetchQues = async () => {
            const res = await axios.get(`/discuss/get_question/${id}`);
            setQuestion(res.data);
            setQuesLoading(false);
        }
        fetchQues();
    }, []);


    useEffect(() => {
        const fetchAns = async () => {
            const res = await axios.get(`/discuss/fetch_answers/${id}`);
            setAnswers(res.data);
            setAnsLoading(false);
        }
        fetchAns();
    }, []);

    const handleAnswerButtonClick = () =>{
        var userprofilepic = localStorage.getItem('profile_pic')
        if(!(userprofilepic && userprofilepic.length>0)){
            toast.error("Please Login to Add Answer", {position : toast.POSITION.TOP_CENTER});
        }   
        else{
            setShowAnswerEditor(!showAnswerEditor);
        }
    }

    // const resolveAnswer = (val) => {
    //     const a = document.getElementById("ansSection");
    //     a.innerHTML = `<p>val</p>`
    // }

    function createMarkup(val) {
        return {__html: val};
      }

    const formatString=(val)=>{
        //return val;
        //let temp=val;
        //temp=temp.replaceAll('&nbsp;', '<br>');
        return <div dangerouslySetInnerHTML={{ __html: val }}></div>;
    }

    if(quesLoading || ansLoading){
        return (
            <div className="col-12 discuss-loader text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    else{

        return (
        
            <>
                <div className="col-8 mb-5 mr-5">
                    <div className="card mb-3" id="discuss-main">
                            <ul className="list-group list-group-flush">
                                
    
                                <li  className="list-group-item">
    
                                    <p className="discuss-bold">{question.question}</p>
                                    <div className="row justify-content-between">
                                        <div className="col-4 d-flex justify-content-around">
                                            <button type="button" className="btn btn-light discuss-btn" id="discuss-answer-btn" onClick={handleAnswerButtonClick}><i className="fa fa-pencil"></i> Answer</button>
                                            <Tippy placement='bottom' content="Copy to Clipboard">
                                                <button type="button" className="btn btn-light discuss-btn" id="discuss-bookmark-btn">
                                                    <CopyToClipboard text={clipboardValue}>
                                                        <i className="fa fa-copy" ></i>
                                                    </CopyToClipboard>
                                                </button>
                                            </Tippy>
                                        </div>
                                        <div className="col-5 d-flex justify-content-around">

                                            <button type="button" className="btn btn-danger discuss-btn" id="get-help-btn" onClick={handleHintShow}><i className="fa fa-question-circle"></i>  Get Help</button>
                                            
                                        </div>
                                    </div>
    
                                </li>

                                <li  className="list-group-item">
                                    <p className="discuss-bold">{answers.length} Answers</p>
                                </li>
	                            <Answer showAnswerEditor = {showAnswerEditor} setShowAnswerEditor = {setShowAnswerEditor}/>
                                {
                                    answers.map(answer => 
                                        (
                                            <li className="list-group-item" key={answer.user_id}>
                                                <div className="d-flex gap-3" id="discuss-profile">
                                                    <img src={answer.profile_pic} alt="" id="profile-pic"/>
                                                    <div>
                                                    <h5 className="profile-name"><div dangerouslySetInnerHTML={{ __html: answer.name }}></div></h5>
                                                        <h5>Aspiring PM</h5>
                                                    </div>
                                                </div>
                                                {/* {resolveAnswer(answer.answer)} */}
                                                
                                                {/* {formatString(answer.answer)} */}
                                                <p className="discuss-light" id = "ansSection">{formatString(answer.answer)}</p>
                                                
                                                {/* <div dangerouslySetInnerHTML={createMarkup(answer.answer)} /> */}
                                                <div className="d-flex gap-5">
                                                    <button type="button" className="btn btn-light discuss-btn" id="discuss-answer-btn"><i className="fa fa-arrow-up"></i> {answer.upvotes_count}</button>
                                                    <button type="button" className="btn btn-light discuss-btn" id="discuss-share-btn"><i className="fa fa-comment"></i> {answer.comments_count}</button>
                                                </div>

                                                <Comments answerId = {answer.ans_id} />

                                            </li>
                                        )
                                    )


                                }

                                

                            </ul>
                    </div>
                </div>
    
                <div className="col-3">
                    <Leaderboard/>
                </div> 
                <Modal show={showHintModal} onHide={handleHintClose}>
                    <Modal.Header>
                        <Modal.Title>Here is a hint for you!!! </Modal.Title>
                    </Modal.Header>
                    <Modal.Body><div dangerouslySetInnerHTML={{ __html: question.hint }}></div></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleHintClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal> 
            </>
        )
    }

}
