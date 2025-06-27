import { GameCategory, GameSubCategory } from '@/shared/types/game';
import { supabase } from '@/shared/utils/supabase/client';

/**
 * 메인 카테고리 추가하기
 * @param newCatagory
 * @param tagIds
 * @returns
 */
export async function addCategory(newCatagory: GameCategory, tagIds: number[]) {
  try {
    // 1. 카테고리 추가
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .insert(newCatagory)
      .select()
      .single();

    if (categoryError || !categoryData) throw categoryError;

    const categoryId = categoryData.id;

    // 2. categories_tags에 연결
    const tagMappings = tagIds.map((tagId) => ({
      categoryId,
      tagId,
    }));

    const { error: mappingError } = await supabase.from('category_tags').insert(tagMappings);
    if (mappingError) throw mappingError;

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
 * @param {number} tagIds
 * @returns {Promise<boolean>}
 */
export async function addSubCategory(
  subCategory: GameSubCategory,
  tagIds: number[],
): Promise<boolean> {
  try {
    const { categoryId } = subCategory;

    // 1. 서브카테고리 저장
    const { data, error } = await supabase.from('subcategories').insert(subCategory).select();
    if (error) throw error;

    const subcategoryId = data[0]?.id;

    // 2. subcategory_tags 연결
    const tagMappings = tagIds.map((tagId) => ({
      subcategoryId,
      tagId,
    }));

    const { error: mappingError } = await supabase.from('subcategory_tags').insert(tagMappings);
    if (mappingError) throw mappingError;

    return true;
  } catch (error: unknown) {
    throw error;
  }
}
