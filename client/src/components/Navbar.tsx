import React from 'react';
import {useLocation} from 'react-router-dom'

const Navbar = () => {

  let location = useLocation()
  let pointer = location.pathname.split('/')[1]
  if (!pointer){
    pointer = "home"
  }


  return(
    <nav>
      <a href="/">Chat</a>
      <a href="/settings">Settings</a>
      <div className={`animation start-${pointer}`}></div>
    </nav>
  )  

}

export default Navbar
