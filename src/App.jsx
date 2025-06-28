import React, { useState } from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Login from '../src/pages/Login'
import SignUp from '../src/pages/SignUp'
import Home from '../src/pages/Home'
import RefreshHandle from './RefreshHandle'
function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element: <Navigate to ='/login'/>
  }
  return (
    <div >
       <RefreshHandle setisAuthenticated = {setisAuthenticated} />
      <Routes>
        <Route path='/' element ={<Navigate to = "/login"/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    </div>
  )
}

export default App