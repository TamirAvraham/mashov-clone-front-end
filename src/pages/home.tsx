import React from 'react'
import { Link } from 'react-router-dom';
import User from '../models/user'
import { UserService } from '../services/userService';
import Login from './login';
import StudentHomePage from './student-home-page';

interface props{
    user:User;
    updateUser:React.Dispatch<React.SetStateAction<User>>
}
export default function Home({user,updateUser}:props) {
    
    
  const switchOnUser=(user:User)=>{
    console.log(user);
    if (user.IsStudent) {
        return <StudentHomePage/>
    }else{
        return <p>haha we don't have teachers implemented yet</p>
    }
  }  
  return (
    <div>
        {
        user!=UserService.errorUser?
        switchOnUser(user):
        <Login updateMethod={updateUser}/>
        }
    </div>
  )
}
