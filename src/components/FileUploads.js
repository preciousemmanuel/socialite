import { React, useMemo, useState,useContext } from "react";
import FileResizer from "react-image-file-resizer";
import axios from 'axios';
import { Button, Card, CardContent, CardHeader, Container, Grid, makeStyles, TextareaAutosize, TextField } from '@material-ui/core';


import { AuthContext } from "../context/authContext";
import Image from "./Image";

const FileUploads=({setLoading,loading,setValues,values})=>{
    const {state}=useContext(AuthContext);
    const handleRemoveImage=(id)=>{
        setLoading(true);
        axios.post(`${process.env.REACT_APP_REST_URL}/deleteimage`,{
            public_id:id
        },{
            headers:{
                authtoken:state.user.token
            }
        })
        .then(response=>{
            setLoading(false);
            const {images}=values;
            setValues({...values,images:images.filter(img=>img.public_id!==id)})
            console.log("delete successfuls")
        })
        .catch(error=>{
            setLoading(false)
            console.log(error)
        })
    }
    
    const handleFileResizer=(event)=>{
        var fileInput = false
        setLoading(true)
        if(event.target.files[0]) {
            fileInput = true
        }
        if(fileInput) {
            try {
                FileResizer.imageFileResizer(
                event.target.files[0],
                300,
                300,
                'JPEG',
                100,
                0,
                uri => {
                    console.log(uri)
                    console.log(state)
                    axios.post(`${process.env.REACT_APP_REST_URL}/uploadimages`,{
                        image:uri
                    },{
                        headers:{
                            authtoken:state.user.token
                        }
                    }).then(response=>{
                        setLoading(false);
                        const {images}=values
                        console.log("cloudinary response",response);
                        setValues({...values,images:[...images,response.data]})
                    })
                    .catch(error=>{
                        setLoading(false);
                        console.log("Cloudinary upload failed")
                    })

                   
                },
                'base64',
                200,
                200,
                );
            }   catch(err) {
                    console.log(err)
            }
        }
    }
    return (
        <Grid container>
        <Grid item xs={3} style={{marginRight:"10px"}}>
        <TextField onChange={handleFileResizer} style={{ marginBottom: 8 }} fullWidth type="file" name="images" label="images" />
        </Grid>
        <Grid item xs={7}>
        {values.images.map(image=>(
            <Image image={image} handleRemoveImage={handleRemoveImage} />
        ))}
        </Grid> 
        </Grid>
        )
}

export default FileUploads;