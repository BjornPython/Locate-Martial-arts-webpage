import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


import UserHome from './public/routes/UserHome';

import { useEffect } from 'react';
import AppHome from './public/routes/AppHome';



function App() {

  const { user } = useSelector((state) => state.auth)

  return (
    <Router>
      <Routes>

        <Route path='/' element={<AppHome />} />
        <Route path='/userhome' element={<UserHome />} />
      </Routes>

    </Router>

  )


}

export default App;
