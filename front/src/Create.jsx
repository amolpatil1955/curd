import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

  import { ToastContainer, toast } from 'react-toastify';

const Create = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [age, setAge] = React.useState('');
  const navigate = useNavigate();
  const successMsg = () => {
    toast.success('User created successfully');
  }

  const errorMsg = () => {
    toast.error('Failed to create user');
  }

  const submit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/create', {
      name, email, age
    }).then((res) => {
      if (res.status === 201) {
        setName('');
        setEmail('');
        setAge('');
        successMsg();
        setTimeout(() => {
          navigate('/'); // Redirect to home page after successful creation
        }, 1500); // Wait for toast to show before navigating

      }
    }).catch((err) => {
      console.error('Error creating user:', err);
      errorMsg();
    });
  }

  return (
    <div>
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
            <h2 className='text-center'>Create User</h2>
            <form onSubmit={submit}>
                <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input type='text' className='form-control'  onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type='email' className='form-control' onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className='mb-3'>
                <label className='form-label'>Age</label>
                <input type='number' className='form-control' onChange={(e)=>setAge(e.target.value)} />
                </div>
                <button type='submit' className='btn btn-success w-100'>Create User</button>
            </form>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Create