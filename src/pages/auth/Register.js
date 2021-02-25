import { Button, Card, CardContent, CardHeader, Container, Grid, makeStyles, TextField } from '@material-ui/core';

import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import AuthForm from '../../components/forms/AuthForm';

import { auth } from '../../firebase';

const useStyles = makeStyles({
    root: {
        marginTop: 50
    }
})

const Register = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("emmaprechi@gmail.com");
    const [loading, setLoading] = useState(false);

    

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);

        const config={
            url:process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
            handleCodeInApp:true
        }
        await auth.sendSignInLinkToEmail(email,config);
        //show toast notification to user about email sent
        toast.success(`Email is sent to ${email}. Click link to complete registration.`)

        //save user email to localstorage
        window.localStorage.setItem("emailForRegistration",email);

        //clear state
        setEmail("");
        setLoading(false);
    }
    return (
      <AuthForm header="Register" email={email}  loading={loading} setEmail={setEmail} handleSubmit={handleSubmit} />
       
        )
}

export default Register;