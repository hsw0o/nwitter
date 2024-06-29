import { authService } from "fbase";
import { createUserWithEmailAndPassword, signinWithEmailAndPassword,GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Await } from "react-router-dom";
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                // create newAccount
                data = await authService.careateUseWithEmailPassword(authService, email, password);
                } else {
                    // log in
                    data = await authService.signinWithEmailAndPassword(authService, email, password);
                }
                console.log(data);
        } catch (error) {
            setError(error.message);
        
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const {
            target: {name},
        } = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(authService, provider);
        console.log(data);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                name = "email" 
                type = "email" 
                placeholder="Email" 
                required 
                value={email}
                onChange={onChange}
                />
                <input
                name="password" 
                type="password" 
                placeholder="Password" 
                required
                value={password}
                onChange={onChange} 
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log in"} />
                {error}
                </form>
                <span onClick={toggleAccount}>
                    {newAccount ? "Sign in" : "Create Account"}
                </span>
        <div>
        <button onClick={onSocialClick} name = "goole"> 
            Continue with Google </button>
        <button onClick={onSocialClick} name = "github">
            Continue with Github </button>
        </div>
        </div>
    );
};

export default Auth;