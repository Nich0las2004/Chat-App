import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <section>
      <div>
        <label
          className="text-white font-semibold block my-3 text-md"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-indigo-600 focus:ring-1 rounded-md"
          type="text"
          name="username"
          id="username"
        />
      </div>
      <div>
        <label
          className="text-white font-semibold block my-3 text-md"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-indigo-600 focus:ring-1 rounded-md"
          type="text"
          name="email"
          id="email"
        />
      </div>
      <div>
        <label
          className="text-white font-semibold block my-3 text-md"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-indigo-600 focus:ring-1 rounded-md"
          type="text"
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
          className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-indigo-600 focus:ring-1 rounded-md"
          type="text"
          name="confirm"
          id="confirm"
        />
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
    </section>
  );
};

export default RegisterForm;
