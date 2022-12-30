import {Class} from './class';
import {DisplaceException} from './disExept';
import { Grade } from './grade';
import { useQuery,gql } from "@apollo/client";
export interface Student{
    id:number,
    Grades:Grade[],
    Classes:Class[],
    DisplaceExceptions:DisplaceException[],
}
export function GetStudentById(id:number) {
    //this is the gql query for getting student by id
    const GetStudentByIdQuerey=gql`
        {
            getStudentById(input:{
                id:{number}
            }){
                id
                displaceException{
                massage
                className
                }
                grades{
                TaskName
                grade
                className
                }
                classes{
                name
                students
                }
            }
        }
    `;
    const { data, loading, error } = useQuery(GetStudentByIdQuerey);

}
