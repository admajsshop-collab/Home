
import React, { useState, useEffect, useCallback } from 'react';
import { Category, Wallpaper, GenerationStatus } from './types';
import { CATEGORIES, Icons } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import WallpaperModal from './components/WallpaperModal';
import { generateWallpaper } from './services/geminiService';

const MOCK_WALLPAPERS: Wallpaper[] = [
  { id: '1', url: 'https://picsum.photos/1080/1920?random=1', thumbnail: 'https://picsum.photos/400/700?random=1', title: 'Mountain Mist', category: 'Nature', tags: ['mountain', 'calm'] },
  { id: '2', url: 'https://picsum.photos/1080/1920?random=2', thumbnail: 'https://picsum.photos/400/700?random=2', title: 'Neon Pulse', category: 'Cyberpunk', tags: ['lights', 'city'] },
  { id: '3', url: 'https://picsum.photos/1080/1920?random=3', thumbnail: 'https://picsum.photos/400/700?random=3', title: 'Fractal Geometry', category: 'Abstract', tags: ['shapes', 'complex'] },
  { id: '4', url: 'https://picsum.photos/1080/1920?random=4', thumbnail: 'https://picsum.photos/400/700?random=4', title: 'Cosmic Dust', category: 'Space', tags: ['stars', 'galaxy'] },
  { id: '5', url: 'https://picsum.photos/1080/1920?random=5', thumbnail: 'https://picsum.photos/400/700?random=5', title: 'Pure White', category: 'Minimal', tags: ['clean', 'simple'] },
  { id: '6', url: 'https://picsum.photos/1080/1920?random=6', thumbnail: 'https://picsum.photos/400/700?random=6', title: 'Ocean Deep', category: 'Nature', tags: ['water', 'blue'] },
  { id: '7', url: 'https://picsum.photos/1080/1920?random=7', thumbnail: 'https://picsum.photos/400/700?random=7', title: 'Digital Dream', category: 'Cyberpunk', tags: ['future', 'tech'] },
  { id: '8', url: 'https://picsum.photos/1080/1920?random=8', thumbnail: 'https://picsum.photos/400/700?random=8', title: 'Golden Hour', category: 'Nature', tags: ['sunset', 'warm'] },
];

export default function App() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(MOCK_WALLPAPERS);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  
  const [genStatus, setGenStatus] = useState<GenerationStatus>({
    loading: false,
    error: null,
    progress: ''
  });

  const handleGenerate = async (prompt: string) => {
    if (!prompt) return;
    
    setGenStatus({ loading: true, error: null, progress: 'Whispering to the AI...' });
    
    try {
      setGenStatus(prev => ({ ...prev, progress: 'Painting your pixels...' }));
      const imageUrl = await generateWallpaper(prompt);
      
      const newWallpaper: Wallpaper = {
        id: Date.now().toString(),
        url: imageUrl,
        thumbnail: imageUrl,
        title: prompt.slice(0, 20) + (prompt.length > 20 ? '...' : ''),
        category: 'AI Generated',
        tags: ['ai', 'custom'],
        isAI: true
      };
      
      setWallpapers(prev => [newWallpaper, ...prev]);
      setSelectedWallpaper(newWallpaper);
      setGenStatus({ loading: false, error: null, progress: '' });
    } catch (err: any) {
      setGenStatus({ loading: false, error: err.message || 'Generation failed', progress: '' });
    }
  };

  const filteredWallpapers = wallpapers.filter(wp => {
    const matchesCategory = selectedCategory === 'All' || wp.category === selectedCategory;
    const matchesSearch = wp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          wp.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-12">
      <Navbar 
        onSearch={setSearchQuery} 
        searchQuery={searchQuery}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <Hero onGenerate={handleGenerate} status={genStatus} />
        
        <div className="mt-12">
          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as Category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                    : 'bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <Gallery 
            wallpapers={filteredWallpapers} 
            onSelect={setSelectedWallpaper} 
          />
        </div>
      </main>

      {selectedWallpaper && (
        <WallpaperModal 
          wallpaper={selectedWallpaper} 
          onClose={() => setSelectedWallpaper(null)} 
        />
      )}
    </div>
  );
}
