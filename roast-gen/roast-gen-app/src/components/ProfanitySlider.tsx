interface ProfanitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const profanityLabels = ['Kid-Friendly', 'Light', 'Moderate', 'Strong', 'R-Rated'];
const profanityColors = ['bg-green-500', 'bg-lime-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-600'];

export default function ProfanitySlider({ value, onChange }: ProfanitySliderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <span className="text-zinc-400 font-semibold whitespace-nowrap">Kid-Friendly</span>
      
      <div className="flex-1 flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => onChange(level)}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
              value === level
                ? `${profanityColors[level - 1]} text-black scale-110 shadow-lg`
                : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
      
      <span className="text-red-400 font-semibold whitespace-nowrap">R-Rated</span>
      
      <div className="ml-4 px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-600">
        <span className="text-sm text-zinc-400">Level: </span>
        <span className={`font-bold ${value <= 2 ? 'text-green-400' : value <= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
          {value} — {profanityLabels[value - 1]}
        </span>
      </div>
    </div>
  );
}