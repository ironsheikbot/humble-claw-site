import { Persona } from '@/lib/personas';

interface CharacterCardProps {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
  showRoleBadge?: boolean;
}

export default function CharacterCard({ persona, isSelected, onClick }: CharacterCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg transition-all ${
        isSelected
          ? 'bg-gradient-to-r from-amber-500/30 to-yellow-500/30 border-2 border-amber-500 shadow-lg shadow-amber-500/20'
          : 'bg-zinc-700/50 border-2 border-transparent hover:border-zinc-500 hover:bg-zinc-700'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl font-bold">
          {persona.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm truncate">{persona.name}</p>
          <p className="text-xs text-zinc-400 truncate">{persona.personality}</p>
        </div>
        {isSelected && (
          <span className="text-amber-400 text-lg">✓</span>
        )}
      </div>
    </button>
  );
}