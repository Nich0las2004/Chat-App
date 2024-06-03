import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import emailValidator from "email-validator";
import RegisterSuccess from "./RegisterSuccess";
import RegisterLoginButton from "./RegisterLoginButton";

const errorMessages = [
  "Username should be 3-16 characters long and should not include special characters!",
  "Email should be valid!",
  "Passwords should match and be at least 8 characters!",
  "User with that username already exists!",
];

const initialInputState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = () => {
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
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

    await axios
      .post("http://localhost:5555/auth/register", {
        userName: input.userName,
        email: input.email,
        password: input.password,
      })
      .then(() => setShowModal(true))
      .catch(() => setShowModal(false));

    setInput(initialInputState);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* {!userNameExists && <RegisterSuccess isVisible={showModal} />} */}
      {showModal && <RegisterSuccess isVisible={showModal} />}
      <div>
        <label
          className="text-white font-semibold block my-3 text-md"
          htmlFor="username"
        >
          Username
        </label>
        <input
          value={input.userName}
          onChange={(e) => {
            setInput((prevState) => ({
              ...prevState,
              userName: e.target.value,
            }));
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
          value={input.email}
          onChange={(e) => {
            setInput((prevState) => ({ ...prevState, email: e.target.value }));
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
          value={input.password}
          onChange={(e) => {
            setInput((prevState) => ({
              ...prevState,
              password: e.target.value,
            }));
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
          value={input.confirmPassword}
          onChange={(e) => {
            setInput((prevState) => ({
              ...prevState,
              confirmPassword: e.target.value,
            }));
          }}
          className="w-full bg-gray-100 px-4 py-2 focus:outline-none focus:ring-indigo-600 focus:ring-1 rounded-md"
          type="password"
          name="confirm"
          id="confirm"
        />
        {!passwordValidation && (
          <span className="text-red-600">{errorMessages[2]}</span>
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
        <RegisterLoginButton />
      </Link>
    </form>
  );
};

export default RegisterForm;
