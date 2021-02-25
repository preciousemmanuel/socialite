import React from 'react';


const Image=({image,handleRemoveImage=f=>f})=>(

    <img src={image.url} key={image.public_id} style={{height:'100px'}} onClick={()=>handleRemoveImage(image.public_id)} />
)

export default Image;