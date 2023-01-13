import React from 'react'
import Inputs from '../components/login-signup-inputs-and-header/inputs'
import InputsHeader from '../components/login-signup-inputs-and-header/inputs-header'
import {UserService} from '../services/userService'

export default function Login() {
    
  return (
    <>
    <InputsHeader/>
    <br /><br /><br /><br />
    <Inputs text='Login' method={UserService.login}/>
    <a href="/signup">dont have a user? sign up</a>
    </>
    
  )
}
