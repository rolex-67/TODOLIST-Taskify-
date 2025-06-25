import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Navbar.jsx'
import { v4 as uuidv4 } from 'uuid';
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
uuidv4();

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const togglefinished=(e) => {
    
  }
  
  


  const handleDelete = (e, id) => {
    const confirmdelete = window.confirm("Are you sure you want to delete the task?")
    if (!confirmdelete) return;
    let newTodos = todos.filter(items => {
      return items.id !== id
    })
    setTodos(newTodos)
    saveToLS ()
    
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(items => items.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(items => {
      return items.id !== id
    })
    setTodos(newTodos)
    saveToLS ()
  }

  const handleAdd = () => {
    if (todo.trim() === "") return (alert("Please Type Something"))
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("")
    saveToLS ()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
    saveToLS ()
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-300 min-h-[80vh]">
        <div className="main text-2xl font-bold mb-9">Taskify-"Master your tasks. Rule your routine."</div>
        <div className="addtodo">
          <h2 className="text-lg font-bold mb-3 mt-2">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-3/4 bg-white text-black rounded-full py-2"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-indigo-900 p-3 py-1 font-bold text-white rounded-md mx-6"
          >
            Save
          </button>
        </div>
        <input onChange={togglefinished} type="checkbox" className="type"  checked={showfinished}/>Show Finished
        <h2 className="text-xl font-bold mt-5">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos To Display</div>}
          {
            todos.map((items, id) => {
              return ((showfinished) || (!isCompleted)) && (
                <div className="todo md:flex w-full justify-between my-3" key={items.id}>
                  <div className='flex gap-5'>
                    <input name={items.id} onChange={handleCheckbox} type="checkbox" checked={items.isCompleted} className="checkbox flex" />
                    <div className={items.isCompleted ? "line-through" : ""}>
                      {items.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-fu">
                    <button
                      onClick={(e) => handleEdit(e, items.id)}
                      className="bg-violet-800 hover:bg-indigo-900 p-3 py-1 font-bold text-white rounded-md mx-6"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, items.id)}
                      className="bg-violet-800 hover:bg-indigo-900 p-3 py-1 font-bold text-white rounded-md mx-6"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
