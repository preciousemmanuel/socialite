import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const UserCard=({user})=>(
    <Card>
        <CardActionArea>
            <CardMedia 
        component="img"
        alt={user.name}
        height="140"
        image={user.images[0].url}
        title="Contemplative Reptile"
            />
            <CardContent>
    <Typography variant="h5" component="h5">{user.name}</Typography>
         </CardContent>
<Typography>{user.about}</Typography>
        </CardActionArea>
       
         
         
       </Card>
)

export default UserCard;