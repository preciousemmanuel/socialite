import { AppBar, Button, Toolbar, Typography ,IconButton, makeStyles} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { auth } from '../firebase';


const useStyles=makeStyles((theme)=>({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
}))
const Nav=()=>{
const classes=useStyles();
const {state,dispatch}=useContext(AuthContext);

let history=useHistory();
const {user}=state;

const logout=async ()=>{
    
    await auth.signOut();
    //console.log(user)
    dispatch({
        type:"LOGGED_IN_USER",
        payload:null
    });
    history.push("/login")
}

    return(
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton color="inherit" className={classes.menuButton}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Home
                </Typography>
                <Button component={Link} to="/users" color="inherit">Users</Button>
                {user && (
                <Button component={Link} to="/login" color="inherit">{user.email.split('@')[0]}</Button>
                )}
                {!user && <>
                    <Button component={Link} to="/login" color="inherit">Login</Button>
                <Button component={Link} to="/register" color="inherit">Register</Button>
                </>}
               
                {user &&( <Button  onClick={logout} href="/login" color="inherit">Logout</Button>)}
               
            </Toolbar>

        </AppBar>
        </div>
    )
}

export default Nav;