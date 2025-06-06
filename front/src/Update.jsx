import React from 'react'
import { useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom'
import axios from 'axios'

const Update = () => {

  const {id} = useParams()
   const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [age, setAge] = React.useState('');
  const navigate = useNavigate();
 
   useEffect(()=>{
    axios.get('http://localhost:3000/getuser/'+id)
   .then(res => {
     console.log(res.data);
     setName(res.data.name);
     setEmail(res.data.email);
     setAge(res.data.age);
   })
   .catch((err)=>console.log(err))
  }, [])

  const submitupdate = (e) => {
    e.preventDefault();
    const updatedUser = {
      name: name,
      email: email,
      age: age
    };
    axios.put('http://localhost:3000/update/'+id, updatedUser)
    .then(res => {
      console.log(res.data);
      navigate('/');
    })
    .catch((err) => console.log(err));
  }
  


  return (
    <div>
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
            <h2 className='text-center'>Update User</h2>
            <form onSubmit={submitupdate}>
                <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input type='text' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='mb-3'>
                <label className='form-label'>Age</label>
                <input type='number' className='form-control' value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <button type='submit' className='btn btn-success w-100'>Update User</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Update