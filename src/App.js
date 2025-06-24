import { useRef, useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';

function App() {

  const [text, setText] = useState("");
  const [todo_list, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [count,setCount] = useState(0);
  const dragPerson = useRef(0);
  const swappedPerson = useRef(0);

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
    let completedTemp = [...completedList];
    let updateData = todo_list.filter(item=>{
      if(item.id!==id){
        return item;
      }
      else{
        completedTemp.push(item);
      }
    });
    setTodoList(updateData);
    setCompletedList(completedTemp);
  }
    
  function handleSort(){
    const todoClone = [...todo_list];
    const temp = todoClone[dragPerson.current];
    todoClone[dragPerson.current] = todoClone[swappedPerson.current];
    todoClone[swappedPerson.current] = temp;
    setTodoList(todoClone);
  }

  return (
    <div className='container'>
      <Header/>
      <div className='todo-tasks'> 
          <h3>Enter your tasks to finish:</h3>
            <ul>
              {
                todo_list.length!==0?todo_list.map((item,index)=>
                  <li className='to_do'
                    onDragStart={()=>{dragPerson.current = index}}
                    onDragEnter={()=>{swappedPerson.current = index}}
                    onDragEnd={handleSort}
                    onDragOver={(e)=>e.preventDefault()}
                  >
                    <p>{item.text}</p>
                    <button onClick={()=>deleteItem(item.id)}>Done</button>
                  </li>
                )
                :completedList.length>0?<p>Great job completing all the tasks!</p>:<p>No Tasks to finish yet!</p> 
          
              }
            </ul>            
          <form className="todoForm" onSubmit={handleSubmit}>
            <input type="text" value={text} placeholder="Enter your task for the day...." onChange={(e)=>{setText(e.target.value)}}></input>
            <button type="submit">Submit</button>
          </form>
      </div>
      <div className='completed-tasks'>
        <h3>Completed Tasks</h3>
        <ul>
          {
            completedList.length===0?"You do not have any completed list yet":completedList.map((completed,index)=>
              <li key={index} className='to_do completed'>
                <p>{completed.text}</p>
              </li>
            )
          }
        </ul>
      </div>
      
    </div>
  );
}

export default App;

// add a progress bar
// make ui better
// save to local storage
