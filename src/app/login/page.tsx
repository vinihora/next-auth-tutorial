"use client";

import React, { use, useState } from "react";
import { SignInResponse, signIn, useSession } from "next-auth/react";

const Login = (props: any) => {
  const { data: session } = useSession();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async (email: string, password: string) => {
    const retorno: SignInResponse | undefined = await signIn("credentials", {
      username: email,
      password: password,
      redirect: false,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      login(email, password)
        .then((resp) => {
          console.log("Success");
          return;
          // redirect to settings
        })
        .catch((error) => {
          console.log("error");
        });
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full flex flex-row justify-center items-center h-screen">
      <div className="m-4 p-4 bg-white w-11/12 max-w-[700px] flex flex-col items-center justify-center rounded-2xl">
        <form
          id="login-form"
          onSubmit={(e) => onSubmit(e)}
          className="w-11/12 max-w-[500px] flex-col flex items-center justify-center"
        >
          <h2 className="inter-normal text-[28px] text-black font-black mb-4">
            Login
          </h2>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email-login-input">Username</label>
            <input
              id="email-login-input"
              name="phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border h-11"
            />
            <label htmlFor="password-login-input">Password</label>
            <input
              id="password-login-input"
              name="phone"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border h-11"
            />
          </div>
          <button className="bg-black w-full m-3 text-white p-3">
            Sign In
          </button>
          <p>{session?.user && "Logado"}</p>
        </form>
      </div>
    </section>
  );
};

export default Login;
