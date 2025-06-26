import { createAuthedClient, supabase } from '@/shared/utils/supabase/client';
import {
  Game,
  GameBase,
  GameCategory,
  GameStorageData,
  GameTag,
  GameType,
} from '@/shared/types/game';
import { v4 as uuidv4 } from 'uuid';
import { getSession } from '../app/auth';
import { redirect } from 'next/navigation';

/**
 * 게임 태그 추가
 * @param {string} newTag
 * @returns {Promise<number>}
 */
export async function addGameTag(newTag: string): Promise<number> {
  try {
    const { data, error } = await supabase.from('tags').insert({ name: newTag }).select();
    if (error) throw error;

    const tagId: number = data[0].id;

    return tagId;
  } catch (error: unknown) {
    throw error;
  }
}

/**
 *  디비 태그 가져오기
 * @returns {Promise<GameTag[]>}
 */
export async function getTags(): Promise<GameTag[]> {
  try {
    const { data, error } = await supabase.from('tags').select();
    if (error) throw error;

    return data as GameTag[];
  } catch (error: unknown) {
    throw error;
  }
}

/**
 * 새 게임 추가
 * @param {GameBase} newGame
 * @param {GameStorageData} storageData
 * @param {number[]} tags
 * @returns
 */
export async function addNewGame(
  newGame: GameBase,
  storageData: GameStorageData,
  tagIds: number[],
): Promise<Game> {
  try {
    const gameId = uuidv4();
    const { gameType } = newGame;
    const { thumbnail, gameFile } = storageData;

    // 1. 스토리지 파일 업로드
    const thumbnailUrl = await uploadGameThumbnail(gameId, gameType, thumbnail);
    const gameFileUrl = await uploadGameFile(gameId, gameType, gameFile);

    // 2. 게임 저장
    const updateGame: Game = { ...newGame, gameId, gameFileUrl, thumbnailUrl };
    const { error } = await supabase.from('games').insert(updateGame);
    if (error) throw error;

    // 3.게임 태그 저장
    // 2. games_tags에 연결
    const tagMappings = tagIds.map((tagId) => ({
      gameId,
      tagId,
    }));
    const { error: mappingError } = await supabase.from('game_tags').insert(tagMappings);
    if (mappingError) throw mappingError;

    return updateGame;
  } catch (error: unknown) {
    throw error;
  }
}

/**
 * 썸네일 업로드 후 주소 받아오기
 * @param gameId
 * @param gameType
 * @param thumbnail
 * @returns
 */
export async function uploadGameThumbnail(
  gameId: string,
  gameType: GameType,
  thumbnail: File,
): Promise<string> {
  try {
    const ext = thumbnail.name.split('.').pop();
    const filename = `thumbnail-${gameId}.${ext}`;
    const path = `${gameType}/${filename}`;

    const session = await getSession();
    if (!session) redirect('/auth/login');

    const supabaseWithToken = createAuthedClient(session.access_token);

    const { error } = await supabaseWithToken.storage
      .from('game-thumbnails')
      .upload(path, thumbnail, { upsert: true });

    if (error) throw error;

    const { data: publicUrlData } = supabaseWithToken.storage
      .from('game-thumbnails')
      .getPublicUrl(path);

    return publicUrlData.publicUrl;
  } catch (error) {
    throw error;
  }
}

/**
 * 게임 파일 업로드 후 주소 받아오기
 * @param gameId
 * @param gameType
 * @param gameFile
 * @returns
 */
export async function uploadGameFile(
  gameId: string,
  gameType: GameType,
  gameFile: File,
): Promise<string> {
  try {
    const ext = gameFile.name.split('.').pop();
    const filename = `file-${gameId}.${ext}`;
    const path = `${gameType}/${filename}`;

    const session = await getSession();

    if (!session) redirect('/auth/login');

    const supabaseWithToken = createAuthedClient(session.access_token);

    const { error } = await supabaseWithToken.storage
      .from('game-files')
      .upload(path, gameFile, { upsert: true });

    if (error) throw error;

    const { data: publicUrlData } = supabaseWithToken.storage.from('game-files').getPublicUrl(path);

    return publicUrlData.publicUrl;
  } catch (error) {
    throw error;
  }
}

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
      category_id: categoryId,
      tag_id: tagId,
    }));

    const { error: mappingError } = await supabase.from('categories_tags').insert(tagMappings);
    if (mappingError) throw mappingError;

    return categoryData;
  } catch (error: unknown) {
    throw error;
  }
}
