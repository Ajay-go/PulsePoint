import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Doc_tile from '../components/doctor_tiles'
import Slider from '../components/doctor_slider'
import Searchbar from '../components/Search_bar'
import Customer_Tile from '../components/customer_tile'
import Customer_slider from '../components/Customer_slider'
import HomePage from '../pages/Home_page'
import Signup_page from '../pages/Signup_page'
import Login_page from '../pages/Login_page';
import Profile_Page from "../pages/Profile_page";
import Book from '../pages/Book_appointment'
import SearchResultsPage from '../pages/Search_result'
import Doc_login from '../pages/doctor_login'
import Chat from '../pages/chat_with_ai'
// Create simple page components for demonstration




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/signup" element={<Signup_page />} />
        <Route path="/login" element={<Login_page />} />
        <Route path="/profile" element={<Profile_Page />} />
        <Route path="/book_appointment/:field/:fullname" element={<Book />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route path="/doctor/signup" element={<Doc_login />} />
         <Route path="/chat" element={<Chat />} />
      
      </Routes>
    </Router>
  )
}

export default App
