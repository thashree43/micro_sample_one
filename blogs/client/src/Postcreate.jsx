import React, { useState } from 'react'
import  axios from "axios"


function Postcreate() {
const [title,setTitle] = useState('')
 
const submitform = async (event) => {
  event.preventDefault();
  try {
    await axios.post('http://localhost:7000/post', { title });
    setTitle('');

  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
  return (
    <>
     <div>
      <form onSubmit={submitform}>
        <div className='form-group'>
          <label>NEW POSTS</label>
          <div className='form-control'>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} />
          </div>
          <div>
            <button className='btn btn-primary'>SUBMIT</button>
          </div>
        </div>
      </form>
     </div>
    </>
  )
}

export default Postcreate
