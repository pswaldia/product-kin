import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {config} from '../../main/editorConfig';
export default function Answer(props) {
    ClassicEditor.defaultConfig = config
    return (props.showAnswerEditor) ? (
        <>
            <li className = "list-group-item">
                <form>
                    <CKEditor
                        editor={ClassicEditor}
                    />
                    <div className="d-inline-flex flex-wrap" id="editor-btn">
                            <button type="submit" className="btn btn-primary m-1">Post Answer</button>
                            <button type="button" className="btn btn-light m-1" onClick={() => props. setShowAnswerEditor(false)}>Cancel</button>
                    </div>
                </form>
            </li>
        </>

    ) : " ";
}
