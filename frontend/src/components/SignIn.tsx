const SignIn = () => {
  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center">
      <div className="h-4/6 w-2/6 bg-red-900 flex justify-center items-center">
        <div>
          <h1>Welcome to ChatWave</h1>
          <p>A real-time chat application for seamless communication</p>
          <div>
            <form className="w-full h-5/6 p-8 bg-gray-900 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Sign In</h2>
              <label className="text-white" htmlFor="nickname">
                Nickname
              </label>
              <input
                type="email"
                id="nickname"
                name="nickname"
                className="rounded w-full px-3"
              />
              <label className="text-white" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="rounded w-full px-3"
              />
              <button
                type="submit"
                className="w-full text-white rounded bg-indigo-400"
              >
                Sign In
              </button>
            </form>
          </div>
          <div>Click here to register</div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
