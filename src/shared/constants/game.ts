import { GameCategory } from '../types/game';

export const GAME_TYPE_RADIO_ITEMS = [
  { value: 'flash', label: '플래시 게임' },
  { value: 'html5', label: 'HTML5 게임' },
  { value: 'other', label: '기타 게임' },
];

export const GAME_CATEGORY_KOREAN: Record<GameCategory, string> = {
  puzzle_board: '퍼즐/보드',
  fashion_style: '패션/스타일',
  shooting_arcade: '슈팅/아케이드',
  tycoon_idle: '타이쿤/키우기',
  user_created: '자작게임',
  sports_racing: '스포츠/레이싱',
  adventure: '어드벤처',
};
