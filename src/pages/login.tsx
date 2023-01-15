import React from 'react'
import Inputs from '../components/login-signup-inputs-and-header/inputs'
import InputsHeader from '../components/login-signup-inputs-and-header/inputs-header'
import User from '../models/user'
import {UserService} from '../services/userService'
interface props{
  updateMethod:React.Dispatch<React.SetStateAction<User>>
}
export default function Login({updateMethod}:props) {
    
  return (
    <>
    <InputsHeader/>
    <br /><br /><br /><br />
    <Inputs text='Login' method={UserService.login} updateMethod={updateMethod}/>
    <a href="/signup">dont have a user? sign up</a>
    </>
    
  )
}
