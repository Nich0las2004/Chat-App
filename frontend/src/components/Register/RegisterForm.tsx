import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import emailValidator from "email-validator";
import RegisterSuccess from "./RegisterSuccess";

const errorMessages = [
  "Username should be 3-16 characters long and should not include special characters!",
  "Email should be valid!",
  "Passwords should match and be at least 8 characters!",
  "User with that username already exists!",
];

const RegisterForm = () => {
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userNameExists, setUserNameExists] = useState<boolean>(false);
  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const passwordValidation =
    passwordsMatch && /^[a-zA-Z0-9]{8,}$/.test(input.password);

  const registerDisabled =
    !/^[a-zA-Z0-9]{3,16}$/.test(input.userName) ||
    !emailValidator.validate(input.email) ||
    !passwordValidation;

  useEffect(() => {
    if (input.password !== input.confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  }, [input.password, input.confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userNameExists) {
      await axios
        .post("http://localhost:5555/auth/register", {
          userName: input.userName,
          email: input.email,
          password: input.password,
        })
        .then(() => setShowModal(true))
        .catch(() => setShowModal(false));
    }
    await axios
      .post("http://localhost:5555/auth/check-username", {
        userName: input.userName,
      })
      .then((res) => {
        if (res.data.exists) {
          setUserNameExists(true);
        } else {
          setUserNameExists(false);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <form onSubmit={handleSubmit}>
      {!userNameExists && <RegisterSuccess isVisible={showModal} />}
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
        {!emailValidator.validate(input.email) && (
          <span className="text-red-600">{errorMessages[1]}</span>
        )}
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
        {!passwordValidation && (
          <span className="text-red-600">{errorMessages[2]}</span>
        )}
        {userNameExists && (
          <span className="text-red-600">{errorMessages[3]}</span>
        )}
      </div>

      {/* register button */}
      <button
        type="submit"
        className={`w-full mt-6 ${
          registerDisabled ? "bg-indigo-400" : "bg-indigo-600"
        } ${
          registerDisabled && "cursor-not-allowed"
        } rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans`}
        disabled={registerDisabled}
      >
        Register
      </button>

      {/* redirect to login button  */}

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
