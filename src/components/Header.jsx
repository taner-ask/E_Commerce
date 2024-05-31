import React, { useState} from 'react'
import '../css/Header.css'
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import {useNavigate} from "react-router-dom";
import Badge from '@mui/material/Badge';
import {useDispatch, useSelector} from 'react-redux'
import { setDrawer } from '../redux/slices/basketSlice';

function Header() {
  const[them, setTheme] = useState(true);

  const {products} = useSelector((store) => store.basket);

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const changeTheme = () => {
    const root = document.getElementById("root");

    if(them){
      root.style.backgroundColor="black";
      root.style.color="#fff";
    } else{
      root.style.backgroundColor="#fff";
      root.style.color="black";
    }

    setTheme(!them);

  }

  return (
    <div className='header-div'>
      <div className='flex-row'>
        <img onClick={() => {
        navigate("/")
      }} className='logo' src="./src/images/logo.png"/>
        <p className='logo-text'>My Cat</p>
      </div>

      <div>
        <input className='search-input' type="text" placeholder='Bir şeyler ara.' />
        
        {them ? <MdDarkMode className='icon' onClick={changeTheme}/> : <MdOutlineLightMode className='icon' onClick={changeTheme}/>}
        <Badge onClick={() => dispatch(setDrawer())} badgeContent={products.length} color="error">
          <FaShoppingCart color="action" />
         </Badge>
      </div>

    </div>
  )
}

export default Header