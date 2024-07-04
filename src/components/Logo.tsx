import Image from "next/image";
import logo from "../image/logo.png";
const Logo = () => {
  return (
    <div>
      <Image src={logo} alt="Logo" width={300} height={300} />
    </div>
  );
};

export default Logo;
