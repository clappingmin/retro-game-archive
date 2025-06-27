import { GameCategory, GameSubCategory } from '@/shared/types/game';
import { supabase } from '@/shared/utils/supabase/client';

/**
 * 메인 카테고리 추가하기
 * @param newCatagory
 * @returns
 */
export async function addCategory(newCatagory: GameCategory) {
  try {
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .insert(newCatagory)
      .select()
      .single();

    if (categoryError || !categoryData) throw categoryError;

    return categoryData;
  } catch (error: unknown) {
    throw error;
  }
}

/**
 * 메인 카테고리 전체 가져오기
 * @returns {Promise<GameCategory[]>}
 */
export async function getAllCategories(): Promise<GameCategory[]> {
  try {
    const { data, error } = await supabase.from('categories').select();
    if (error) throw error;

    return data as GameCategory[];
  } catch (error: unknown) {
    throw error;
  }
}

/**
 * 서브카테고리 추가
 * @param {GameSubCategory} subCategory
 * @returns {Promise<boolean>}
 */
export async function addSubCategory(subCategory: GameSubCategory): Promise<boolean> {
  try {
    const { error } = await supabase.from('subcategories').insert(subCategory).select();
    if (error) throw error;

    return true;
  } catch (error: unknown) {
    throw error;
  }
}
