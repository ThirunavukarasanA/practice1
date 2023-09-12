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

  const edit = (ind) => {
    // console.log(ind);
    todo.map((v, i) => {
      if (i == ind) {
        setText(v)
      }
    })
  }

  return (
    <div>
      <input className='border' onChange={(e) => { change(e) }} value={text} />

      <button onClick={submit}>Add</button>

      {/* <button onClick={remove}>remove</button> */}
      <div>
        {todo?.map((a, i) => {
          // console.log(i);
          return (
            <h2 id="hh" style={{ color: "red" }}>{a} <span onClick={() => { removeitem(i) }} style={{ color: "black", cursor: "pointer" }} >*</span>
              <span onClick={() => { edit(i) }}>edit</span>
            </h2>
          )
        })}
      </div>
    </div>
  )
}
