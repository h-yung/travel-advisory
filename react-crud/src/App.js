import React, { useEffect } from 'react'; //fetch data
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddAdvisory from './components/AddAdvisory';
import Advisory from './components/Advisory';
import AdvisoryList from './components/AdvisoryList';


function App(props) {
  useEffect(()=> {
    // or use axios?
    fetch('http://localhost:8081/api/advisories/')
      .then(res => res.json())
      .then(data => console.log(data)) //tbc
  })
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href='/advisories' className='navbar-brand'>
          Travel prepared.
        </a>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={'/advisories'} className='nav-link'>
              Advisories
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={'/add'} className='nav-link'>
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={<AdvisoryList/>} /> 
          <Route path='/advisories' element={<AdvisoryList/>} />   {/* note */}
          <Route path='/add' element={<AddAdvisory/>} /> 
          <Route path='/advisories/:id' element={<Advisory/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App;