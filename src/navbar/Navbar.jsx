import React, {useState, useEffect} from "react";
import './navbar.css'
import { FaBusAlt } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'
import { Link } from "react-router-dom";
import NBImage from '../Assets/New-Balance-Emblem.png'
import { FaShoppingCart } from 'react-icons/fa'
import Order from '../goods/Order'
//import isAuthenticated from "../../Components/Login/Login";

function Navbar() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('orders')) || []);
    const [items, setItems] = useState(undefined);
    const [showCart, setShowCart] = useState(false);
    const [active, setActive] = useState('navBar');
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const handleAddToCart = (event) => {
          const item = event.detail;
          const isItemInCart = cart.some(cartItem => cartItem.id === item.id);
      
          if (!isItemInCart) {
            const newCart = [...cart, item];
            setCart(newCart);
            localStorage.setItem('orders', JSON.stringify(newCart));
            setCartOpen(true); // Open the cart
          }
        };
      
        window.addEventListener('addToCart', handleAddToCart);
      
        return () => {
          window.removeEventListener('addToCart', handleAddToCart);
        };
      }, [cart]);

    const handleRemoveFromCart = (itemToRemove) => {
        const newCart = cart.filter(item => item.id !== itemToRemove.id);
        setCart(newCart);
        localStorage.setItem('orders', JSON.stringify(newCart));
      };

      const showOrders = () => {
        const items = JSON.parse(localStorage.getItem('orders'));
        const total = items.reduce((sum, item) => sum + Number(item.price), 0);
      
        return (
          <div>
            {items.map((item, index) => (
              <Order key={index} item={item} onRemove={handleRemoveFromCart} />
            ))}
            <p className="total">Total: {total.toFixed(2)}$</p>
            <Link to="/login">
            <button className="checkout-button" 
            onClick={() => setCartOpen(cartOpen =!cartOpen)}>Checkout</button>
            </Link>
          </div>
        );
      };

    const showNothing = () => {
        return (
            <div className="empty">
                <h2>Your cart is empty</h2>
            </div>
        )
    }

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

                      {/*  <li className="navItem">
                            <Link to="/" className="navLink">Contact</Link>
                        </li>
                       */}
                        <li className="navItem">
                            <Link to="/login" className="navLink">Login</Link>
                        </li>
      

                        <li1 onClick={() => setCartOpen(cartOpen =!cartOpen)} 
                        className={`shop-cart-button ${cartOpen && 'active'}`}>  
                        <Link className="btn"><FaShoppingCart className="btnn"/></Link>
                        </li1>

                        {cartOpen && (
                            <div className="shop-cart">
                                {cart.length > 0 ? showOrders() : showNothing()}
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