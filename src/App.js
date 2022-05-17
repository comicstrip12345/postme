import React from 'react'
import Hero from './Components/Hero';
import HeroRegisterForm from './Components/HeroRegisterForm';
import HeroRegisterProfile from './Components/HeroRegisterProfile';
import HeroLogInForm from './Components/HeroLogInForm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./index.css"
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import IndividualProfile from './Components/IndividualProfile';
import SearchPage from './Components/SearchPage';
import OtherProfile from './Components/OtherProfile';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Hero/>}></Route>
                <Route path='/register' element={<HeroRegisterForm/>}></Route>
                <Route path='/regprofile/:usernameReg' element={<HeroRegisterProfile/>}></Route>
                <Route path='/login' element={<HeroLogInForm/>}></Route>
                <Route path='/profile/:userid' element={<IndividualProfile/>}></Route>
                <Route path='/profile/:userid/:wallOwnerId' element={<OtherProfile/>}></Route>
                <Route path='/searchpage/:userid' element={<SearchPage/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App