
export interface Wallpaper {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  category: string;
  tags: string[];
  isAI?: boolean;
}

export type Category = 'All' | 'Abstract' | 'Nature' | 'Minimal' | 'Cyberpunk' | 'Space' | 'AI Generated';

export interface GenerationStatus {
  loading: boolean;
  error: string | null;
  progress: string;
}
