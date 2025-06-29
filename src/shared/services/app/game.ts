import { Game } from '@/shared/types/game';
import { supabase } from '@/shared/utils/supabase/client';

// TODO: 페이지네이션 함수로 수정

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

/**
 * 게임 검색 결과 가져오기
 * @param search
 * @returns
 */
export async function getGamesBySearch(search: string): Promise<Game[]> {
  try {
    const { data, error } = await supabase.from('games').select('*').ilike('name', `%${search}%`);

    if (error) throw error;
    return data as Game[];
  } catch (error: unknown) {
    throw error;
  }
}

/**
 * 최근 게임 가져오기
 * @param categoryId
 * @returns
 */
export async function getRecentGames(categoryId?: number) {
  try {
    const query = supabase.from('games').select('*').order('createdAt', { ascending: false }); // 최신순 정렬

    if (categoryId !== undefined) query.eq('categoryId', categoryId);

    const { data, error } = await query;

    if (error) throw error;
    return data;
  } catch (error: unknown) {
    throw error;
  }
}
