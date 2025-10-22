'use client';

import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react'; // using lucide icons for lock/unlock

export default function CharacterReferences() {
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const correctPassword = 'SAth123456';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPassword.trim() === correctPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setEnteredPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEnteredPassword('');
    setError('');
  };

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-10 transition-colors duration-300 ${
        isAuthenticated
          ? 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
          : 'bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white'
      }`}
    >
      {!isAuthenticated ? (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 sm:p-10 rounded-2xl shadow-xl max-w-sm w-full text-center animate-fadeIn">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-yellow-400">
            Character References
          </h1>
          <p className="text-sm sm:text-base mb-6 text-gray-300">
            Please enter the access password to view this page.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold hover:opacity-90 transition-all duration-200"
            >
              <Lock className="w-5 h-5" />
              Access Page
            </button>
          </form>

          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        </div>
      ) : (
        <section className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-6 sm:p-10 mt-10 animate-fadeIn">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Character References
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
            >
              <Unlock className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Reference 1 */}
          <div className="mb-10 border-l-4 border-yellow-500 pl-5">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
              Whale&apos;s Belly Modern European Fine Dining Cuisine
            </h2>
            <p className="text-gray-600 mb-1">
              Located in Sukhumvit 39, Phrom Phong, Bangkok, Thailand
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Mrs. Anchalee Vijitrat</strong> | Managing Director
            </p>
            <p className="text-gray-600 mb-1">
              Email: whalesbellyrestaurantandbar@gmail.com
            </p>
            <p className="text-gray-600 mb-1">Tel: 02 160 0333</p>
            <p className="text-red-600 font-medium mt-2">
              Status: Permanently closed due to the COVID-19 pandemic.
            </p>
          </div>

          {/* Reference 2 */}
          <div className="mb-10 border-l-4 border-yellow-500 pl-5">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
              Western Road Restaurants
            </h2>
            <p className="text-gray-600 mb-1">Located in Tabuk, Saudi Arabia</p>
            <p className="text-gray-700">
              <strong>Mr. Abdul Kareem Khan</strong> | Admin Specialist
            </p>
          </div>

          {/* Add more references later */}
          <div className="text-center text-sm text-gray-500 italic">
            More references will be added in the future.
          </div>
        </section>
      )}
    </main>
  );
}
