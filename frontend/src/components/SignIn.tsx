import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="relative flex min-h-screen  antialiased flex-col justify-center overflow-hidden bg-gray-900 py-6 sm:py-12">
      <div className="bg-gray-900  relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl font-light text-white">
          Welcome to ChatWave!
        </span>
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-2 bg-purple-400 rounded-t-md"></div>
          <div className="px-8 py-6 bg-gray-900">
            <label
              htmlFor="nickname"
              className="block font-semibold text-white"
            >
              {" "}
              Nickname{" "}
            </label>
            <input
              type="text"
              id="nickname"
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
              <Link to="/register" className="text-sm hover:underline text-purple-400">
                New User?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
