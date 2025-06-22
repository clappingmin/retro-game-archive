import { Timestamp } from 'firebase/firestore';

export type GameType = 'flash' | 'html5' | 'other';

export interface GameBase {
  gameId: string;
  gameType: GameType; // 게임 타입
  tags: string[]; // 게임 태그
  name: string; // 게임 이름
  description: string; // 게임 설명
  viewCount: number; // 조회수
  isFeatured: boolean; // 추천 여부
  thumbnailUrl: string; // 썸네일 이미지 URL
  isActive: boolean; // 활성화 여부
  createdAt: Timestamp; // 생성일
  updatedAt: Timestamp; // 수정일
}

export interface GameFormData extends GameBase {
  gameFile: File;
}

export interface Game extends GameBase {
  gameFileUrl: string; // 게임 파일 URL
}
