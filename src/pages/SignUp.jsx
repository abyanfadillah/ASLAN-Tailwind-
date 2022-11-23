import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { UserAuth } from "../assets/database/AuthContext";
import Aos from "aos";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, user } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      if (e.message == "Firebase: Error (auth/email-already-in-use).") {
        alert("Akun Sudah Digunakan");
      }
      if (
        e.message ==
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        alert("Password Harus Lebih dari 6 Huruf");
      }
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
    if (user != null) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <div className="bg-bg-auth h-screen place-items-center flex justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div
          data-aos="fade-up"
          className="bg-gray-900 max-w-sm sm:max-w-md w-full space-y-8 rounded-3xl shadow-2xl"
        >
          <div className="p-6 lg:p-10 ">
            <div>
              <h2 className="text-center"></h2>

              <h2 className="mt-4 text-center text-4xl font-extrabold text-gray-300">
                Buat Akun
              </h2>

              <p className="mt-2 text-center text-sm text-gray-400">
                atau{" "}
                <Link
                  to="/masukakun"
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Masuk ke Akun
                </Link>
              </p>
            </div>

            <form
              onSubmit={handleSignUp}
              className="mt-8 space-y-6"
              action="#"
              method="POST"
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-blue-900 group-hover:text-blue-800"
                      aria-hidden="true"
                    />
                  </span>
                  Buat
                </button>
              </div>
            </form>

            <div className="text-center mt-5">
              <span class=" text-sm tracking-wide text-white">
                Copyright © Aslan {new Date().getFullYear()} | All right
                reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
