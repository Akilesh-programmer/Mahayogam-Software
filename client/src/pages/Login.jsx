const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#EBC894] to-white md:hidden">
      {/* Transparent Glass Background */}
      <div className="absolute inset-0 backdrop-blur-lg"></div>

      {/* Login Form */}
      <div
        className="relative z-10 shadow-lg rounded-2xl p-6 w-full max-w-sm border border-white/40"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 className="text-2xl font-bold text-center text-black">Login</h2>
        <p className="text-gray-700 text-center mt-2 text-sm">
          Enter your email and password to log in
        </p>

        {/* Form Start */}
        <form className="mt-6">
          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 border border-gray-300 bg-white bg-opacity-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="mt-4 relative">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full p-3 border border-gray-300 bg-white bg-opacity-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 text-sm"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm cursor-pointer">
              👁️
            </span>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-500 font-medium">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold text-sm mt-4 hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
        {/* Form End */}

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-b border-gray-400"></div>
          <span className="mx-3 text-gray-600 text-xs">Or login with</span>
          <div className="flex-grow border-b border-gray-400"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center space-x-3">
          <button className="p-3 bg-white bg-opacity-50 rounded-lg shadow-md hover:bg-opacity-60 transition">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
          <button className="p-3 bg-white bg-opacity-50 rounded-lg shadow-md hover:bg-opacity-60 transition">
            <img
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </button>
          <button className="p-3 bg-white bg-opacity-50 rounded-lg shadow-md hover:bg-opacity-60 transition">
            <img
              src="https://www.svgrepo.com/show/511330/apple-173.svg"
              alt="Apple"
              className="w-6 h-6"
            />
          </button>
          <button className="p-3 bg-white bg-opacity-50 rounded-lg shadow-md hover:bg-opacity-60 transition">
            <img
              src="https://www.svgrepo.com/show/506008/smartphone.svg"
              alt="Phone"
              className="w-7 h-7"
            />
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-center text-gray-700 text-sm mt-6">
          Don’t have an account?{' '}
          <a href="#" className="text-blue-500 font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
