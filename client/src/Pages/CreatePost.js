import React, { useState } from 'react'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

function createNewPost(e) {

    e.preventDefault();
    // sending all the details to the endpoint

}

function CreatePost() {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');

    return (
        <form style={{ margin: '0 400px' }} onSubmit={createNewPost}>
            <input
                type='text'
                placeholder='Title'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                type='summary'
                placeholder='Summary'
                value={summary}
                onChange={e => setSummary(e.target.value)}
            />
            <input type="file" />
            <ReactQuill
                value={content}
                modules={modules}
                formats={formats}
                onChange={newValue => setContent(newValue)}
            />
            <button style={{ marginTop: '10px' }}>Create Post</button>
        </form>
    )
}

export default CreatePost;
