import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import bubbletea from "../image/bubbletea.png"; // Adjust the path if necessary

export default function Land() {
  const router = useRouter();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      router.push("/home");
    }
  }, [router]);

  const handleStartClick = () => {
    router.push("/login");
  };

  return (
    <div className="landing">
      <div onClick={handleStartClick} className="landing-image-wrapper">
        <Image
          src={bubbletea}
          alt="Bubble Tea"
          className="landing-image"
          width={200}
          height={200}
        />
      </div>
      <h1 className="landing-h1">Welcome to Boba Dream</h1>
      <button className="landing-button" onClick={handleStartClick}>
        ⭐Start to dream🌙
      </button>
    </div>
  );
}
