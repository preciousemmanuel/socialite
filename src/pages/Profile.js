import { React, useMemo, useState,useContext } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, Card, CardContent, CardHeader, Container, Grid, makeStyles, TextareaAutosize, TextField } from '@material-ui/core';
import { toast } from "react-toastify";
import omitDeep from "omit-deep";
import { PROFILE } from "../graphql/queries";
import { UPDATE } from "../graphql/mutations";
import FileResizer from "react-image-file-resizer";
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import UserProfile from "../components/forms/UserProfile";
import FileUploads from "../components/FileUploads";







const Profile = () => {

    const {state}=useContext(AuthContext);
    const [values, setValues] = useState({
        email: '',
        name: '',
        about: '',
        username: '',
        images: []
    })
    const [loading, setLoading] = useState(false)
    const { data } = useQuery(PROFILE);
    useMemo(() => {
        if (data) {
            console.log("ssss",data)
            setValues({

                ...values,
                email: data.profile.email,
                name: data.profile.name,
                about: data.profile.about,
                username: data.profile.username,
                images: data.profile.images.map((datum) => {
                    return {
                        'url': datum.url,
                        'public_id': datum.public_id,
                    }
                })
            })
        }
    }, [data])

    const { name, username, email, about, images } = values;

    const [userUpdate] = useMutation(UPDATE, {
        update: ({ data }) => {
            console.log("USER UPDATE MUTATION", data);
            toast.success("Profile updated");
        }
    })

    const handleChange = (e) => {
        setValues({
            ...values, [e.target.name]: e.target.value
        });


    }
    const handleSubmit = (e) => {

        e.preventDefault();
        console.log(values)

        setLoading(true);
        userUpdate({ variables: { input: values } });
        setLoading(false);
    }

    

   

    // const profilupdateForm = () => (

       
    // )

    return (
        <div>
            <h4>{loading?"Loading...":"Profile"}</h4>
            
           
                <FileUploads setLoading={setLoading} loading={loading} setValues={setValues} values={values} />
                
            <UserProfile {...values} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )
}

export default Profile;