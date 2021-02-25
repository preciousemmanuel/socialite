import React,{useReducer,createContext, useEffect} from 'react';
import { auth } from '../firebase';



//usereducer hooks is used to update context state
const firebaseReducer=(state,action)=>{
    switch (action.type) {
        case "LOGGED_IN_USER":
            console.log("userss",action.payload)
            return {...state,user:action.payload}
            
        default:
            return state;
            
    }
}

//reducer to update context state


//state
const initialState={
    user:null
}

//create context
const AuthContext=createContext();

//context provider
const AuthProvider=({children})=>{
    const [state,dispatch]=useReducer(firebaseReducer,initialState);
    const value={state,dispatch}

    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged(async (user)=>{
            if (user) {
                const idTokenResult=await user.getIdTokenResult();
                dispatch({
                    type:"LOGGED_IN_USER",
                    payload:{email:user.email,token:idTokenResult.token}
                });
            } else {
                dispatch({
                    type:"LOGGED_IN_USER",
                    payload:null
                });
            }
        });

        //cleanup
        return ()=>unsubscribe();
    },[])

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


//export

export {AuthContext,AuthProvider};