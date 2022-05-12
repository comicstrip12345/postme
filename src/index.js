import React from 'react'
import ReactDOM from 'react-dom'
import NotLoggedIn from './Components/NotLoggedIn'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./index.css"

const App = () => {
  return (
    <NotLoggedIn/>
  )
}

ReactDOM.render(<App/>, document.getElementById("root"))