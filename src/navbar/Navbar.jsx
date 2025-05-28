import React, {useState, useEffect, useRef} from "react";
import './navbar.css'
import { FaBusAlt, FaShoppingCart, FaSearch } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'
import { Link, useNavigate } from "react-router-dom";
import NBImage from '../Assets/New-Balance-Emblem.png'
import Order from '../goods/Order'

function Navbar() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('orders')) || []);
    const [showCart, setShowCart] = useState(false);
    const [active, setActive] = useState('navBar');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allItems, setAllItems] = useState([]);
    let [cartOpen, setCartOpen] = useState(false);
    const searchInput = useRef(null);

    // Fetch all items for search
    useEffect(() => {
        fetch("http://16.171.137.58/item/getAll")
            .then(r => r.json())
            .then(items => {
                setAllItems(items);
            })
            .catch(() => setAllItems([]));
    }, []);

    useEffect(() => {
        const handleAddToCart = (event) => {
            const item = event.detail;
            const isItemInCart = cart.some(cartItem => cartItem.id === item.id);
            if (!isItemInCart) {
                const newCart = [...cart, item];
                setCart(newCart);
                localStorage.setItem('orders', JSON.stringify(newCart));
                setCartOpen(true);
            }
        };
        window.addEventListener('addToCart', handleAddToCart);
        return () => {
            window.removeEventListener('addToCart', handleAddToCart);
        };
    }, [cart]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleRemoveFromCart = (itemToRemove) => {
        const newCart = cart.filter(item => item.id !== itemToRemove.id);
        setCart(newCart);
        localStorage.setItem('orders', JSON.stringify(newCart));
    };

    const showOrders = () => {
        const items = JSON.parse(localStorage.getItem('orders')) || [];
        const total = items.reduce((sum, item) => sum + Number(item.price), 0);
        return (
            <div>
                {items.map((item, index) => (
                    <Order key={index} item={item} onRemove={handleRemoveFromCart} />
                ))}
                <p className="total">Total: {total.toFixed(2)}$</p>
                <Link to={isAuthenticated ? "/checkout" : "/profile"}>
                    <button className="checkout-button"
                        onClick={() => setCartOpen(cartOpen = !cartOpen)}>Checkout</button>
                </Link>
            </div>
        );
    };

    const showNothing = () => (
        <div className="empty">
            <h2>Your cart is empty</h2>
        </div>
    );

    // Навігація
    const showNav = () => setActive('navBar activeNavbar');
    const removeNavbar = () => setActive('navBar');

    // --- Пошук товарів ---
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value.length > 1 && allItems.length > 0) {
            const results = allItems.filter(item =>
                (item.name && item.name.toLowerCase().includes(value.toLowerCase())) ||
                (item.desc && item.desc.toLowerCase().includes(value.toLowerCase()))
            );
            setSearchResults(results.slice(0, 10));
        } else {
            setSearchResults([]);
        }
    };

 const handleResultClick = (itemId) => {
    setSearch("");
    setSearchResults([]);
    navigate(`/product/${itemId}`);
    removeNavbar();
};

    // --- Перехід в адмінку ---
    const goToAdmin = () => {
        navigate("/admin");
        removeNavbar();
    };

    // Закрити результати при кліку поза пошуком
    useEffect(() => {
        function onClick(e) {
            if (
                searchInput.current &&
                !searchInput.current.parentNode.contains(e.target)
            ) {
                setSearchResults([]);
            }
        }
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, []);

    return (
        <section className='navBarSection'>
            <header className="header flex">
                <div className="logoDiv">
                    <a href="/" className="logo flex">
                        <img src={NBImage} alt="Logo"/>
                    </a>
                </div>
                
                <div className={active}>
                    <ul className="navLists flex">
                        <li2 className="navItem fancy-search">
                            <span className="navSearchInputIcon"><FaSearch /></span>
                            <input
                                type="text"
                                ref={searchInput}
                                className="navSearchInput"
                                value={search}
                                onChange={handleSearchChange}
                                placeholder="Знайти товар..."
                                autoComplete="off"
                            />
                            {(search.length > 1 && searchResults.length > 0) && (
                                <ul className="navSearchResults">
                                    {searchResults.map(item => (
                                        <li key={item.id}
                                            className="navSearchResultItem"
                                            onClick={() => handleResultClick(item.id)}
                                        >
                                          
                                            <span className="fancy-item-name">{item.name}</span>
                                            {item.price &&
                                                <span className="fancy-item-price">{item.price}$</span>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {(search.length > 1 && searchResults.length === 0) &&
                                <ul className="navSearchResults">
                                    <li className="navSearchResultItem" style={{ color: "#888" }}>
                                        Нічого не знайдено
                                    </li>
                                </ul>
                            }
                        </li2>

                        <li className="navItem">
                            <Link to="/" className="navLink">Home</Link>
                        </li>

                        <li className="navItem"
                            onMouseEnter={() => setShowCart(true)}
                            onMouseLeave={() => setShowCart(false)}>
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
                            <Link to={"/profile"} className="navLink">
                                Profile
                            </Link>
                        </li>

                        {/* --- АДМІН ПАНЕЛЬ як розділ --- */}
                        <li className="navItem">
                            <Link to="/admin" className="navLink" onClick={goToAdmin}>
                                Admin Panel
                            </Link>
                        </li>

                        {/* --- КОРЗИНА --- */}
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