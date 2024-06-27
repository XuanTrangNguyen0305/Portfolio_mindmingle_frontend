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
    <nav
      style={{
        padding: "1rem",
        background: "#f8f9fa",
        borderBottom: "1px solid #dee2e6",
      }}
    >
      <ul style={{ listStyle: "none", display: "flex", gap: "1rem" }}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/menu-items">Menu</Link>
        </li>
        {/* {isLoggedIn && <li><Link href="/my-drinks">My drinks</Link></li>} */}
        {!isLoggedIn && (
          <li>
            <Link href="/register">Register</Link>
          </li>
        )}
        {isLoggedIn ? (
          <li>
            <button onClick={logOut}>Log out</button>
          </li>
        ) : (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
