import React from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const[todos, settodos] = React.useState([])
  const[todo, settodo] = React.useState("")
  const[edittodo, setedit] = React.useState(null)
  const[edittext, settext] = React.useState("")

  React.useEffect(() => {
    const temp = localStorage.getItem("todos")
    const loadedtodos = JSON.parse(temp)

    if (loadedtodos)
    {
      settodos(loadedtodos)
    }
  },[])

  React.useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos",temp)
  },[todos])

  function sumbit(e){
    e.preventDefault()

    const newtodo={
      id: new Date().getTime(),
      text: todo,
      completed: false
    }

    settodos([... todos].concat(newtodo))
    settodo("")


  }
  function deleteTodo(id){
    const updatelist = [ ... todos].filter((todo)=> todo.id !== id)
    settodos(updatelist)
  }

  function completedtodo(id){
    const updatelist = [... todos].map((todo) => {
      if(todo.id === id)
      {
        todo.completed = !todo.completed
      }
      return todo
  
    })

    settodos(updatelist)
  }

  function submitedit(id){
     const submittext = [... todos].map((todo) => {
      if(todo.id === id)
      {
        todo.text=edittext
      }
      return todo
     })
     settodos(submittext)
     setedit(null)
     settext("")
  }
  return (
    <div className="App">
      <form onSubmit={sumbit}>
        <input type='text' onChange={(e)=>settodo(e.target.value)} value={todo}/> 
        <button type='submit'>Submit Todo</button>

      
      </form>

      {todos.map(todo => 
      <div key={todo.id}>
       

        {edittodo === todo.id ? ( <input type='text' 
        onChange={(e)=>settext(e.target.value)}
        value={edittext}></input>) 
        : (<div>{todo.text}</div>)}
        
        <button onClick={()=> deleteTodo(todo.id)}>Delete</button>
        <input type='checkbox' onChange={() => completedtodo(todo.id)} checked={todo.completed}></input>
        {edittodo === todo.id ? (<button onClick={() => 
        submitedit(todo.id)}>submit edit</button>):
        (<button onClick={() => setedit(todo.id)}>Edit</button>)}
        
        
      
      </div>)}
    </div>
  );
}

export default App;
