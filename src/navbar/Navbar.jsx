import React, {useState} from "react";
import './navbar.css'
import { FaBusAlt } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'
import { Link } from "react-router-dom";
import NBImage from '../Assets/New-Balance-Emblem.png'
//import isAuthenticated from "../../Components/Login/Login";

function Navbar() {
    const [items, setItems] = useState(undefined);
    const [showCart, setShowCart] = useState(false);
    const [active, setActive] = useState('navBar');
    const [isOpen, setIsOpen] = useState(false);
    const cart = {}; // You need to define cart
    //Functions show Nav
    const showNav = () => {
        setActive('navBar activeNavbar')
    }

    //Functions remove Nav
    const removeNavbar = () => {
        setActive('navBar')
    }

    /*const handleCabinet = () => {
        if (isAuthenticated) {
          setCab("/cabinet");
        } else {
          setCab("/login");
        }
      };*/

      let navItems = document.querySelectorAll('.navItem');

      navItems.forEach((navItem) => {
        let timeout;
        navItem.addEventListener('mouseenter', function() {
          clearTimeout(timeout);
          this.querySelector('.submenu').style.maxHeight = '500px';
          this.querySelector('.submenu').style.opacity = '1';
          this.querySelector('.submenu').style.visibility = 'visible';
        });
      
        navItem.addEventListener('mouseleave', function() {
            timeout = setTimeout(() => {
              this.querySelector('.submenu').style.maxHeight = '0';
              this.querySelector('.submenu').style.opacity = '0';
              this.querySelector('.submenu').style.visibility = 'hidden';
            }, 100); // Adjust this value as needed
          });
      });

    return (
        <section className='navBarSection'>
            <header className="header flex">

                <div className="logoDiv">
                    <a href="/" className="logo flex">
                        <h1><img src={NBImage} className="icon"/>New-Balance</h1>
                    </a>
                </div>
                
                <div className={active}>
                    <ul className="navLists flex">

                    <li className="navItem">
    <Link className="navLink" onClick={(event) => {event.preventDefault(); setShowCart(!showCart);}}>Catalog</Link>
    {showCart && (
    <ul className="submenu">
        <li className="navLink"><Link to="/men">Men</Link></li>
        <li className="navLink"><Link to="/women">Women</Link></li>
        <li className="navLink"><Link to="/kids">Kids</Link></li>
    </ul>
    )}
</li>

                        <li className="navItem">
                            <Link to="https://lvivtrans-back.azurewebsites.net/swagger-ui/index.html#/" target="_blank" className="navLink">Swagger UI</Link>
                        </li>

                        <li className="navItem">
                            <Link to="https://martian-rocket-872062.postman.co/workspace/My-Workspace~3b4ced84-7916-48f5-8c8b-d237abf64f4c/collection/28092903-3b08e2d2-bad8-4bc0-a565-df13a866f793?action=share&creator=28093284" target="_blank" className="navLink">Postman</Link>
                        </li>

                        <li className="navItem">
                            <Link to="/" className="navLink">Contact</Link>
                        </li>

                        <Link className="btn" to="/login">Login</Link>
                        
                    </ul>

                    <div onClick={removeNavbar} className="closeNavbar">
                        <AiFillCloseCircle className="icon"/>                    
                    </div>
                </div>

                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots className="icon"/>
                </div>

            </header>
        </section>
    )
}


export default Navbar