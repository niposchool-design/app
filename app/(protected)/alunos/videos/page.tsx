import { getVideos } from '@/src/lib/supabase/queries/videos';
import VideosClient from './_components/VideosClient';

export default async function VideosPage() {
  const data = await getVideos();
  const mappedVideos = (data || []).map(v => ({
    id: v.id,
    titulo: v.titulo,
    descricao: v.descricao || '',
    thumbnail_url: v.thumbnail_url || `https://placehold.co/400x225/e11d48/white?text=${encodeURIComponent(v.titulo.substring(0, 15))}`,
    video_url: v.url_video || v.video_url || '',
    duracao: v.duracao || 0,
    categoria: v.categoria?.nome || v.modulo || 'Geral',
    isJapones: ['koto', 'shamisen', 'shakuhachi', 'taiko', 'biwa', 'tradicional', 'japones', 'japanese'].some(keyword =>
      v.titulo.toLowerCase().includes(keyword) ||
      (v.descricao && v.descricao.toLowerCase().includes(keyword))
    ),
  }));

  return (
    <VideosClient videos={mappedVideos} />
  );
}
