import React,{useState} from "react"
import { toast } from "react-toastify";
import AuthForm from "../../components/forms/AuthForm";
import { auth } from "../../firebase";

const PasswordReset=()=>{
 const [password,setPassword]=useState('')
 const [loading,setLoading]=useState(false)
const handleSubmit=async(e)=>{
    e.preventDefault();
    const config={
        url:process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
        handleCodeInApp:true
    }
    setLoading(true)

    await auth.currentUser.updatePassword(password)
    .then(()=>{
        setPassword('');
        setLoading(false);
        toast.success(`password is updated `)
    })
    .catch(error=>{
        setLoading(false);
        console.log(error);
        toast.error(error.message)
    })
}

    return (
        <AuthForm showPassword={true} hideEmail={true} handleSubmit={handleSubmit} password={password} loading={loading} setPassword={setPassword} setLoading={setLoading} header="Update Password"/>
    )
}

export default PasswordReset;