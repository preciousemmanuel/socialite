import {  gql } from "@apollo/client";
const { USER_INFO } = require("./fragments");


export const UPDATE = gql`
mutation userUpdate($input:UserUpdateInput){
    userUpdate(input:$input){
       ...userInfo
    }
}
${USER_INFO}
`;