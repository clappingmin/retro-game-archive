import { GameCategory } from '@/shared/types/game';
import { supabase } from '@/shared/utils/supabase/client';

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
