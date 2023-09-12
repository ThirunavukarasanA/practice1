import React, { useState, useEffect } from 'react'
import logo from '../../../src/logo.svg';

export default function Img() {
  const [set, setSet] = useState()
  useEffect(() => {
   setInterval(() => {
    setSet( () =>{
      return(
        <img src={logo}/>
        )
    })
   }, 5000);
  }, [])
  
  return (
    <div>
      <h2>Hi Hello</h2>
        {set ? <div>{set}</div>:null}
    </div>
  )
}
