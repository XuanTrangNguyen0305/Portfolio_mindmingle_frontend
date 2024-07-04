import { ReactNode } from "react";
import Navbar from "./NavBar";
interface LayoutProps {
  children?: ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
    </>
  );
};
export default Layout;
