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
            <Link className="home" href="/">
              Home
            </Link>
          </li>
          {!isLoggedIn && (
            <li>
              <Link href="/register">Register</Link>
            </li>
          )}
          {isLoggedIn ? (
            <li>
              <button className="logout" onClick={logOut}>
                Log out
              </button>
            </li>
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
