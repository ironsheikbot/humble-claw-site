'use client';

import { useState } from 'react';

interface RoastOutputProps {
  script: string;
  isLoading: boolean;
}

export default function RoastOutput({ script, isLoading }: RoastOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (isLoading) {
    const loadingMessages = [
      'Writing punchlines...',
      'Rehearsing camel clutch...',
      'Calling Hulk Hogan for backup...',
      'Adjusting crown...',
      'Generating burns...',
    ];
    const randomMsg = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    
    return (
      <div className="bg-zinc-800/50 rounded-xl p-12 border border-zinc-700 text-center">
        <div className="text-6xl mb-4 animate-spin">🔥</div>
        <p className="text-xl text-amber-400 font-bold">{randomMsg}</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800/50 rounded-xl border border-amber-500/30 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 px-6 py-4 border-b border-amber-500/20 flex justify-between items-center">
        <h3 className="text-xl font-bold text-amber-400">🔥 YOUR ROAST IS READY 🔥</h3>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-amber-500 text-black hover:bg-amber-400'
          }`}
        >
          {copied ? '✓ Copied!' : '📋 Copy Script'}
        </button>
      </div>
      
      {/* Script Content */}
      <div className="p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap text-zinc-200 max-h-96 overflow-y-auto">
        {script}
      </div>
      
      {/* Actions */}
      <div className="px-6 py-4 bg-zinc-900/50 border-t border-zinc-700 flex gap-4 flex-wrap">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-amber-500 text-black rounded-lg font-semibold hover:bg-amber-400 transition-all"
        >
          📋 Copy to Clipboard
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-zinc-700 text-white rounded-lg font-semibold hover:bg-zinc-600 transition-all"
        >
          🔄 Roast Again
        </button>
      </div>
    </div>
  );
}