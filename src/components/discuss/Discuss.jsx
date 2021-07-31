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

export default function Discuss() {
    const [quesLoading, setQuesLoading] = useState(true);
    const [ansLoading, setAnsLoading] = useState(true);
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [showAnswerEditor, setShowAnswerEditor] = useState(false);
    const [showHintModal, setShowHintModal] = useState(false);
    const [clipboardValue, setClipBoardValue] = useState(window.location.href);

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


    if(quesLoading || ansLoading){
        return (
            <div className="col-6 discuss-loader">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    else{

        return (
        
            <>
                <div className="col-7 mb-5 mr-5">
                    <div className="card mb-3" id="discuss-main">
                            <ul className="list-group list-group-flush">
                                
    
                                <li  className="list-group-item">
    
                                    <p className="discuss-bold">{question.question}</p>
                                    <div className="row justify-content-between">
                                        <div className="col-4 d-flex justify-content-around">
                                        <button type="button" className="btn btn-light discuss-btn" id="discuss-answer-btn" onClick={() => setShowAnswerEditor(!showAnswerEditor)}><i className="fa fa-pencil"></i> Answer</button>
                                            <button type="button" className="btn btn-light discuss-btn" id="discuss-share-btn"><i className="fa fa-share"></i> Share</button>
                                        </div>
                                        <div className="col-5 d-flex justify-content-around">

                                            <button type="button" className="btn btn-danger discuss-btn" id="get-help-btn" onClick={handleHintShow}><i className="fa fa-question-circle"></i>  Get Help</button>
                                            <Tippy placement='bottom' content="Copy to Clipboard">
                                                <button type="button" className="btn btn-light discuss-btn" id="discuss-bookmark-btn">
                                                    <CopyToClipboard text={clipboardValue}>
                                                        <i className="fa fa-copy" ></i>
                                                    </CopyToClipboard>
                                                </button>
                                            </Tippy>
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
                                                    <img src={answer.profile_pic} alt=""/>
                                                    <div>
                                                        <h5 className="profile-name">{answer.name}</h5>
                                                        <h5>Aspiring PM</h5>
                                                    </div>
                                                </div>
                                                <p className="discuss-light">{answer.answer} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam pariatur ab commodi sequi sint? Non voluptate quas unde, natus iste amet quod numquam commodi, deserunt praesentium accusantium, ipsam illo. Saepe!</p>
    
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
                    <Modal.Body>{question.hint}</Modal.Body>
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
