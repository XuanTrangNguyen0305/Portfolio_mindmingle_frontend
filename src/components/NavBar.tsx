import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";

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
      <Logo />
      <nav className="nav-bar">
        <ul style={{ listStyle: "none", display: "flex", gap: "1rem" }}>
          <li>
            <Link href="/home">Home</Link>
          </li>
          {/* <li>
            <Link href="/">About Us</Link>
          </li> */}

          <li>
            <Link href="/orders">Your Orders</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <button className="logout" onClick={logOut}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
