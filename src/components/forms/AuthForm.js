import React from 'react';
import { Button, Card, CardContent, CardHeader, Container, Grid, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        marginTop: 50
    }
})
const AuthForm = ({ header,email='', password = '', setEmail=f=>f,hideEmail=false ,setPassword, loading, showPassword = false, handleSubmit}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>

            <Container>
                <Card>

                    <CardHeader title={loading ? "Loading..." : header} />
                    <CardContent>
                        <Grid container>
                            <Grid item xs={7}>
                                <form onSubmit={handleSubmit}>
                                   { !hideEmail &&( <TextField onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: 8 }} fullWidth value={email} disabled={loading} type="email" label="Email Address" />)}
                                    {showPassword && (
                                        <TextField onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: 8 }} fullWidth value={password} disabled={loading} type="password" label="Password" />

                                    )}

                                    <Button type="submit" variant="contained" color="primary" disabled={ loading}>Submit</Button>
                                </form>
                            </Grid>
                        </Grid>

                    </CardContent>

                </Card>
            </Container>
        </div>

    )
}

export default AuthForm;