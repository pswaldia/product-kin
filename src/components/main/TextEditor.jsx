import React, {useRef, useState} from 'react'
import axios from 'axios';

import './textEditor.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';	
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';	
import {config} from './editorConfig'

export default function TextEditor(props) {
    ClassicEditor.defaultConfig = config
    if(props.trigger){	
        const body = document.body;	
        body.style.overflowY = 'hidden';	
    }	
    else{	
        const body = document.body;	
        body.style.overflowY = 'scroll';
    }
    
    const editorRef = useRef(null);
    const [value, setValue] = useState('');
    const [ length, setLength ] = useState(0);

    const cancelQuestionDialog = () => {
        props.setTrigger(false);
        setValue("");
        setLength(0);
    }

    const handleSubmitQuestion = (event) => {
        event.preventDefault();
        console.log(value);
        console.log(length);
        if(value === "")
            alert("Please enter your question before submitting");
        else{
            const questionDetails = {
                question : value,
                topic : " ",
                peer_cases : false
            };
            const token = localStorage.getItem("accessToken");
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            
            console.log(token);
            axios.post('/add_question', questionDetails, config)
            .then(function (response) {
                console.log("inside questionDetails response");
                console.log(response.data);
                alert(response.data.message);
                setValue("");
                setLength(0);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
        } 
    }
    
    return (props.trigger) ? (
        <>
                <div className="text_editor">
                    <form onSubmit={handleSubmitQuestion}>

                        <CKEditor	
                            editor={ClassicEditor}
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setValue(data.replace( /(<([^>]+)>)/ig, ''));
                                setLength(data.replace( /(<([^>]+)>)/ig, '').length);
                            } }
                        />

                            <div className="d-inline-flex flex-wrap" id="editor-btn">
                                <button type="submit" className="btn btn-primary m-1">Post Question</button>
                                <button type="button" className="btn btn-light m-1" onClick={cancelQuestionDialog}>Cancel</button>
                            </div>
                            
                    </form>
                </div> 
                
        </>
    ) : "";
}
