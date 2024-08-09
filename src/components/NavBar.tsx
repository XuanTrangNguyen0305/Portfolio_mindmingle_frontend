import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";

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
  const pushBack = () => {
    router.push("/home");
  };
  return (
    <div className="nav-bar-logo">
      <Image
        className="logo"
        src="/image/logo2.png"
        width={200}
        height={110}
        alt={"logo"}
        onClick={pushBack}
      />
      <nav className="nav-bar">
        <ul style={{ listStyle: "none", display: "flex", gap: "1rem" }}>
          <button className="home-button">
            <Link href="/home">Home</Link>
          </button>
          <button className="order-button">
            <Link href="/orders">Your Orders</Link>
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
