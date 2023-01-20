import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {

    const { userInfo, setUserInfo } = useContext(UserContext)

    useEffect(() => {

        fetch('http://localhost:4000/profile', {

            credentials: 'include',

        }).then(response => {

            response.json().then(userInfo => {

                setUserInfo(userInfo)
            })
        })
    }, [])

    function logout() {

        // invalidate the cookie
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST'
        });

        setUserInfo(null)
        alert(`Logout Successfully`)
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">FaKeBoOk</Link>
            <nav>
                {username && (
                    <>
                        <Link to='/create' >Create new Post</Link>
                        <Link onClick={logout}>Logout</Link>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header;