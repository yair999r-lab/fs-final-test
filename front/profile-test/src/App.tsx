import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Sigup from './pages/Sigup'

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='sigup' element={<Sigup/>}/>
    

    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
