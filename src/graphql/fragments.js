import {  gql } from "@apollo/client";

//fragment is used to reduce repetition

export const USER_INFO=gql`
    fragment userInfo on User{
        _id
        name
        username
        email
        about
        images{
            url
            public_id
        }
        createdAt
        updatedAt
    }
`;