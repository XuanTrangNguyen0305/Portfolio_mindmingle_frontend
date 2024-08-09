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
const pushBack = () => {
  router.push("/home");
};
const Layout = (props: LayoutProps) => {
  return (
    <div className="layout">
      <Image
        className="logo"
        src="/image/logo2.png"
        width={200}
        height={110}
        alt={"logo"}
        onClick={pushBack}
      />
      <Navbar />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
