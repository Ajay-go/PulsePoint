import './App.css'
import Doc_tile from '../components/doctor_tiles'
import Slider from '../components/doctor_slider'
import Shortcut_bar from '../components/shortcut_bar'
import Searchbar from '../components/Search_bar'
import Customer_Tile from '../components/customer_tile'
import Customer_slider from '../components/Customer_slider'
function App() {

  return (
    <>
     <div id='main_page'>
        <Searchbar></Searchbar>
        <Shortcut_bar></Shortcut_bar>
        <Slider></Slider>
        <Customer_slider></Customer_slider>
     </div>
    </>
  )
}

export default App
