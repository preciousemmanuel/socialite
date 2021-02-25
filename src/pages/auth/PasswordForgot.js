import React,{useState} from "react"
import { toast } from "react-toastify";
import AuthForm from "../../components/forms/AuthForm";
import { auth } from "../../firebase";

const PasswordForgot=()=>{
 const [email,setEmail]=useState('')
 const [loading,setLoading]=useState(false)
const handleSubmit=async(e)=>{
    e.preventDefault();
    const config={
        url:process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
        handleCodeInApp:true
    }
    setLoading(true)

    await auth.sendPasswordResetEmail(email,config)
    .then(()=>{
        setEmail('');
        setLoading(false);
        toast.success(`Email is sent to ${email}. Click the link to reset password `)
    })
    .catch(error=>{
        setLoading(false);
        console.log(error)
    })
}

    return (
        <AuthForm handleSubmit={handleSubmit} email={email} loading={loading} setEmail={setEmail} setLoading={setLoading} header="Forgot Password"/>
    )
}

export default PasswordForgot;