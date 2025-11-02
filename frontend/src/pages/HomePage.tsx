import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary-500 to-secondary-500">
      <div className="text-center text-white p-8">
        <h1 className="text-6xl font-bold mb-4">Splittat</h1>
        <p className="text-xl mb-8">Receipt splitting made easy</p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="inline-block bg-primary-200 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
