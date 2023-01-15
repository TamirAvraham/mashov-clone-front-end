import React from 'react'
import { Student } from '../../models/student';
import { Route, useNavigate } from "react-router-dom";
import  User  from "../../models/user";
import { UserService } from '../../services/userService';
import StudentHomePage from '../../pages/student-home-page';
//import './styles/inputs.css'
interface InputsInput{
  text:string;
  method:(username:string,password:string)=>Promise<User>;
  updateMethod:React.Dispatch<React.SetStateAction<User>>
};
const Inputs= ({text,method,updateMethod}:InputsInput)=> {//(username:string,password:string)=>User 
    let password="",username="",error="";
    let user:User;

    const navigation=useNavigate();

    let updateUsername=(event:any)=>username=event.target.value;
    let updatePassword=(event:any)=>password=event.target.value;

    const onPress=()=>{
      
        if (password==="" || username==="") {
            error="enter a password and a username";
        }
      console.log("password:%s ,username:%s",password,username);
        
      method(username,password).then((retUser)=>{
        user=retUser
        console.log(user);
        if (user.id!==UserService.errorUser.id) {
          updateMethod(user);
          const route=`/${user.IsStudent?"student":"teacher"}/home/${user.PointsTo}`;
          console.log(route);
          
          navigation(route);
        }
      });
      
      
    }
  return (
    <div id="inputs" className='inputs'>
        <p>username:</p>
        <br /><input type="text" name="username-input" id="username"  onChange={updateUsername}/>
        <br /><br /><br />
        <p>password:</p>
        <input type="password" name="password-input" id="password" onChange={updatePassword} />
        <br /><br /><br />
        <button onClick={onPress}>{text}</button>
        <br /><br /><br />
        <p>{error}</p>
    </div>
  )
}
export default Inputs;