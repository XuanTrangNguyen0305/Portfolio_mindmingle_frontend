import Image from "next/image";
import logo from "../image/logo.png";
const Logo = () => {
  return (
    <div>
      <Image src={logo} alt="Logo" width={250} height={250} />
    </div>
  );
};

export default Logo;
