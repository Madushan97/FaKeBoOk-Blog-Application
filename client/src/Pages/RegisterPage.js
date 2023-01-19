import React, { useState } from 'react'

function RegisterPage() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function register(e) {

        e.preventDefault();

        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.status === 400) {
            alert(`Something went wrong ---> 😢😢😢`)
        } else {
            alert(`Registration successful ---> 👌👌👌`)
        }
    }

    return (
        <form onSubmit={register} className='register'>
            <h1>Register Page</h1>
            <input
                type='text'
                placeholder='User Name'
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type='password'
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
            />
            <button type='submit' >Register</button>
        </form>
    )
}

export default RegisterPage
