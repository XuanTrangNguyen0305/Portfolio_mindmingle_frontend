import { ReactNode } from "react";
import Navbar from "./NavBar";
import Image from "next/image";
import router, { useRouter } from "next/router";

interface LayoutProps {
  children?: ReactNode;
}
const Back = () => {
  const router = useRouter;
  router;
};

const Layout = (props: LayoutProps) => {
  return (
    <div className="layout">
      <Navbar />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
