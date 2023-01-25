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
    const [files, setFiles] = useState('');

    async function createNewPost(e) {

        const data = new FormData();

        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        e.preventDefault();
        // send all form data to the endpoint
        const response = await fetch('http://localhost:4000/post', {

            method: 'POST',
            body: data,

        });
        console.log(await response.json());
    }

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
            <input
                type="file"
                onChange={e => setFiles(e.target.files)}
            />
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
