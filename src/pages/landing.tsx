import { useRouter } from "next/router";
import Image from "next/image";

export default function Land() {
  const router = useRouter();
  const handleStartClick = () => {
    router.push("/home");
  };

  return (
    <div className="landing-page">
      <div className="landing">
        <Image
          className="logo"
          src="/image/logo2.png"
          width={200}
          height={110}
          alt={"logo"}
        />
        <div className="landing-content">
          <Image
            className="bunny"
            src="/image/bunny2.png"
            alt="bunny"
            width={850}
            height={650}
          />
          <button
            onClick={handleStartClick}
            className="landing-button-pushable"
            role="button"
          >
            <span className="landing-button-shadow"></span>
            <span className="landing-button-edge"></span>
            <span className="landing-button-front text">Enter</span>
          </button>
        </div>
      </div>
    </div>
  );
}
