import GameCard from '@/components/global/GameCard';
import * as api from '@/shared/services/app/game';

export default async function Home() {
  const recommendedGames = await api.getRecommendedGames();
  const recetGames = await api.getRecentGames();

  return (
    <div>
      {/* 최근 게임 */}
      <div>최근 게임</div>
      <div className="list">
        {recetGames.map((game) => (
          <GameCard game={game} key={`recent-game-${game.id}`} />
        ))}
      </div>
      {/* 추천 게임 */}
      <div>추천 게임</div>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,1fr))] gap-4">
        {recommendedGames.map((game) => (
          <GameCard game={game} key={`recommended-game-${game.id}`} />
        ))}
      </div>
    </div>
  );
}
