import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {config} from '../../main/editorConfig';


export default function Answer(props) {
    ClassicEditor.defaultConfig = config

    const [value, setValue] = useState('');
    const [ length, setLength ] = useState(0);
    const [toggleOn, setToggleOn]= useState(false)

    const {id} = useParams();

    const cancelAnswereDialog = () => {
        props. setShowAnswerEditor(false);
        setValue("");
        setLength(0);
    }

    const handleSubmitAnswer = (event) => {
        event.preventDefault();
        console.log(value);
        console.log(length);
        console.log("id is:", id);
        
        if(value === "")
            alert("Please enter your answer before submitting");
        else{
            setToggleOn(true);
            const answerDetails = {
                ques_id : id,
                answer : value,
            };

            const token = localStorage.getItem("accessToken");
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            
            console.log(token);
            axios.post('/add_answer', answerDetails, config)
            .then(function (response) {
                console.log("inside answerDetails response");
                console.log(response.data);
                alert(response.data.message);
                setValue("");
                setLength(0);
                setToggleOn(false);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
        } 
    }

    return (props.showAnswerEditor) ? (
        <>
            <li className = "list-group-item">
                <form onSubmit={handleSubmitAnswer}>
                    <CKEditor	
                            editor={ClassicEditor}
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setValue(data);
                                setLength(data.length);
                                // setValue(data.replace( /(<([^>]+)>)/ig, ''));
                                //setLength(data.replace( /(<([^>]+)>)/ig, '').length);
                            } }
                    />
                    <div className="d-inline-flex flex-wrap" id="editor-btn">
                            <button type="submit" className="btn btn-primary m-1">&nbsp;{toggleOn ? <span>Posting ...&nbsp;<i class="fa fa-spinner fa-spin" ></i></span> :<span>Post Answer</span> }</button>
                            <button type="button" className="btn btn-light m-1" onClick={cancelAnswereDialog}>Cancel</button>
                    </div>
                </form>
            </li>
        </>

    ) : " ";
}
