import { supabase } from '../../libs/supabase';
import { GameTag } from '../../types/game';
/**
 *
 * @param {string} newTag
 * @return {Promise<null>}
 */
export async function addGameTag(newTag: string): Promise<null> {
  try {
    const { error } = await supabase.from('tags').insert({ name: newTag });
    if (error) throw error;

    return null;
  } catch (error: unknown) {
    throw error;
  }
}

export async function getTags(): Promise<GameTag[]> {
  try {
    const { data, error } = await supabase.from('tags').select();
    if (error) throw error;

    return data as GameTag[];
  } catch (error: unknown) {
    throw error;
  }
}
