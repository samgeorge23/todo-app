import React from 'react'

const Banner = ({data,deleteItem}) => {

  return (
    <li>
        <p>{data.text}</p>
        <button onClick={()=>deleteItem(data.id)}>Delete</button>
    </li>
  )
}

export default Banner