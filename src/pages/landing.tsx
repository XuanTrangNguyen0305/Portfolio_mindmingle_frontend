import { useRouter } from "next/router";

export default function Land() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/login");
  };

  return (
    <div>
      <h1>Welcome to Boba Dream</h1>
      <button onClick={handleStartClick}>⭐Start to dream🌙</button>
    </div>
  );
}
