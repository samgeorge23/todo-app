import React from 'react'
import "./Banner.css";

const Banner = ({data,deleteItem}) => {

  return (
    <li className='to_do'>
        <p>{data.text}</p>
        <button onClick={()=>deleteItem(data.id)}>Delete</button>
    </li>
  )
}

export default Banner