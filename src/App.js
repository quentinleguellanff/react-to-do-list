import './App.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


function App() {

  return (
    <div className="App">
      <ToDoList/>
    </div>
  );
}

function Item(props){
  return (
    <li key={props.id}>
      <label>
      <input type="checkbox"/>
      {props.text}
      </label>
      <button onClick={() => props.delete(props.id)}>supprimer</button>
    </li>
  );
}

function ToDoList(){

  const [toDoItems, setToDoItems] = useState(() => {
      const saved = localStorage.getItem('toDoItems');
      const value = JSON.parse(saved)
      if(value !== null){
        return value
      }
      else{
        return []
      }
  });
  const [input, setInput] = useState(() => {
    const saved = localStorage.getItem('input');
    const value = JSON.parse(saved)
    if(value !== null){
      return value
    }
    else{
      return ""
    }
  });

  useEffect(() => {
      localStorage.setItem('input', JSON.stringify(input))
      localStorage.setItem('toDoItems', JSON.stringify(toDoItems))
  }, [input,toDoItems])

  const handleSubmit = e => {
    e.preventDefault()
    if(input !== ""){
      const newArray = [...toDoItems]
    
      const newItem = {text: input, id: uuidv4()}
  
      setInput('')
      newArray.unshift(newItem)
  
      setToDoItems(newArray)
    }
  }


  function deleteItem(id) {
    setToDoItems(toDoItems.filter(item => {return item.id !== id}))
  }

  return (
    <div id='toDoList'>
      <form onSubmit={e => handleSubmit(e)}>
    <h2>My to do list</h2>
    <input
        id="new-todo"
        onChange={(e) => {setInput(e.target.value)}}
        value={input}
      />
    <button>ajouter</button>
    <ul>
          {toDoItems.map((item, index) => {
          return (
          <Item 
          text={item.text}
          key={item.id}
          id={item.id}
          index={index}
          delete={deleteItem}
          />
          )
        })}
    </ul></form>
    </div>
  );
}
export default App;
