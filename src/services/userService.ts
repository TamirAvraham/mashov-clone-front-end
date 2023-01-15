import User from '../models/user'
import { gql,useQuery } from '@apollo/client'
import client from '../services/gqlSetup'
export namespace UserService{
    const loginGraphQLQuery=gql`
    mutation login($username:String!,$password:String!){
        login(input: {password:$password , username: $username}) {
            id
            PointsTo
            username
            isStudent
        }
    }
    `
    

    export async function login(username:string,password:string):Promise<User> {//
        let retUser:User=errorUser,retError:any;
        let res=await client.mutate({mutation:loginGraphQLQuery,variables:{username:username,password:password}});
        const {data}=res;
        let json=data["login"]
        console.log(json);
        retUser=ParseUserFromJson(json);
        
        return retUser;
    }
    
    export function ParseUserFromJson(json:any):User {
        let ret:User={
            id:parseInt(json['id']),
            PointsTo:parseInt(json['PointsTo']),
            username:json['username'],
            IsStudent:json['isStudent']
        }
        return ret
    }
    
    export const errorUser:User={
        id:-666,
        username:"error",
        PointsTo:-666,
        IsStudent:false,
        
    }
};