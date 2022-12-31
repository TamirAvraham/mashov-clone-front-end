import { Class } from "../models/class";
import { DisplaceException } from "../models/disExept";
import { Grade } from "../models/grade";
import { Student } from "../models/student";
export namespace StudentService{
    export function GetStudentFromGraphQLJson(jsonFromGraphQl:object)  {
        console.log('hi');
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
}