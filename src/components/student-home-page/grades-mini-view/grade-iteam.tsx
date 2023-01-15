import React from 'react'
import { Grade } from '../../../models/grade';
import './styles/grades-iteam.css'
interface props{
    grade:Grade;
}
export default function GradeIteam({grade}:props) {
  return (
    <li>
        <h1>{grade.Grade}</h1>
        <h4> on {grade.TaskName}</h4>
        <h2> in {grade.ClassName}</h2>
    </li>
  )
}
