import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Leaderboard from '../main/Leaderboard';
import '../discuss/discuss.css'
export default function Discuss() {
    const [ques, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        //for fetching question
        try {
            const fetchQues = async() => {
               await axios.get(`/discuss/get_question/${id}`)
                .then(response => {
                    setQuestion(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            fetchQues();
        } catch (error) {
            console.log("error", error);
        }

         //for fetching the answers
        try {
            const fetchAnswers = async() => {
               await axios.get(`/discuss/fetch_answers/${id}`)
                .then(response => {
                    setAnswers(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            fetchAnswers();
        } catch (error) {
            console.log("error", error);
        }
    }, []);

    return (
        <>
            <div className="col-6 mb-5 mr-5">
                <div className="card mb-3">
                        <ul className="list-group list-group-flush">
                            

                            <li  className="list-group-item">

                                <p>{ques.question}</p>
                                <div className="row justify-content-between">
                                    <div className="col-4 d-flex justify-content-around">
                                        <button type="button" className="btn btn-light discuss-btn" id="discuss-answer-btn"><i className="fa fa-pencil"></i> Answer</button>
                                        <button type="button" className="btn btn-light discuss-btn" id="discuss-share-btn"><i className="fa fa-share"></i> Share</button>
                                    </div>
                                    <div className="col-5 d-flex justify-content-around">
                                        <button type="button" className="btn btn-danger discuss-btn" id="get-help-btn"><i className="fa fa-question-circle"></i> Get Help</button>
                                        <button type="button" className="btn btn-light discuss-btn" id="discuss-bookmark-btn"><i className="fa fa-bookmark"></i></button>
                                    </div>
                                </div>

                            </li>

                            
                        </ul>
                </div>
            </div>

            <div className="col-3">
                <Leaderboard/>
            </div>
        </>
    )
}
