
import React, { useState } from 'react';
import { Icons } from '../constants';
import { GenerationStatus } from '../types';

interface HeroProps {
  onGenerate: (prompt: string) => void;
  status: GenerationStatus;
}

const Hero: React.FC<HeroProps> = ({ onGenerate, status }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(prompt);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 mb-8 border border-white/5 bg-gradient-to-br from-indigo-900/20 via-black to-purple-900/20">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)]"></div>
      
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Icons.Sparkles />
          <span>New AI Generation Engine</span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
          Unleash Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Perfect Background</span>
        </h2>
        
        <p className="text-gray-400 text-lg mb-8">
          Describe your dream wallpaper and let our AI craft a unique high-resolution masterpiece specifically for your phone.
        </p>

        <form onSubmit={handleSubmit} className="relative group">
          <div className="gradient-border">
            <div className="flex items-center p-1">
              <input
                type="text"
                placeholder="e.g. Cyberpunk samurai in rainy Neo-Tokyo, 8k, cinematic lighting..."
                className="flex-grow bg-transparent border-none outline-none px-4 py-3 text-white placeholder-gray-500"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={status.loading}
              />
              <button
                type="submit"
                disabled={status.loading || !prompt}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                  status.loading || !prompt
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                }`}
              >
                {status.loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Icons.Sparkles />
                )}
                {status.loading ? 'Crafting...' : 'Generate'}
              </button>
            </div>
          </div>
          
          {status.loading && (
            <div className="mt-4 flex items-center gap-3 animate-pulse">
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: '60%' }}></div>
              </div>
              <span className="text-xs text-indigo-400 whitespace-nowrap font-medium">{status.progress}</span>
            </div>
          )}
          
          {status.error && (
            <p className="mt-3 text-red-400 text-sm flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border border-red-400 flex items-center justify-center text-[10px] font-bold">!</span>
              {status.error}
            </p>
          )}
        </form>
      </div>

      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-80 h-full opacity-20 pointer-events-none">
        <div className="grid grid-cols-2 gap-4 translate-x-12 rotate-12">
          {[1,2,3,4].map(i => (
            <div key={i} className="phone-frame scale-75 opacity-40">
              <img src={`https://picsum.photos/400/800?random=${i+20}`} className="w-full h-full object-cover" alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
