import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";


const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [id, setId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email);
  };
  
  const handleClick = (e) => {
    e.preventDefault();
    const login = { user, email, pass };
    if (user.trim() === "" || email.trim() === "" || pass.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }else{
    console.log(login);
    fetch("https://lvivtrans-back.azurewebsites.net/user/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
    })

        .then((response) => {
            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return response.json();
                } else {
                    return response.text();
                }
            } else if (response.status === 409) {
                throw new Error("User already registered");
            } else {
                throw new Error("Error: " + response.status);
            }
        })
        .then((data) => {{
            if (typeof data === "object") {
                alert(data.message);
            } else {
                alert(data);
            }
          }
        })
        .catch((error) => {
            alert(error.message);
            console.error("Error:", error);
        });
  }};

const handleLogout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("email");
  localStorage.removeItem("user");
  localStorage.removeItem("id");
  localStorage.removeItem("pass");
  localStorage.removeItem("userData");
  setIsAuthenticated(false);
  setEmail("");
  window.location.reload();
};

const loginClick = (e) => {
  e.preventDefault();
  if (email.trim() === "" || pass.trim() === "") {
    alert("Please fill in all fields");
    return;
  }else{
  const url = `https://back.azurewebsites.net/user/${email}?pass=${pass}`;
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      if (data && data.email && data.pass === pass) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("email", email);
        localStorage.setItem("userData", JSON.stringify({ email, user, id, pass }));
      } else if (data.pass !== pass) {
        alert("Password is incorrect!");
      } else if (data.email !== email) {
        alert("Email is incorrect!");
      } else {
        alert("Email is incorrect!");
      }
    })
    .catch((error) => {
      alert("Email is incorrect!");
    });
  }
};

const loadUserData = () => {
  const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
  if (storedIsAuthenticated) {
    setIsAuthenticated(true);
    const storedUserData = localStorage.getItem("userData");
    const email = localStorage.getItem("email");
    onLogin(email);
    setEmail("");
    setIsAuthenticated(true);
  if (storedUserData) {
    const { email, user, id, pass } = JSON.parse(storedUserData);
    setEmail(email);
    setUser(user);
    setId(id);
    setPass(pass);
  }}
};

  
  useEffect(() => {
    loadUserData();
    
    const signInBtn = document.getElementById("signIn");
    const signUpBtn = document.getElementById("signUp");
    const fistForm = document.getElementById("form1");
    const secondForm = document.getElementById("form2");
    const container = document.querySelector(".container");

    if (signInBtn && signUpBtn && fistForm && secondForm && container) {
    signInBtn.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    signUpBtn.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    fistForm.addEventListener("submit", (e) => e.preventDefault());
    secondForm.addEventListener("submit", (e) => e.preventDefault());

    // Cleanup function to remove event listeners
    return () => {
      signInBtn.removeEventListener("click", () => {
        container.classList.remove("right-panel-active");
      });

      signUpBtn.removeEventListener("click", () => {
        container.classList.add("right-panel-active");
      });

      fistForm.removeEventListener("submit", (e) => e.preventDefault());
      secondForm.removeEventListener("submit", (e) => e.preventDefault());
    };
  }
  }, []);

  return (
    <div>
    <body className="login">

        <div className="container right-panel-active">
        <div className="container__form container--signup">
          <form action="#" className="form" id="form1">
            <h2 className="form__title">Sign Up</h2>
            <input
              type="text"
              placeholder="User"
              className="input" 
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input" 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button className="btnl" onClick={handleClick} >Sign Up</button>
          </form>
        </div>

<div className="container__form container--signin">
  <form action="#" className="form" id="form2" onSubmit={handleSubmit}>
    <h2 className="form__title">Sign In</h2>
    <input
      type="email"
      placeholder="Email"
      className="input"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      className="input" 
      value={pass}
      onChange={(e) => setPass(e.target.value)}
    />
    <button type="submit" className="btns">
      <Link to={{ pathname: "/", state: { email: email } }} className="btnl" onClick={loginClick}>
        Sign In
      </Link>
    </button>
  </form>
</div>

        <div className="container__overlay">
          <div className="overlay">
            <div className="overlay__panel overlay--left">
              <button className="btnl" id="signIn">
                Sign In
              </button>
              <div className="row2">
               <span className="spacer"></span>
               <span className="spacer"></span>
           <span></span>
            </div>
            <div className="row2">
               <span className="spacer"></span>
                <span className="spacer"></span>
           <span></span>
            </div>
            </div>
            <div className="overlay__panel overlay--right">
              <button className="btnl" id="signUp">
                Sign Up
              </button>
              <div className="row2">
               <span className="spacer"></span>
                <span className="spacer"></span>
           <span></span>
            </div>
            <div className="row2">
               <span className="spacer"></span>
                <span className="spacer"></span>
           <span></span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </div>
    
  );
  
};

export default Login;