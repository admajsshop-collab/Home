
import React from 'react';
import { Wallpaper } from '../types';
import { Icons } from '../constants';

interface GalleryProps {
  wallpapers: Wallpaper[];
  onSelect: (wp: Wallpaper) => void;
}

const Gallery: React.FC<GalleryProps> = ({ wallpapers, onSelect }) => {
  if (wallpapers.length === 0) {
    return (
      <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10">
        <p className="text-gray-500 text-lg">No wallpapers found matching your criteria.</p>
        <button className="mt-4 text-indigo-400 hover:underline">Clear all filters</button>
      </div>
    );
  }

  return (
    <div className="wallpaper-grid">
      {wallpapers.map((wp) => (
        <div 
          key={wp.id} 
          onClick={() => onSelect(wp)}
          className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white/5 border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30"
        >
          <div className="aspect-[9/16] relative overflow-hidden">
            <img 
              src={wp.thumbnail} 
              alt={wp.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {wp.isAI && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded bg-indigo-600/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-1">
                <Icons.Sparkles />
                <span>AI</span>
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-white font-bold truncate mb-1">{wp.title}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-300 bg-white/10 px-2 py-0.5 rounded-full">{wp.category}</span>
                <div className="ml-auto w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                  <Icons.Preview />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
