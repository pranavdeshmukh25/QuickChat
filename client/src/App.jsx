import React from 'react';
import SignIn from './pages/signIn/signIn.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from 'react-router-dom';
import SignUp from './pages/signUp/signUp.jsx';
import Home from './pages/home/home.jsx';
import { VerifyUser } from './utils/verifyUser.jsx';

function App() {


  return (
    <>
      <div className='w-full h-screen flex items-center justify-center'>
        <Routes>  
          <Route path="/signin" element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route element={<VerifyUser />}>
          <Route path='/' element={<Home />} />
          </Route>
        </Routes>
      </div>
    <ToastContainer />
    </>
  )
}

export default App
