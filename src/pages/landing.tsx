import router from "next/router";

export default function Land() {
  const Router = () => {
    router.push("/home");
  };
  return (
    <div>
      <h1>Welcome to Boba Dream </h1>
      <button onClick={Router}>⭐Start to dream🌙</button>
    </div>
  );
}
