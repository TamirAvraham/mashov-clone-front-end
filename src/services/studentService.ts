import { Class } from "../models/class";
import { DisplaceException } from "../models/disExept";
import { Grade } from "../models/grade";
import { Student } from "../models/student";
import { UserService } from "./userService";
import client from "./gqlSetup";
import { gql } from "@apollo/client";
import User from "../models/user";
import Login from "../pages/login";
export namespace StudentService{
    export function GetStudentFromGraphQLJson(jsonFromGraphQl:object)  {
        
        type ObjectKey = keyof typeof jsonFromGraphQl;

        let getFromJson=(key:string)=>jsonFromGraphQl[key as ObjectKey];
        
        
        
        let data=getFromJson("getStudentById");

        let id=parseInt(data['id'] as string);

        let classesAsJson=data['classes'] as object[];
        let gradesAsJson=data['grades'] as object[];
        let displaceExceptionAsJson=data['displaceException'] as object[];

        let grades:Grade[]=[];
        let classes:Class[]=[];
        let displaceExceptions:DisplaceException[]=[];

        gradesAsJson.forEach(grade=>{
            let _grade=GradeFromJson(grade);
            grades.push(_grade);
        })
        classesAsJson.forEach(classAsJson=>{
            let _class=StudentService.ClassFromJson(classAsJson)
            classes.push(_class);
            }
        );
        displaceExceptionAsJson.forEach(disExcept=>{
            let _disExcept=DisExceptFromJson(disExcept);
            displaceExceptions.push(_disExcept);
        });
        
        
        
        let ret:Student={
            id:id,
            Grades:grades,
            Classes:classes,
            DisplaceExceptions:displaceExceptions
        };
        
     
        return ret;
    }
    export function ClassFromJson(classAsJson:object):Class {
        type ObjectKey = keyof typeof classAsJson;
        let ret:Class={
            Id:parseInt(classAsJson['id' as ObjectKey] as string),
            Name:classAsJson['name' as ObjectKey] as string,
            Teacher:-1,
            Students:[]
        };
        let StudentsAsString=classAsJson['students' as ObjectKey] as string[];
        StudentsAsString.forEach(studentId=>{
            if(studentId!==''){
                let id=parseInt(studentId);
                ret.Students.push(id);
            }
        });
        console.log(ret);
        
        
        return ret;
    }
    export function GradeFromJson(gradeAsJson:object):Grade {
        type ObjectKey = keyof typeof gradeAsJson;
        let ret:Grade={
            Grade:gradeAsJson['grade' as ObjectKey] as number,
            ClassName:gradeAsJson['className' as ObjectKey] as string,
            Id:parseInt(gradeAsJson['id' as ObjectKey] as string),
            TaskName:gradeAsJson['TaskName' as ObjectKey] as string
        };
        return ret;
    }
    export function DisExceptFromJson(disExcept:object):DisplaceException {
        type ObjectKey = keyof typeof disExcept;
        let ret:DisplaceException={
            id:parseInt(disExcept['id' as ObjectKey] as string),
            ClassName:disExcept['className' as ObjectKey] as string,
            Massage:disExcept['massage' as ObjectKey] as string
        };
        return ret;

    }
    const studentSignUpQuery=gql`
    mutation createStudent($username:String!,$password:String!){
        createStudent(input:{
            user:{
                username:$username
                password:$password
            }
        }){
            id
            grades{
                id
                TaskName
                grade
                className
            }
            classes{
                id
                students
                teacher
                name
            }
            displaceException{
                id
                className
                massage
            }
        }
    }
    `;
    const studentSignUpQueryID=
    gql`
    mutation createStudent($username:String!,$password:String!){
        createStudent(input:{
            user:{
                username:$username
                password:$password
            }
        }){
            id
        }
    }
    `;
    const GetStudentByIdQuerey=gql`
    query getStudentById($id:ID){
        getStudentById(input: {id:$id}) {
            id
            displaceException {
            id
            massage
            className
            }
            grades {
            TaskName
            grade
            className
            }
            classes {
            id
            name
            students
            }
        }
    }
    `;
    const GetStudentUser=gql`
    query getStudentUser($id:Int){
        getStudentUser(input: {id: $id}) {
          username
          PointsTo
          isStudent
          id
        }
    }
    `;
    export async function GetStudentById(id:number):Promise<Student> {
        
        try{
            let result=await client.query({ query:GetStudentByIdQuerey,variables:{id:id}});
            let data=result.data
            let ret=GetStudentFromGraphQLJson(data);
            return ret;
        }catch(error){
            return errorStudent;
        }
        
    }
    export async function signup(username:string,password:string):Promise<Student> {
        let retUser:Student=errorStudent;
        client.mutate({
            mutation:studentSignUpQuery,
            variables:{username:username,password:password}
        }).then((studentAsJson)=>{
            let data=studentAsJson.data;
            console.log(data);
            retUser=GetStudentFromGraphQLJson(data);

        }).catch((error)=>{
            console.log(`we have no error handeling:${error}`);
            
        });
        return retUser;
    }
    export async function signupAndReturnUser(username:string,password:string):Promise<User> {
        let ret:User=UserService.errorUser;
        try {
            await client.mutate({mutation:studentSignUpQueryID,variables:{username:username,password:password}}); 
            ret=await UserService.login(username,password);
        } catch (error:any) {
            console.log(`there was an error uwu:${error}`);
            return UserService.errorUser;
        }
        return ret;
    }
    export const errorStudent:Student={
        id:-666,
        Grades:[],
        Classes:[],
        DisplaceExceptions:[],
    };
    
}