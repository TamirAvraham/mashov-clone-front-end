import React from 'react'
import { Student } from '../../models/student';
import  User  from "../../models/user";
//import './styles/inputs.css'
interface InputsInput{
  text:string;
  method:(username:string,password:string)=>any;
};
const Inputs= ({text,method}:InputsInput)=> {//(username:string,password:string)=>User 
    let password="",username="",error="";
    let user:User;
    let updateUsername=(event:any)=>username=event.target.value;
    let updatePassword=(event:any)=>password=event.target.value;
    let onPress=()=>{
        if (password==="" || username==="") {
            error="enter a password and a username";
        }
      console.log("password:%s ,username:%s",password,username);
        
       user=method(username,password);


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