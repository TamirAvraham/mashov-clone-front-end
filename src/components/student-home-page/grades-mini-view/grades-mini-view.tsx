import React from 'react'
import { Grade } from '../../../models/grade'
import  "./styles/grades-mini-view.css";
import GradeIteam from './grade-iteam'
interface props{
    grades:Grade[];
}
export default function GradesMiniView({grades}:props) {

  return (
    <div className='mini-view'>
        <h3>recent grades</h3>
        
        <ul id='grades-list'>
        {grades.map((grade)=><GradeIteam grade={grade}/>)}
        </ul>
    </div>
  )
}
