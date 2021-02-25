
import {  gql } from "@apollo/client";
const { USER_INFO } = require("./fragments");

export const PROFILE = gql`
query{
profile{
   ...userInfo
}
}
${USER_INFO}
`;

export const GET_ALL_USERS=gql`
 query{
    allUsers{
      ...userInfo
    }
   }
${USER_INFO}
`