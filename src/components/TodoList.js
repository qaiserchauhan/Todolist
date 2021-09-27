import React, { useState,useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';


// to get the data from LS


const getLocalItmes = () => {
  let list = localStorage.getItem('lists');
  console.log(list);
  
  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}



function TodoList() {
  const [todos, setTodos] = useState(getLocalItmes([]));
 

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

    // add data to localStorage
    useEffect(() => {
      localStorage.setItem('lists', JSON.stringify(todos))
   }, [todos]);

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
