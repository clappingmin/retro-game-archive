import { Game } from '@/shared/types/game';
import { supabase } from '@/shared/utils/supabase/client';

export async function getAllGames(categoryId?: number): Promise<Game[]> {
  try {
    const query = supabase
      .from('games')
      .select('*')
      .eq('isActive', true)
      .order('viewCount', { ascending: false });

    if (categoryId !== undefined) query.eq('categoryId', categoryId);

    const { data, error } = await query;

    if (error) throw error;
    return data as Game[];
  } catch (error: unknown) {
    throw error;
  }
}

/**
 * 추천게임 가져오기
 * @param categoryId
 * @returns
 */
export async function getRecommendedGames(categoryId?: number): Promise<Game[]> {
  try {
    const query = supabase
      .from('games')
      .select('*')
      .eq('isActive', true)
      .eq('isFeatured', true)
      .order('viewCount', { ascending: false });

    if (categoryId !== undefined) query.eq('categoryId', categoryId);

    const { data, error } = await query;

    if (error) throw error;
    return data as Game[];
  } catch (error: unknown) {
    throw error;
  }
}
