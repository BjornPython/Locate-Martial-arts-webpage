import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './public/routes/Home';
import Header from './public/comps/Header';
import Footer from './public/comps/Footer';


import "./public/scripts/animations"

function App() {
  return (
    <div className='main-app'>
      <Router>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>

        <Footer/>
        
      </Router>

    </div>
  );
}

export default App;
