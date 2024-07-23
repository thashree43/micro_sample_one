import React from 'react'
import Postcreate from './Postcreate'
import Postslists from './Postslists'


const App = () => {
  return (
    <div>
      <h1>Create Posts</h1>
      <Postcreate/>
      <hr />
      <h1>POSTS</h1>
      <Postslists />

    </div>
  )
}

export default App
