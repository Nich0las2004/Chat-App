import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <form className="bg-gray-900 p-10 rounded-lg shadow-lg min-w-full">
          <h1 className="text-center text-2xl mb-6 text-white font-bold font-sans">
            Register
          </h1>
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
        </form>
      </div>
    </div>
  );
};

export default Register;
