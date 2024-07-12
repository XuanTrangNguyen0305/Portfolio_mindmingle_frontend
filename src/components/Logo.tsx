import Image from "next/image";
import Link from "next/link";
import logo from "../image/logo.png";

const Logo = () => {
  return (
    <Link href="/home" className="logo">
      <Image src={logo} alt="Logo" width={250} height={250} />
    </Link>
  );
};

export default Logo;
