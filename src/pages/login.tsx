import Layout from "@/componnents/Layout";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { z } from "zod";
// const LoginUserValidator = z.object({
//   username: z.string().min(5),
//   password: z.string().min(10),
// });

// type LoginUser = z.infer<typeof LoginUserValidator>;

const UserLoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage !== null) {
      router.push("/");
    }
  }, [router]);

  const onSubmitTheForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitting the form!");

    // 1. Get our values
    console.log(event.currentTarget);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    console.log("Data", data);

    // 2. Send the form data to our API
    const result = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await result.json();
    console.log(json);
    if (json.token) {
      localStorage.setItem("token", json.token);
      router.push("/");
      alert("You are logged in");
    } else {
      alert("Username or password is wrong");
    }
  };

  return (
    <Layout>
      <div>
        <h1>Login</h1>
        <form onSubmit={onSubmitTheForm} className="form__login">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <br></br>
          <button type="submit" className="login_button">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UserLoginPage;
