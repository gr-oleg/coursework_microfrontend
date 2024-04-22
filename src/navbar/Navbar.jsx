import React, {useState} from "react";
import './navbar.css'
import { FaBusAlt } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'
import { Link } from "react-router-dom";
import NBImage from '../Assets/New-Balance-Emblem.png'
import { FaShoppingCart } from 'react-icons/fa'
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

      let [cartOpen, setCartOpen] = useState(false);


    return (
        <section className='navBarSection'>
            <header className="header flex">

                <div className="logoDiv">
                    <a href="/" className="logo flex">
                        <img src={NBImage}/>
                    </a>
                </div>
                
                <div className={active}>
                    <ul className="navLists flex">

                    <li className="navItem">
                            <Link to="/" className="navLink">Home</Link>
                        </li>

                        <li className="navItem"
                        
                        onMouseEnter={() => setShowCart(true)}
                        onMouseLeave={() => setShowCart(false)}
>
                        <Link className="navLink">Catalog</Link>
                        {showCart && (
                         <ul className="submenu">
                            <li className="navLink"><Link to="/men">Men</Link></li>
                            <li className="navLink"><Link to="/women">Women</Link></li>
                            <li className="navLink"><Link to="/kids">Kids</Link></li>
                        </ul>
                          )}
                        </li>

                        <li className="navItem">
                            <Link to="/" className="navLink">Contact</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/login" className="navLink">Login</Link>
                        </li>

                        <li1 onClick={() => setCartOpen(cartOpen =!cartOpen)} 
                        className={`shop-cart-button ${cartOpen && 'active'}`}>  
                        <Link className="btn"><FaShoppingCart className="btnn"/></Link>
                        </li1>

                        {cartOpen && (
                            <div className="shop-cart">
                            </div>
                        
                        )}
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