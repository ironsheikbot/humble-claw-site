'use client';

import { useState } from 'react';
import { personas, Persona } from '@/lib/personas';
import CharacterCard from '@/components/CharacterCard';
import ProfanitySlider from '@/components/ProfanitySlider';
import RoastOutput from '@/components/RoastOutput';

export default function Home() {
  const [host, setHost] = useState<string>('darth-vader');
  const [roasters, setRoasters] = useState<string[]>(['hulk-hogan']);
  const [roastee, setRoastee] = useState<string>('ric-flair');
  const [profanity, setProfanity] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [roastScript, setRoastScript] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);

  const toggleRoaster = (slug: string) => {
    setRoasters(prev => {
      if (prev.includes(slug)) {
        return prev.filter(r => r !== slug);
      }
      if (prev.length >= 5) return prev;
      return [...prev, slug];
    });
  };

  const surpriseMe = () => {
    if (personas.length < 3) return;
    const shuffled = [...personas].sort(() => Math.random() - 0.5);
    setHost(shuffled[0].slug);
    setRoasters(shuffled.slice(1, Math.min(4, shuffled.length)).map(p => p.slug));
    setRoastee(shuffled[Math.min(4, shuffled.length - 1)].slug);
  };

  const handleGenerate = async () => {
    if (!host || roasters.length === 0 || !roastee) {
      alert('Please select a Host, at least one Roaster, and a Roastee!');
      return;
    }

    setIsGenerating(true);
    setHasGenerated(true);
    setRoastScript('');

    try {
      const response = await fetch('/api/generate-roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host, roasters, roastee, profanity }),
      });

      const data = await response.json();
      setRoastScript(data.script || data.error || 'Failed to generate roast. Please try again.');
    } catch {
      setRoastScript('Failed to connect to server. Please try again.');
    }

    setIsGenerating(false);
  };

  const canGenerate = host && roasters.length > 0 && roastee;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-black text-white">
      {/* Header */}
      <header className="py-8 text-center border-b border-amber-500/20">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent">
          HUMBLE CLAW ROAST GENERATOR
        </h1>
        <p className="mt-2 text-zinc-400">Pick your fighters. Set the heat. Get roasted.</p>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Character Selection */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-amber-400">STEP 1: BUILD YOUR MATCHUP</h2>
            <button
              onClick={surpriseMe}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              SURPRISE ME
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Host Column */}
            <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
              <h3 className="text-lg font-bold text-amber-300 mb-4 text-center">HOST / MC</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {personas.map(persona => (
                  <CharacterCard
                    key={persona.slug}
                    persona={persona}
                    isSelected={host === persona.slug}
                    onClick={() => setHost(persona.slug)}
                  />
                ))}
              </div>
            </div>

            {/* Roasters Column */}
            <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
              <h3 className="text-lg font-bold text-amber-300 mb-4 text-center">ROASTERS (1-5)</h3>
              <p className="text-xs text-zinc-500 mb-3 text-center">Click to add/remove</p>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {personas.map(persona => (
                  <CharacterCard
                    key={persona.slug}
                    persona={persona}
                    isSelected={roasters.includes(persona.slug)}
                    onClick={() => toggleRoaster(persona.slug)}
                  />
                ))}
              </div>
              {roasters.length > 0 && (
                <div className="mt-3 text-sm text-amber-400 text-center">
                  {roasters.length} roaster{roasters.length > 1 ? 's' : ''} selected
                </div>
              )}
            </div>

            {/* Roastee Column */}
            <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
              <h3 className="text-lg font-bold text-amber-300 mb-4 text-center">ROASTEE</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {personas.map(persona => (
                  <CharacterCard
                    key={persona.slug}
                    persona={persona}
                    isSelected={roastee === persona.slug}
                    onClick={() => setRoastee(persona.slug)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Settings */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">STEP 2: SETTINGS</h2>
          <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
            <ProfanitySlider value={profanity} onChange={setProfanity} />
          </div>
        </section>

        {/* Generate Button */}
        <section className="mb-8 text-center">
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className={`px-12 py-6 text-2xl font-bold rounded-2xl transition-all transform ${
              canGenerate && !isGenerating
                ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-black hover:scale-105 shadow-lg shadow-amber-500/50'
                : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
            }`}
          >
            {isGenerating ? 'SUMMONING ROASTERS...' : 'ROAST THEM!'}
          </button>
        </section>

        {/* Output */}
        {hasGenerated && (
          <section>
            <RoastOutput script={roastScript} isLoading={isGenerating} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-zinc-500 border-t border-zinc-800 mt-8">
        <p>Humble Claw Roast Generator - Where legends get humbled</p>
      </footer>
    </div>
  );
}