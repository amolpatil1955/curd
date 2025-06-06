import { useState } from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Update from './Update';
import Create from './Create';
import Users from './users';

function App() {
  const [count, setCount] = useState(0)

  return (
<div>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Users />} />
    <Route path="/create" element={<Create />} />
    <Route path="/update/:id" element={<Update />} />
  </Routes>
  </BrowserRouter>
  
  </div>
  )
}

export default App
