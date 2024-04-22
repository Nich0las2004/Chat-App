import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const errorMessages = [
  "Username should be 3-16 characters long and should not include special characters!",
  "Email should be valid!",
  "Passwords do not match!",
];

const RegisterForm = () => {
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await axios.post("http://localhost:5555/auth/register", {
      userName: input.userName,
      email: input.email,
      password: input.password,
    });

    if (input.password !== input.confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }

    console.log(passwordsMatch);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          className="text-white font-semibold block my-3 text-md"
          htmlFor="username"
        >
          Username
        </label>
        <input
          onChange={(e) => {
            setInput({ ...input, userName: e.target.value });
          }}
          className="w-full bg-gray-100 px-4 py-2 focus:outline-none focus:ring-indigo-600 focus:ring-1 rounded-md"
          type="text"
          name="username"
          id="username"
        />
        {!/^[a-zA-Z0-9]{3,16}$/.test(input.userName) && (
          <span className="text-red-600">{errorMessages[0]}</span>
        )}
      </div>
      <div>
        <label
          className="text-white font-semibold block my-3 text-md"
          htmlFor="email"
        >
          Email
        </label>
        <input
          onChange={(e) => {
            setInput({ ...input, email: e.target.value });
          }}
          className="w-full bg-gray-100 px-4 py-2 focus:outline-none focus:ring-indigo-600 focus:ring-1 rounded-md"
          type="text"
          name="email"
          id="email"
        />
        {errorMessages[1]}
      </div>
      <div>
        <label
          className="text-white font-semibold block my-3 text-md"
          htmlFor="password"
        >
          Password
        </label>
        <input
          onChange={(e) => {
            setInput({ ...input, password: e.target.value });
          }}
          className="w-full bg-gray-100 px-4 py-2 focus:outline-none focus:ring-indigo-600 focus:ring-1 rounded-md"
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div>
        <label
          className="text-white font-semibold block my-3 text-md"
          htmlFor="confirm"
        >
          Confirm password
        </label>
        <input
          onChange={(e) => {
            setInput({ ...input, confirmPassword: e.target.value });
          }}
          className="w-full bg-gray-100 px-4 py-2 focus:outline-none focus:ring-indigo-600 focus:ring-1 rounded-md"
          type="password"
          name="confirm"
          id="confirm"
        />
        {errorMessages[2]}
      </div>
      <button
        type="submit"
        className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
      >
        Register
      </button>
      <Link to="/login">
        <button
          type="submit"
          className="w-full mt-6 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans"
        >
          Login
        </button>
      </Link>
    </form>
  );
};

export default RegisterForm;
