import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Banner from './components/Banner.jsx';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function App() {

  const [text, setText] = useState("");
  const [todo_list, setTodoList] = useState([]);
  const [count,setCount] = useState(0);

  function handleSubmit(e){
    e.preventDefault();
    let trimmedText = text.trim();
    if(trimmedText.length>0){
      let uppercaseText = trimmedText.charAt(0).toUpperCase()+ trimmedText.slice(1).toLowerCase();
      let data = {
        id:count,
        text:uppercaseText
      };
      if(count===0){
        setTodoList([data]);
      }
      else{
        setTodoList([...todo_list,data]);
      }
      setText("");
      setCount(count+1);
    }
  }

  function deleteItem(id){
    let updateData = todo_list.filter(item=>item.id!==id);
    console.log(updateData);
    setTodoList(updateData);
  }
    

  return (
    <div className='container'>
      <Header/>
      <div className='todo-tasks'>
        <h3>Enter your tasks to finish:</h3>
        <ul>
            {
              todo_list.length===0?"No tasks to finish yet.....":todo_list.map((item,index)=><Banner data={item} key={index} deleteItem={deleteItem}/>)
            }
        </ul>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input type="text" value={text} placeholder="Enter your task for the day...." onChange={(e)=>{setText(e.target.value)}}></input>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className='completed-tasks'>
        <h3>Completed Tasks</h3>
      </div>
      
    </div>
  );
}

export default App;
