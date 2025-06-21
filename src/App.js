import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';

function App() {

  const [text, setText] = useState("");
  const [todo_list, setTodoList] = useState([]);

  function handleSubmit(e){
    e.preventDefault();
    if(text.length>0){
      setTodoList([...todo_list,text]);
      setText("");
    }
    
  }

  return (
    <div>
      <Header/>
      <h3>Enter the tasks to finish today:</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
        <button type="submit">Submit</button>
      </form>
      <ul>
          {
            todo_list.map((item,index)=><li key={index}>{item}</li>)
          }
      </ul>
      
      
    </div>
  );
}

export default App;
