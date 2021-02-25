
import {gql, useLazyQuery, useQuery} from "@apollo/client"
import {makeStyles} from "@material-ui/core/styles"
import React,{useContext, useState} from "react";
import Card from "@material-ui/core/Card"
import { Button, CardActions, CardContent, CardHeader, Container, Grid, Typography } from '@material-ui/core';
import {AuthContext} from '../context/authContext'
import { useHistory } from "react-router-dom";



const useStyles = makeStyles({
  root:{
    marginTop:20
  }
})

const GET_ALL_POSTS=gql`
{
    allPosts{
        id
        title
        description
    }
}
`

const Home=()=> {
// const [posts,setPosts]=useState([]);

// client
// .query({
//   query:gql`
//   {
//     allPosts{
//       id
//       title
//       description
//     }
//   }
//   `
// })
// .then(result=>setPosts(result.data.allPosts))
// .catch(e=>console.log(e))
// ;
const {data, loading,error}=useQuery(GET_ALL_POSTS);
const [fetchPosts,{data:postsData}]=useLazyQuery(GET_ALL_POSTS)
const {state,dispatch}=useContext(AuthContext)
const classes=useStyles();
//react router
let history=useHistory();

    if (loading) return <p>Loading...</p>

  return (
  <Container className={classes.root}>
       <Button color="primary" variant="contained" onClick={()=>fetchPosts()}>Fetch Post</Button>
    <Grid container spacing={3}>
    {data && data.allPosts.map(post=>(
     <Grid key={post.id} item xs={3}>
       <Card>
         <CardHeader
         title={post.title}
         />
         <CardContent>
    <Typography>{post.description}</Typography>
         </CardContent>
         <CardActions>
            
         </CardActions>
       </Card>
     </Grid>
    )

    )}

    </Grid>
    {JSON.stringify(postsData)}
    {JSON.stringify(state)}
    <hr/>
    <Button color="primary" variant="contained" onClick={()=>dispatch({type:"LOGGED_IN_USER",payload:"alan more"})}>Fetch Post</Button>
    {JSON.stringify(history)}
 </Container>
  );
}

export default Home;
