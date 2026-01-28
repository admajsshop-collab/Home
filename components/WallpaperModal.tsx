
import React, { useState } from 'react';
import { Wallpaper } from '../types';
import { Icons } from '../constants';

interface WallpaperModalProps {
  wallpaper: Wallpaper;
  onClose: () => void;
}

const WallpaperModal: React.FC<WallpaperModalProps> = ({ wallpaper, onClose }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'info'>('preview');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = wallpaper.url;
    link.download = `WallCraft_${wallpaper.id}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative z-10 w-full max-w-6xl h-full flex flex-col lg:flex-row gap-8 overflow-hidden bg-[#0c0c0c] border border-white/10 rounded-3xl shadow-2xl">
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white lg:hidden"
        >
          <Icons.Close />
        </button>

        {/* Image Display Area */}
        <div className="flex-1 relative bg-black flex items-center justify-center p-8 overflow-y-auto">
          <div className="phone-frame w-full max-w-[320px]">
            <div className="notch"></div>
            <img 
              src={wallpaper.url} 
              className="w-full h-full object-cover"
              alt={wallpaper.title}
            />
            {/* Mock OS Elements */}
            <div className="absolute inset-x-0 top-12 flex flex-col items-center text-white drop-shadow-md">
              <span className="text-5xl font-light">12:45</span>
              <span className="text-sm font-medium mt-1">Tuesday, May 14</span>
            </div>
            <div className="absolute inset-x-0 bottom-12 flex justify-around px-8">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-sm opacity-60"></div>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="w-full lg:w-96 flex flex-col p-8 glass border-l border-white/10 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">{wallpaper.title}</h2>
            <button 
              onClick={onClose}
              className="hidden lg:flex w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 items-center justify-center transition-colors"
            >
              <Icons.Close />
            </button>
          </div>

          <div className="space-y-6 flex-grow">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Specifications</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded-xl">
                  <span className="block text-[10px] text-gray-400 uppercase">Resolution</span>
                  <span className="text-sm font-medium">1080 x 1920</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl">
                  <span className="block text-[10px] text-gray-400 uppercase">Format</span>
                  <span className="text-sm font-medium">PNG High Res</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl">
                  <span className="block text-[10px] text-gray-400 uppercase">Category</span>
                  <span className="text-sm font-medium">{wallpaper.category}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl">
                  <span className="block text-[10px] text-gray-400 uppercase">License</span>
                  <span className="text-sm font-medium">Free Personal</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {wallpaper.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-xs hover:bg-white/10 cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {wallpaper.isAI && (
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                <div className="flex items-center gap-2 text-indigo-400 mb-2">
                  <Icons.Sparkles />
                  <span className="text-xs font-bold uppercase">AI Crafted</span>
                </div>
                <p className="text-sm text-gray-400">
                  This unique wallpaper was uniquely generated using neural networks. Every pixel is one-of-a-kind.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-3">
            <button 
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
            >
              <Icons.Download />
              Download High Res
            </button>
            <button className="w-full py-4 bg-white/5 text-gray-300 font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/5">
              Save to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperModal;
