
import {gql, useLazyQuery, useQuery} from "@apollo/client"
import {makeStyles} from "@material-ui/core/styles"
import React,{useContext, useEffect, useState} from "react";
import Card from "@material-ui/core/Card"
import { Button, CardActions, CardContent, CardHeader, Container, Grid, Typography } from '@material-ui/core';

import { useHistory } from "react-router-dom";
import { GET_ALL_USERS } from "../graphql/queries";
import UserCard from "../components/UserCard";



const useStyles = makeStyles({
  root:{
    marginTop:20
  }
})



const User=()=> {

    
const {data, loading,error}=useQuery(GET_ALL_USERS);

const classes=useStyles();
//react router


    if (loading) return <p>Loading...</p>
console.log(data)
  return (
  <Container className={classes.root}>
       www
    <Grid container spacing={3}>
    {data && data.allUsers.map(user=>(
     <Grid key={user._id} item xs={3}>
       <UserCard user={user} />
     </Grid>
    )

    )}

    </Grid>
    
 </Container>
  );
}

export default User;
