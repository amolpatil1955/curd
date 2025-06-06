import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
const users = () => {

    const [Users, setUsers] = React.useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000')
    .then(res => setUsers(res.data))
  }, [])
 
  const deleteUser = (id) => {
    axios.delete('http://localhost:3000/delete/'+id)
    .then(res => {
      console.log(res.data);
      setUsers(Users.filter(user => user._id !== id));
    });
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
           <Link to="/create" className='btn btn-success'>Create + </Link>
           <h2 className='text-center'>Users</h2> 
            <table className='table'>

            <thead>
                <tr>
                    <th>name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Actions</th>
                </tr>
            </thead> 
            <tbody>
                {
                    Users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>
                                <Link to={`/update/${user._id}`} className='btn btn-primary m-2'>Update</Link>
                                <button className='btn btn-danger m-2 ' onClick={() => deleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody> 
             </table>
        </div>
    </div>
  )
}

export default users