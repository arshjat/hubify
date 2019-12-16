import gql from 'graphql-tag';

export const GET_ALL_USERS = gql`
    query GET_USERS{
        user_info {
            firebase_uid
            email
            id
          }
    }
`;