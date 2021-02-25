import './App.css';
import {ApolloClient,ApolloProvider,gql,InMemoryCache,createHttpLink} from "@apollo/client"
import { setContext } from '@apollo/client/link/context';

import React,{useState,useContext} from "react";
import Home from './pages/Home';
import Nav from './components/Nav';
import { Route, Switch } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import {  ToastContainer } from 'react-toastify';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import { AuthContext } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';
import PasswordReset from './pages/auth/PasswordReset';
import PasswordForgot from './pages/auth/PasswordForgot';
import Profile from './pages/Profile';
import User from './pages/User';


// const client=new ApolloClient({
//   uri:process.env.REACT_APP_GRAPHQL_URI,
//   cache:new InMemoryCache()
// })

const App=()=> {

  const {state} =useContext(AuthContext);
  const {user} =state;
  
  const httplink=createHttpLink({
    uri:process.env.REACT_APP_GRAPHQL_URI
  })

  const authLink=setContext((_,{headers})=>{
    console.log(user.token)
    return{ 
      headers:{
        ...headers,
        authtoken:user?user.token:"",
      }
    }
  })

  const uriOption=()=>{
    if(user){
      return {
        link:authLink.concat(httplink)
      }
    }else{
      return {
        uri:process.env.REACT_APP_GRAPHQL_URI
      }
    }
  }

  const client=new ApolloClient({
    //link:authLink.concat(httplink),
    cache:new InMemoryCache(),
   uri:process.env.REACT_APP_GRAPHQL_URI,
  
    
  })

  return (
<ApolloProvider client={client}>
  <Nav/>
  <ToastContainer/>
<Switch>
  <Route exact component={Home} path="/" />
  <Route exact component={Register} path="/register" />
  <Route exact component={User} path="/users" />

    <Route exact component={PasswordForgot} path="/password/forgot"/>
  <Route exact component={Login} path="/login" />
  <Route component={CompleteRegistration} exact path="/complete-registration" />
  <PrivateRoute exact component={PasswordReset} path="/password/reset" />
  <PrivateRoute exact component={Profile} path="/profile" />

</Switch>
</ApolloProvider>
  );
}

export default App;
