import React from 'react'
import {useQuery,gql} from '@apollo/client'
const GetStudentByIdQuerey=gql`
        {
            getStudentById(input: {id: 2}) {
                id
                displaceException {
                massage
                className
                }
                grades {
                TaskName
                grade
                className
                }
                classes {
                name
                students
                }
            }
        }
    `;
export default function StudentHomePage() {
    const {data,loading,error}=useQuery(GetStudentByIdQuerey);
    if(loading) return <><p>loading...</p></>;
    if(error) return <pre>error</pre>;
    console.log(data);
    return (
        <div>student-home-page</div>
    );
}
