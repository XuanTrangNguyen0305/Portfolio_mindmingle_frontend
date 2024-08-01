import { ReactNode } from "react";
import Navbar from "./NavBar";
import Image from "next/image";
import Footer from "./Footer";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <div className="layout">
      <Image
        className="logo"
        src="/image/logo2.png"
        width={200}
        height={110}
        alt={"logo"}
      />
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
