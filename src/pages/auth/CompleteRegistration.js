import React, { useState ,useEffect, useContext} from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'
import { Button, Card, CardContent, CardHeader, Container, Grid, makeStyles, TextField } from '@material-ui/core';
import { AuthContext } from '../../context/authContext';
import { gql, useMutation } from '@apollo/client';
import AuthForm from '../../components/forms/AuthForm';

const useStyles = makeStyles({
    root: {
        marginTop: 50
    }
});

const USER_CREATE=gql`
mutation userCreate{
    userCreate{
        username
        email
    }
}
`

const CompleteRegistration = () => {
    const {dispatch}=useContext(AuthContext)
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const classes = useStyles();

    let history=useHistory();

    useEffect(()=>{
        //this runs when component mount by default like componentdidmount, and when there is a change in history or route changes
        console.log("render");
        setEmail(window.localStorage.getItem("emailForRegistration"))
    },[history])

    const [userCreate]=useMutation(USER_CREATE);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);

        //validation
        if(!email || !password){
            toast.error("Email and password is required.")
            return;
        }
        try {

            const result= await auth.signInWithEmailLink(email,window.location.href);
            //console.log(result);
            if(result.user.emailVerified){
                window.localStorage.removeItem("emailForRegistration");

                //get current login user
                let user=auth.currentUser;
                //udate password.
                await user.updatePassword(password);
                //dispatch user with email and token
                //then redirect
                const idTokenResult=await user.getIdTokenResult();
                dispatch({
                    type:"LOGGED_IN_USER",
                    payload:{email:user.email,token:idTokenResult.token}
                });

                //make api request to save user in mongodb
                userCreate();
                history.push("/")

            }
        } catch (error) {
            console.log("Error registring...",error.message)
            setLoading(false);
            toast.error(error.message)
        }
    }

    return (
        <AuthForm email={email} header="Confirm Account"  loading={loading} password={password} showPassword={true} setEmail={setEmail} handleSubmit={handleSubmit} />
        )
}

export default CompleteRegistration;