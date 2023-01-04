import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './public/comps/Home';
import Header from './public/comps/Header';
import Footer from './public/comps/Footer';
import UserHome from './public/routes/UserHome';

import { useEffect } from 'react';
import AppHome from './public/routes/AppHome';

import AppHomeScript from './public/scripts/AppHomeScript';

function App() {
  const abortCont = new AbortController();

  const { user } = useSelector((state) => state.auth)

  return (
    <Router>
      <Header />
      <Routes>
        {!user && <Route path='/' element={<AppHome />} />}
        {user && <Route path='/userhome' element={<UserHome />} />}
      </Routes>

      <Footer />
    </Router>
  )


}

export default App;
