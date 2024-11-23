import React from 'react'
import style from './UpdateProgram.module.scss'
import { useParams } from 'react-router-dom'

export default function UpdateProgram() {

    const {id} = useParams()

    const { category } = useParams();

    console.log("id is ", id);
    console.log("category is ", category);

  return (
    <div>UpdateProgram</div>
  )
}
