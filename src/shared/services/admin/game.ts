import { createAuthedClient, supabase } from '@/shared/utils/supabase/client';
import { Game, GameBase, GameStorageData, GameType } from '@/shared/types/game';
import { v4 as uuidv4 } from 'uuid';
import { getSession } from '../app/auth';
import { redirect } from 'next/navigation';

/**
 * 새 게임 추가
 * @param {GameBase} newGame
 * @param {GameStorageData} storageData
 * @returns
 */
export async function addNewGame(
  newGame: GameBase,
  storageData: GameStorageData,
  categoryInfo: { categoryIds: number[]; subcategoryIds: number[] },
): Promise<Game> {
  try {
    const id = uuidv4();
    const { gameType } = newGame;
    const { thumbnail, gameFile } = storageData;
    const { categoryIds, subcategoryIds } = categoryInfo;

    // 1. 스토리지 파일 업로드
    const thumbnailUrl = await uploadGameThumbnail(id, gameType, thumbnail);
    const gameFileUrl = await uploadGameFile(id, gameType, gameFile);

    // 2. 게임 저장
    const updateGame: Game = { ...newGame, id, gameFileUrl, thumbnailUrl };
    const { error } = await supabase.from('games').insert(updateGame);
    if (error) throw error;

    // 3. 게임 카테고리 정보 저장
    const categoryMappings = categoryIds.map((categoryId) => ({
      gameId: id,
      categoryId,
    }));

    const { error: categoryMappingError } = await supabase
      .from('game_categories')
      .insert(categoryMappings);

    if (categoryMappingError) throw categoryMappingError;

    // 4. 게임 서브카테고리 정보 저장
    const subcategoryMappings = subcategoryIds.map((subcategoryId) => ({
      gameId: id,
      subcategoryId,
    }));

    const { error: subcategoryMappingError } = await supabase
      .from('game_subcategories')
      .insert(subcategoryMappings);

    if (subcategoryMappingError) throw subcategoryMappingError;

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
