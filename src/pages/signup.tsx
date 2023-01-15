import React, { useState } from 'react'
import Inputs from '../components/login-signup-inputs-and-header/inputs'
import InputsHeader from '../components/login-signup-inputs-and-header/inputs-header';
import User from '../models/user';
import { StudentService } from '../services/studentService'
interface props{
    updateMethod:React.Dispatch<React.SetStateAction<User>>
  }
function Signup({updateMethod}:props) {
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
        isTeacher?(<TeacherSignUp/>):(<StudentSignUp updateMethod={updateMethod}/>)
    }
    <a href="/">have a user? login</a>
    </>
  )
}

function StudentSignUp({updateMethod}:props) {
    return <Inputs text="Sign up" method={StudentService.signupAndReturnUser} updateMethod={updateMethod}/>;
}
function TeacherSignUp() {
    alert('not implemented on the backend yet');
    return <p>no teacher login for you</p>
}
export default Signup