export type GameType = 'flash' | 'html5' | 'other';

// export type GameCategory =
//   | 'puzzle_board'
//   | 'fashion_style'
//   | 'shooting_arcade'
//   | 'tycoon_idle'
//   | 'user_created'
//   | 'sports_racing'
//   | 'adventure';

export interface GameBase {
  gameType: GameType; // 게임 타입
  name: string; // 게임 이름
  description: string; // 게임 설명
  viewCount: number; // 조회수
  isFeatured: boolean; // 추천 여부
  isActive: boolean; // 활성화 여부
  company: string; // 게임 회사
}

export interface GameStorageData {
  gameFile: File;
  thumbnail: File;
}

export interface Game extends GameBase {
  gameId: string;
  gameFileUrl: string; // 게임 파일 URL
  thumbnailUrl: string; // 썸네일 이미지 URL
  createdAt?: Date; // 생성일
  updatedAt?: Date; // 수정일
}

export interface GameTag {
  id: number;
  name: string;
}

export interface GameCategory {
  id?: number;
  slug: string; // 라우터에 들어갈 텍스트
  displayName: string;
}

// M:M 맵핑용 태그
export interface Category_tag {
  categoryId: number;
  tagId: number;
}
