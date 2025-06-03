import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Doc_tile from '../components/doctor_tiles'
import Slider from '../components/doctor_slider'
import Searchbar from '../components/Search_bar'
import Customer_Tile from '../components/customer_tile'
import Customer_slider from '../components/Customer_slider'
import HomePage from '../pages/Home_page'
import Speciality_page from '../pages/Speciality_page'
import Signup_page from '../pages/Signup_page'
// Create simple page components for demonstration




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/speciality/:speciality" element={<Speciality_page />} />
        <Route path="/signup" element={<Signup_page />} />
      </Routes>
    </Router>
  )
}

export default App
