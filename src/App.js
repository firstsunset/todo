import { useEffect, useState } from "react";
import React from "react";

function App() {

  const [todos, setTodos] = useState(() => {
    
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  
  const [todo, setTodo] = useState({

    name: "",

    value: "",
    text: ""

  });
  const [checked, setChecked] = useState("");
  

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  
  function handleInputChange(e) {
    const value = e.target.value;
  
    setTodo({
  
      ...todo,
  
      [e.target.name]: value
  
    });
  }

  
  function handleFormSubmit(e) {
     e.preventDefault();
    
     if (todo !== "") {
      setTodos([
         ...todos,
        {
          id: todos.length + 1,
          textValue: todo.value,
          textName: todo.name
         
        }
      ]);
    }

    
    setTodo("");
  }
  
  return (
    <div className="debtor_list">
      
      <div>
        <label>ФИО</label>
        <input
          name="name"
          type="text"
          value={todo.name}
          onChange={handleInputChange}
        />
        <label>Задолженность</label>
        <input
          name="value"
          type="text"
          placeholder=""
          value={todo.value}
          onChange={handleInputChange}
        />
        <button onClick={handleFormSubmit}>Добавить</button>
      </div>
      
      <h2>Список должников</h2>
          <div className="create_new_debtor">
            <p>ФИО</p>
            <p>Задолженность</p>
            <p>Вернул</p>
            
          </div>
          <div className="list">
          {todos.map((todo) => (
            <div className='row' key={todo.id}>
            {todo.textName}
            {todo.textValue}
            <input type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App


