import React, { useState, useEffect } from 'react'

export default function Todo() {

  const [text, setText] = useState('');
  const [todo, setTodo] = useState([]);

  const change = (e) => {
    setText(e.target.value)
  };

  const submit = () => {
    setTodo((v) => [
      ...v, text
    ])
    setText('')
  }

  const removeitem = (ind) => {
    // console.log("sdadadd");
    setTodo((current) =>
      current.filter((fruit, i) => i !== ind)
    );
  }

  const edit = (e) => {
    // console.log(ind);
    todo.map((v, i) => {
      if (i == e) {
        setText(v)
      }
    })
    // setText(e)
  }

  return (
    <div>
      <input className='border' onChange={(e) => { change(e) }} value={text} />

      <button onClick={submit}>Add</button>

      <div>
        {todo?.map((a, i) => {
          // console.log(i);
          return (
            <h2 id="hh" style={{ color: "green" }}>{a} : <span onClick={() => { removeitem(i) }} style={{ color: "red", cursor: "pointer" }} > "Delete" </span>
              <span onClick={(e) => {edit(e)}} style={{ color: "blue", cursor: "pointer" }}> "Edit" </span>
            </h2>
          )
        })}
      </div>
    </div>
  )
}
