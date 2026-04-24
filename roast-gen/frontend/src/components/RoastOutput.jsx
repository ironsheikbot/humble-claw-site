import { useState } from 'react';
import { motion } from 'framer-motion';

const LOADING_MESSAGES = [
  'Writing punchlines...',
  'Rehearsing camel clutch...',
  'Summoning the brain...',
  'Loading jabroni burns...',
  'Polishing the receipts...'
];

function LoadingState() {
  const [message] = useState(() => 
    LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]
  );
  
  return (
    <motion.div 
      className="roast-output-loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="roast-spinner">🔥</div>
      <p className="roast-loading-message">{message}</p>
    </motion.div>
  );
}

export default function RoastOutput({ script, loading, onRegenerate, onCopy, onShare }) {
  if (loading) return <LoadingState />;
  if (!script) return null;
  
  return (
    <motion.div 
      className="roast-output"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="roast-output-header">
        <h2 className="roast-output-title">🔥 THE ROAST 🔥</h2>
      </div>
      
      <div className="roast-script">
        <pre className="roast-script-text">{script}</pre>
      </div>
      
      <div className="roast-actions">
        <button className="roast-action-btn roast-action-copy" onClick={onCopy}>
          📋 Copy to Clipboard
        </button>
        <button className="roast-action-btn roast-action-share" onClick={onShare}>
          🔗 Share Link
        </button>
        <button className="roast-action-btn roast-action-regen" onClick={onRegenerate}>
          🔄 Roast Again
        </button>
      </div>
    </motion.div>
  );
}
