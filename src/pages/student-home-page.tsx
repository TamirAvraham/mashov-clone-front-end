import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import GradesMiniView from '../components/student-home-page/grades-mini-view/grades-mini-view';
import { Student } from '../models/student';
import { StudentService } from "../services/studentService";

export default function StudentHomePage() {
    let [ret,updateRet]=useState(<p>Loading...</p>)
    let params=useParams();
    let student=StudentService.errorStudent;
    let id=parseInt(params.id!);
    
    StudentService.GetStudentById(id).then((resStudent)=>{
        console.log(resStudent);
        student=resStudent;
        if (student.id!==StudentService.errorStudent.id) {
            console.log(student);
            updateRet(<p>{student.id}</p>);
            let jsx=(student:Student)=>{
                return <GradesMiniView grades={student.Grades}/>
            }
            updateRet(jsx(student))
        }
    }).catch((error)=>{
        updateRet(<p>error has happend {error}</p>);
    });

    return ret;
}
