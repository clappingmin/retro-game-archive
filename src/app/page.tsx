import GameCard from '@/components/global/GameCard';
import * as api from '@/shared/services/app/game';

export default async function Home() {
  const recommendedGames = await api.getRecommendedGames();
  const recetGames = await api.getRecentGames();

  console.log(recetGames);

  return (
    <div>
      {/* 최근 게임 */}
      <div></div>
      {/* 추천 게임 */}
      <div>추천 게임</div>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,1fr))] gap-4">
        {recommendedGames.map((game) => (
          <GameCard game={game} />
        ))}
        {recommendedGames.map((game) => (
          <GameCard game={game} />
        ))}
        {recommendedGames.map((game) => (
          <GameCard game={game} />
        ))}
        {recommendedGames.map((game) => (
          <GameCard game={game} />
        ))}
      </div>
    </div>
  );
}
