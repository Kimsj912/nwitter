import React, { useState } from "react";
import {authService, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "fBase";

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    

    const onChange = (event) =>{
        const {target: {name,value}} = event;
        if(name ==="email"){
            setEmail(value)
        } else if(name==="password"){
            setPassword(value)
        }
    };
    const onSubmit =async(event) =>{
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                // create Account
                data = await createUserWithEmailAndPassword(authService , email, password);
            } else{
                // Login
                data = await signInWithEmailAndPassword(authService , email,password);
            }
            console.log(data);
        }catch(error){
            setError(error.code);
        }
    }
    const toggleAccount = () => setNewAccount((prev)=>!prev);
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
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
    </div>
    );
}
export default Auth;