import React, { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect=({path})=>{
    let history=useHistory();
    const [count,setCount]=useState(5);

    useEffect(()=>{
        const interval=setInterval(()=>{
            setCount(currentCount=>--currentCount);
        },1000)
        //redirect 
        count===0 && history.push(path)
        //cleaup
        return ()=>clearInterval(interval)
    },[count])

    return(
        <div>
            <p>Redirection in {count} seconds</p>
        </div>
    )
}

export default LoadingToRedirect;