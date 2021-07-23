import React, {useRef} from 'react'
import './textEditor.css'
import {Editor} from '@tinymce/tinymce-react';
export default function TextEditor(props) {
    const editorRef = useRef(null);

    return (props.trigger) ? (
        <>
                <div className="text_editor">
                    <form method="post" >
                        <div className="d-flex flex-row-reverse">
                            <button type="button" className="btn btn-light mb-1" id="cncel_btn" onClick={() => props.setTrigger(false)}>X</button>
                        </div>
                        <Editor
                                apiKey='ewyywh62rqgkqrt4x7t0h4qg2cwru4o4yz3g63xiw8zk9cux'
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
                                <button type="button" className="btn btn-light m-1">Cancel</button>
                            </div>
                            
                    </form>
                </div> 
                
        </>
    ) : "";
}
