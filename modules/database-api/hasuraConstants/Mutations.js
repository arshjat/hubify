import gql from 'graphql-tag';

export const CREATE_USER_MUTATION = gql`
    mutation add_user_mutation($email: String!, $firebase_uid: String!) {
        insert_user_info(objects: {
            email: $email,
            firebase_uid : $firebase_uid
        }) {
            affected_rows
        }
    }
`;