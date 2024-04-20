import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import axios from "axios";

const SignInForm = () => {
  const [input, setInput] = useState({
    userName: "",
    password: "",
  });

  const submit = async (e: any) => {
    e.preventDefault();

    // successful response returns accesstoken and refreshtoken, while unsuccessful one logs "Not allowed"

    try {
      const response = await axios.post(`http://localhost:5555/auth/login`, {
        userName: input.userName,
        password: input.password,
      });

      const accessToken = response.data.accessToken;

      await axios.get(`http://localhost:5555/room`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      redirect("/room");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="mt-4 bg-white shadow-md rounded-lg text-left">
      <div className="h-2 bg-purple-400 rounded-t-md"></div>
      <form onSubmit={submit} className="px-8 py-6 bg-gray-900">
        <label htmlFor="username" className="block font-semibold text-white">
          {" "}
          Username{" "}
        </label>
        <input
          onChange={(e) => {
            setInput({ ...input, userName: e.target.value });
          }}
          type="text"
          id="username"
          className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
        />
        <label
          htmlFor="password"
          className="block mt-3 font-semibold text-white"
        >
          {" "}
          Password{" "}
        </label>
        <input
          onChange={(e) => {
            setInput({ ...input, password: e.target.value });
          }}
          type="password"
          id="password"
          className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
        />
        <div className="flex justify-between items-baseline">
          <button
            type="submit"
            className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600"
          >
            Login
          </button>
          <Link
            to="/register"
            className="text-sm hover:underline text-purple-400"
          >
            New User?
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignInForm;
