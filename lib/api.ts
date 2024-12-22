// app/lib/api.ts

export interface Category {
  name: string;
  thumbnail: string;
}

export interface Channel {
  channelid: string;
  title: string;
  description: string;
  customurl: string;
  publishedat: string;
  thumbnaildefault: string;
  thumbnailmedium: string;
  thumbnailhigh: string;
  subscribercount: string;
  videocount: string;
  banner: string;
  tvbanner: string;
  mobilebanner: string;
  channelhandle: string;
  avatar: string[];
  subscribercounttext: string;
  videoscounttext: string;
  isverified: boolean;
  keywords: string[];
  isfamilysafe: boolean;
  availablecountries: string[];
  tabs: string[];
}

export interface Video {
  videoId: string;
  title: string;
  description: string;
  channelHandle: string;
  viewCount: number;
  publishedTimeText: string;
  lengthText: string;
  channelTitle: string;
  thumbnail: { url: string; width: number; height: number }[];
  category: string;
  thumbnailDefault: string;
  thumbnailMedium: string;
  thumbnailHigh: string;
  thumbnailStandard: string;
  thumbnailMaxres: string;
  tags: string[];
  chapters: string[];
  isLive: boolean;
}

export interface FavoriteVideo {
  video_id: string;
  title: string;
  channel_title: string;
  language: string;
  thumbnail_url: string;
  difficulty: string;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch('/api/getCategories', {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data = await res.json();
  return data.categories;
}

export async function fetchChannel(channelId: string): Promise<Channel> {
  const res = await fetch(`/api/getChannel/${channelId}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch channel');
  }

  const data = await res.json();
  return data;
}

export async function fetchChannelVideos(
  channelId: string,
  from: number,
  to: number
): Promise<{ topVideos: Video[]; popularVideos: Video[] }> {
  const res = await fetch(
    `/api/getChannelVideos/${channelId}?from=${from}&to=${to}`,
    {
      method: 'GET',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch channel videos');
  }

  const data = await res.json();
  return data;
}

export async function fetchFavoriteVideos(
  email: string
): Promise<FavoriteVideo[]> {
  const res = await fetch(
    `/api/getFavoriteVideos?email=${encodeURIComponent(email)}`,
    {
      method: 'GET',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch favorite videos');
  }

  const data = await res.json();
  return data.favoriteVideos;
}

export async function fetchHomeVideos(goal?: string): Promise<Video[]> {
  const url = goal
    ? `/api/getHome?goal=${encodeURIComponent(goal)}`
    : `/api/getHome`;
  const res = await fetch(url, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch home videos');
  }

  const data = await res.json();
  return data.data;
}

export async function fetchSubcategories(category: string): Promise<string[]> {
  const res = await fetch(
    `/api/getSubcategories?category=${encodeURIComponent(category)}`,
    {
      method: 'GET',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch subcategories');
  }

  const data = await res.json();
  return data.subcategories;
}

export async function fetchVideosByIds(videoIds: string[]): Promise<Video[]> {
  const res = await fetch(
    `/api/getVideosByIds?videoIds=${videoIds.join(',')}`,
    {
      method: 'GET',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch videos by IDs');
  }

  const data = await res.json();
  return data;
}
