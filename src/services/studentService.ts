import { Student } from "../models/student";

export function GetStudentFromGraphQLJson(jsonFromGraphQl:object)  {
    console.log('hi');
    type ObjectKey = keyof typeof jsonFromGraphQl;
    let getFromJson=(key:string)=>jsonFromGraphQl[key as ObjectKey];
    let data=getFromJson("getStudentById");
    let id=data['id'] as number;
    console.log(data);
    console.log(id);
    
    
 
    return null;
}