import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setIsLoggedIn(tokenFromStorage !== null);
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  return (
    <div className="nav-bar-logo">
      <nav className="nav-bar">
        <ul style={{ listStyle: "none", display: "flex", gap: "1rem" }}>
          <button className="home-button">
            <Link href="/home">Home</Link>
          </button>
          {/* <li>
            <Link href="/">About Us</Link>
          </li> */}

          <button className="order-button">
            <Link href="/orders">Your Orders</Link>
          </button>
          {isLoggedIn ? (
            <>
              <button className="logout-button">
                <button className="logout" onClick={logOut}>
                  Log Out
                </button>
              </button>
            </>
          ) : (
            <button className="login-button">
              <Link href="/login">Login</Link>
            </button>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
