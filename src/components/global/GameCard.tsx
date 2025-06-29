import { Game } from '@/shared/types/game';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="card bg-base-100 w-full shadow-sm">
      <figure className="aspect-[4/3]">
        <img src={game.thumbnailUrl} alt={game.name} className="h-full w-full object-cover" />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title font-medium">{game.name}</h2>

        <div className="card-actions justify-between">
          <div className="badge badge-soft badge-primary">{game.company}</div>
          <div className="flex items-center gap-1">
            <span className="material-icons-outlined text-primary">visibility</span>
            <div className="leading-[100%]">{game.viewCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
