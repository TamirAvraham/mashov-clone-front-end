import React, { useState } from 'react'
import Inputs from '../components/login-signup-inputs-and-header/inputs'
import InputsHeader from '../components/login-signup-inputs-and-header/inputs-header';
import { StudentService } from '../services/studentService'

function Signup() {
    let [isTeacher,SetIsTeacher]=useState(false);
    let toggle=()=>{
        SetIsTeacher(!isTeacher);
    };
  return (
    <>
    <InputsHeader/>
    <input type="checkbox" name="toggle" id="is-teacher" onChange={toggle}/>
    <label htmlFor="is-teacher"> are you a teacher?</label>
    {
        isTeacher?(<TeacherSignUp/>):(<StudentSignUp/>)
    }
    <a href="/">have a user? login</a>
    </>
  )
}

function StudentSignUp() {
    return <Inputs text="Sign up" method={StudentService.signup} />;
}
function TeacherSignUp() {
    alert('not implemented on the backend yet');
    return <p>no teacher login for you</p>
}
export default Signup