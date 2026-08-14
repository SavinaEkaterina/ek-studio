export type ActiveItem = 
  | 'laptop'
  | 'camera'
  | 'notebook'
  | 'pen'
  | 'mug'
  | 'phone'
  | 'mouse'
  | 'lamp'
  | 'polaroid'
  | null;

export type LightMood = 'eveningWarm' | 'nightFocus' | 'goldenHour';

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  metrics: string;
  client: string;
  imageBg: string;
  accentColor: string;
  linkUrl?: string;
  role?: string;
}

export interface PhotoAsset {
  id: string;
  title: string;
  category: string;
  aspectRatio: string;
  bgGradient: string;
  caption: string;
}
