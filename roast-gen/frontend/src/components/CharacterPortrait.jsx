import { motion } from 'framer-motion';

export default function CharacterPortrait({ character, size = 'medium' }) {
  return (
    <motion.div 
      className={`character-portrait character-portrait-${size}`}
      whileHover={{ scale: 1.05 }}
    >
      <div className="character-portrait-frame">
        <div className="character-portrait-icon">{character?.icon || '👤'}</div>
        <div className="character-portrait-name">{character?.name || 'Unknown'}</div>
        <div className="character-portrait-role">
          {character?.role || 'roaster'}
        </div>
      </div>
    </motion.div>
  );
}

export function PortraitGrid({ characters }) {
  return (
    <motion.div 
      className="portrait-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="portrait-grid-title">Character Portraits</h3>
      <div className="portrait-grid-items">
        {characters.map((char, idx) => (
          <CharacterPortrait 
            key={char.slug + idx} 
            character={char} 
            size="small"
          />
        ))}
      </div>
      <p className="portrait-grid-note">
        AI portraits coming in Phase 2
      </p>
    </motion.div>
  );
}
