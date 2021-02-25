import React from 'react';
import { Button, Card, CardContent, CardHeader, Container, Grid, makeStyles, TextareaAutosize, TextField } from '@material-ui/core';

const UserProfile=({handleChange,handleSubmit,username,email,about,loading,name})=>{

    return(
        <CardContent>
        <Grid container>
            <Grid item xs={7}>
                <form onSubmit={handleSubmit}>
                    <TextField onChange={handleChange} style={{ marginBottom: 8 }} fullWidth value={email} name="email" disabled={loading} type="email" label="Email Address" />
                    <TextField onChange={handleChange} style={{ marginBottom: 8 }} fullWidth value={name} disabled={loading} type="text" name="name" label="Name" />
                    <TextField onChange={handleChange} style={{ marginBottom: 8 }} fullWidth value={username} disabled={loading} type="text" name="username" label="Username" />
                   
                    <TextField onChange={handleChange} style={{ marginBottom: 8 }} fullWidth value={about} disabled={loading} type="textarea" name="about" label="About" />

                    <Button type="submit" variant="contained" color="primary" disabled={!email || loading}>Submit</Button>
                </form>
            </Grid>
        </Grid>

    </CardContent>

    )
}

export default UserProfile;