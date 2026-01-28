
import React from 'react';
import { Icons } from '../constants';

interface NavbarProps {
  onSearch: (q: string) => void;
  searchQuery: string;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, searchQuery }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-xl font-bold">W</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            WallCraft AI
          </h1>
        </div>

        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Icons.Search />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl leading-5 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all sm:text-sm"
            placeholder="Search wallpapers or tags..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Premium</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Collections</a>
          <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
