'use client';

import { useState } from 'react';

export default function CharacterReferences() {
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const correctPassword = 'SAth123456';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPassword === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl max-w-sm w-full text-center animate-fadeIn">
          <h1 className="text-2xl font-semibold mb-4 text-gold-400">Character References</h1>
          <p className="text-sm mb-6 text-gray-300">Please enter the access password to view this page.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold hover:opacity-90 transition-all duration-200"
            >
              Access Page
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 p-6">
      <section className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-8 fade-up">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Character References</h1>

        {/* Reference 1 */}
        <div className="mb-10 border-l-4 border-yellow-500 pl-4">
          <h2 className="text-xl font-semibold text-gray-800">Whale&apos;s Belly Modern European Fine Dining Cuisine</h2>
          <p className="text-gray-600">Located in Sukhumvit 39, Phrom Phong, Bangkok Thailand</p>
          <p className="mt-2 text-gray-700">
            <strong>Mrs. Anchalee Vijitrat</strong> | Managing Director
          </p>
          <p className="text-gray-600">Email: whalesbellyrestaurantandbar@gmail.com</p>
          <p className="text-gray-600">Tel: 02 160 0333</p>
          <p className="text-red-600 font-medium mt-1">
            Status: Permanently closed due to the COVID-19 pandemic.
          </p>
        </div>

        {/* Reference 2 */}
        <div className="mb-10 border-l-4 border-yellow-500 pl-4">
          <h2 className="text-xl font-semibold text-gray-800">Western Road Restaurants</h2>
          <p className="text-gray-600">Located in Tabuk, Saudi Arabia</p>
          <p className="mt-2 text-gray-700">
            <strong>Mr. Abdul Kareem Khan</strong> | Admin Specialist
          </p>
        </div>

        {/* Future entries */}
        <div className="text-center text-sm text-gray-500 italic">
          More references will be added in the future.
        </div>
      </section>
    </main>
  );
}
