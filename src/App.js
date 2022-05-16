import React from 'react'
import Footer from './Components/Footer';
import Hero from './Components/Hero';
import HeroRegisterForm from './Components/HeroRegisterForm';
import HeroRegisterProfile from './Components/HeroRegisterProfile';
import HeroLogInForm from './Components/HeroLogInForm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./index.css"
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import IndividualProfile from './Components/IndividualProfile';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Hero/>}></Route>
                <Route path='/register' element={<HeroRegisterForm/>}></Route>
                <Route path='/regprofile' element={<HeroRegisterProfile/>}></Route>
                <Route path='/login' element={<HeroLogInForm/>}></Route>
                <Route path='/profile/:userid' element={<IndividualProfile/>}></Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App