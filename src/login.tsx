import React from 'react'
import Inputs from './login-signup-inputs-and-header/inputs'
import {UserService} from './services/userService'

export default function Login() {
    
  return (
    <Inputs text='Login' method={UserService.login}/>
  )
}
