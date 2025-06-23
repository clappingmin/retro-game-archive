export type GameType = 'flash' | 'html5' | 'other';

export interface GameBase {
  gameType: GameType; // 게임 타입
  tags: string[]; // 게임 태그
  name: string; // 게임 이름
  description: string; // 게임 설명
  viewCount: number; // 조회수
  isFeatured: boolean; // 추천 여부
  thumbnailUrl: string; // 썸네일 이미지 URL
  isActive: boolean; // 활성화 여부
  company: string; // 게임 회사
}

export interface GameFormData extends GameBase {
  gameFile: File;
}

export interface Game extends GameBase {
  gameId: string;
  gameFileUrl: string; // 게임 파일 URL
  createdAt: Date; // 생성일
  updatedAt: Date; // 수정일
}
