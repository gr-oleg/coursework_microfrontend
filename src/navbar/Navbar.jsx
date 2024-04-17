import React, {useState} from "react";
import './navbar.css'
import { FaBusAlt } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'
import { Link } from "react-router-dom";
import jyskImage from '../Assets/Jysk.png'
//import isAuthenticated from "../../Components/Login/Login";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
     
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

    return (
        <section className='navBarSection'>
            <header className="header flex">

                <div className="logoDiv">
                    <a href="/" className="logo flex">
                        <h1><img src={jyskImage} className="icon"/>JYSK</h1>
                    </a>
                </div>
                
                <div className={isOpen ? 'navBar activeNavbar' : 'navBar'}>
                    <ul className="navLists flex">

                    <li className="navItem">
                        <Link to="/" className="navLink" onClick={() => setIsOpen(!isOpen)}>Catalog</Link>
                        {isOpen && (
                        <ul className="submenu">
                            <li className="navLink"><Link to="/category1">Category 1</Link></li>
                            <li className="navLink"><Link to="/category2">Category 2</Link></li>
                            <li className="navLink"><Link to="/category3">Category 3</Link></li>
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