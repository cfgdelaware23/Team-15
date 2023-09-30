import React, { useState } from 'react';
import "../styles/SignIn.css";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleClick = () => {

    };

    return <div>
        <h1>Sign In</h1>
        <form onSubmit={ handleClick}>
            <div className="Signin">
                <div className='fieldContainerLong'>
                    <label>
                        Email:
                        <input type="text" onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                </div>
                <div className='fieldContainerLong'>
                    <label>
                        Password:
                        <input type="password" onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                </div>
            </div>
            <button className="btn btn-primary mt-10" type="submit">Submit</button>
            <div>{error}</div>
        </form>
    </div>;
}

export default SignIn;