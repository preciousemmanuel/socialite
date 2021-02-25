import React, { useState ,useEffect, useContext} from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom'
import { Button, Card, CardContent, CardHeader, Container, Grid, makeStyles, TextField } from '@material-ui/core';
import { AuthContext } from '../../context/authContext';
import { gql, useMutation } from '@apollo/client';

const useStyles = makeStyles({
    root: {
        marginTop: 50
    }
})

const USER_CREATE=gql`
    mutation userCreate{
        userCreate{
            username
            email
        }
    }
    `

const Login = () => {
    const {dispatch}=useContext(AuthContext)
    const [email,setEmail]=useState("emmaprechi@gmail.com");
    const [password,setPassword]=useState("123456");
    const [loading,setLoading]=useState(false);
    const classes = useStyles();

    let history=useHistory();

    const [userCreate]=useMutation(USER_CREATE)

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);

        //validation
        if(!email || !password){
            toast.error("Email and password is required.")
            return;
        }
        try {

           await auth.signInWithEmailAndPassword(email,password)
            .then(async result=>{
                const {user}=result;
                const idTokenResult=await user.getIdTokenResult();
                dispatch({
                    type:"LOGGED_IN_USER",
                    payload:{email:user.email,token:idTokenResult.token}
                });

                //make api request to save user in mongodb
                userCreate();

                history.push("/")

            })
          
        } catch (error) {
            console.log("Error registring...",error.message)
            setLoading(false);
            toast.error(error.message)
        }
    }

    const loginWithGoogle=()=>{
        auth.signInWithPopup(googleAuthProvider)
        .then(async result=>{
            const {user}=result;
            const idTokenResult=await user.getIdTokenResult();
            dispatch({
                type:"LOGGED_IN_USER",
                payload:{email:user.email,token:idTokenResult.token}
            });

            //make api request to save user in mongodb
            userCreate();
            history.push("/")

        })
        .catch(error=>{
            console.log(error);
            setLoading(false);
            toast.error(error.message)
        })
    }

    return (
        <div className={classes.root}>

            <Container>
                <Card>

                    <CardHeader title={loading ? "Loading..." : "Login"} />
                    <CardContent>
                        <Grid container>
                            <Grid item xs={7}>
                                <Button variant="contained" color="danger" onClick={loginWithGoogle}>Login with Google</Button>
                                <form onSubmit={handleSubmit}>
                                    <TextField onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: 8 }} fullWidth value={email} disabled={loading} type="email" label="Email Address" />
                                    <TextField onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: 8 }} fullWidth value={password} disabled={loading} type="password" label="Password" />
                                    
                                    <Button type="submit" variant="contained" color="primary" disabled={!email || !password|| loading}>Submit</Button>
                                </form>
                            </Grid>
                        </Grid>

                    </CardContent>
<Link to="/password/forgot">Forgot Password?</Link>
                </Card>
            </Container>
        </div>
    )
}

export default Login;