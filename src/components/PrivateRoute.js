import React,{useState,useEffect, useContext} from 'react';
import {Route,Link} from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import LoadingToRedirect from './LoadingToRedirect';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    marginLeft:300,
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const PrivateRoute=({children,...rest})=>{
  console.log(children)
    const classes=useStyles()
const [user,setUser]=useState(false);

const {state}=useContext(AuthContext);

useEffect(()=>{ 
    //whenever state.user changes the useeffect fires
    if(state.user){
        setUser(true)
    }
},[state.user])

const drawer=(
    <div>
        <div className={classes.toolbar} />
        <Divider/>
        <List>
            <ListItem button component={Link} to="/profile">
                <ListItemIcon>
                <InboxIcon />
                <ListItemText primary="Profile" />
                </ListItemIcon>
            </ListItem>
            <ListItem button component={Link} to="/password/reset">
                <ListItemIcon>
                <InboxIcon />
                <ListItemText primary="Password Reset" />
                </ListItemIcon>
            </ListItem>
            <ListItem button component={Link} to="/">
                <ListItemIcon>
                <InboxIcon />
                <ListItemText primary="Post" />
                </ListItemIcon>
            </ListItem>
        </List>
    </div>
)
const container = window !== undefined ? () => window().document.body : undefined;
const renderContent=()=>(
<div>
    <nav className={classes.drawer}>
    <Hidden smUp implementation="css">
        <Drawer
        container={container}
        variant="temporary"
        classes={{paper:classes.drawerPaper}}
        >
            {drawer}
        </Drawer>
    </Hidden>
    <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
    </nav>
    <main className={classes.content}>
            <Route {...rest}/>
    </main>
</div>

)

return user ? renderContent():<LoadingToRedirect path="/login"/>

}

export default PrivateRoute;