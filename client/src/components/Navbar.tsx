import React from 'react';
import {useLocation} from 'react-router-dom'

const Navbar = () => {

  let location = useLocation()
  let pointer = location.pathname.split('/')[1]
  !pointer[1]? pointer = "home" : pointer = pointer[1]

  return(
    <nav>
      <a href="/">Chat</a>
      <a href="/recipes">Settings</a>
      <div className={`animation start-${pointer}`}></div>
    </nav>
  )  

}

export default Navbar
