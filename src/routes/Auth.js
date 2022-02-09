import React, { useState } from "react";
import {authService, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "fBase";

const Auth = () => {
    // Variables with hooks
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    // Method
    const onChange = (event) =>{
        // event로부터 target의 name과 value를 가져옴.
        const {target: {name,value}} = event; 
        //name에 따라 value를 setEmail이나 setPassword에 넣어줌
        if(name ==="email") setEmail(value) 
        else if(name==="password")setPassword(value)
    };

    const onSubmit =async(event) =>{
        // 원치않을 때 실행되는 걸 처리
        event.preventDefault();
        // 계정생성인지 로그인인지 처리하여 data에 user정보를 담아줌.
        try{ 
            let data = newAccount ? await createUserWithEmailAndPassword(authService , email, password) // create Account
            : await signInWithEmailAndPassword(authService , email,password); // Login
        // 에러 정보를 저장함.
        } catch(error) {setError(error.code);}
    }

    const toggleAccount = () => setNewAccount((prev)=>!prev);

    const onSocialClick = async (event) =>{
        const {target : {name}} =event;
        let provider = name==="google" ? new GoogleAuthProvider() : 
        name==="github" ? new GithubAuthProvider(): undefined;
        
        const result = await signInWithPopup(authService,provider);
        console.log(result);
    }
    // Return doc
    return (
        <div>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
            <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} required/>
            <input type="submit" value={newAccount ? "Create Account": "Log In"} />
            <p>
                {error==="auth/invalid-email" ? "이메일 형식이 올바르지 않습니다."
                : error==="auth/email-already-in-use" ? "이미 사용중인 이메일입니다" 
                : error==="auth/weak-password" ? "비밀번호를 강화해주세요(최소 6자 이상)" 
                : error==="auth/operation-not-allowed" ? "전자 메일/암호 계정이 활성화되지 않았습니다"
                : ""
                }
            </p>
        </form>
        <span onClick={toggleAccount}>{newAccount ? ">> Sign In" : ">> Create Account"}</span>
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue with Github</button>
        </div>
    </div>
    );
}
export default Auth;