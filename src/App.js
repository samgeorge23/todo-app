import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Banner from './components/Banner.jsx';

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
    <div>
      <Header/>
      <h3>Enter the tasks to finish today:</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
        <button type="submit">Submit</button>
      </form>
      <ul>
          {
            todo_list.length===0?"":todo_list.map((item,index)=><Banner data={item} key={index} deleteItem={deleteItem}/>)
          }
      </ul>
      
      
    </div>
  );
}

export default App;
