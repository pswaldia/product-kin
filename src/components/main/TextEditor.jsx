import React, {useRef, useState} from 'react'
import axios from 'axios';

import './textEditor.css'
import {Editor} from '@tinymce/tinymce-react';
export default function TextEditor(props) {
    const editorRef = useRef(null);

    const [value, setValue] = useState('');
    const [ length, setLength ] = useState(0);

    const handleUpdate = (value, editor) => {
        const length = editor.getContent({ format: 'text' }).length;
        var myContent = editor.getContent({ format: "text" });
        
          setValue(myContent);
          setLength(length);
        
        //continue from here
        console.log(myContent);
      };

    const handleSubmitQuestion = (event) => {
        event.preventDefault();
        console.log(value);
        if(value === "")
            alert("Please enter your question before submitting");
        else{
            const questionDetails = {
                question : value,
                topic : "design",
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
                        <div className="d-flex flex-row-reverse">
                            <button type="button" className="btn btn-light mb-1" id="cncel_btn" onClick={() => props.setTrigger(false)}>X</button>
                        </div>
                        <Editor
                                apiKey='ewyywh62rqgkqrt4x7t0h4qg2cwru4o4yz3g63xiw8zk9cux'
                                onEditorChange={handleUpdate}
                                onInit={(evt, editor) => editorRef.current = editor}
                                init={{
                                height: 550,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                            <div className="d-inline-flex flex-wrap" id="editor-btn">
                                <button type="submit" className="btn btn-primary m-1">Post Question</button>
                                <button type="button" className="btn btn-light m-1" onClick={() => props.setTrigger(false)}>Cancel</button>
                                <button type="button" className="btn btn-light m-1" onClick={handleSubmitQuestion}>check</button>
                            </div>
                            
                    </form>
                </div> 
                
        </>
    ) : "";
}
