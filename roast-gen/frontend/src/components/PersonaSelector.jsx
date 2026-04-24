import { useState } from 'react';
import { motion } from 'framer-motion';
import { personas } from '../api/personas';

function PersonaCard({ persona, isSelected, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`persona-card ${isSelected ? 'persona-card-selected' : ''}`}
    >
      <div className="persona-card-icon">{persona.icon}</div>
      <div className="persona-card-name">{persona.name}</div>
    </motion.div>
  );
}

function PersonaColumn({ title, personas, selected, onSelect, max = 1 }) {
  const [filter, setFilter] = useState('');
  
  const filtered = personas.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()))
  );
  
  return (
    <div className="persona-column">
      <h3 className="persona-column-title">
        {title}
        {max > 1 && <span className="persona-column-hint">(pick up to {max})</span>}
      </h3>
      <input
        type="text"
        placeholder="Filter..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="persona-filter"
      />
      <div className="persona-grid">
        {filtered.map(persona => (
          <PersonaCard
            key={persona.slug}
            persona={persona}
            isSelected={
              max === 1 
                ? selected === persona.slug
                : selected.includes(persona.slug)
            }
            onClick={() => onSelect(persona.slug)}
          />
        ))}
      </div>
    </div>
  );
}

export default function PersonaSelector({ config, onChange }) {
  const { host, roasters, roastee } = config;
  
  const handleHostSelect = (slug) => {
    onChange({ ...config, host: config.host === slug ? null : slug });
  };
  
  const handleRoasterToggle = (slug) => {
    let newRoasters;
    if (roasters.includes(slug)) {
      newRoasters = roasters.filter(r => r !== slug);
    } else if (roasters.length < 5) {
      newRoasters = [...roasters, slug];
    } else {
      newRoasters = roasters;
    }
    onChange({ ...config, roasters: newRoasters });
  };
  
  const handleRoasteeSelect = (slug) => {
    onChange({ ...config, roastee: config.roastee === slug ? null : slug });
  };
  
  return (
    <motion.div 
      className="persona-selector"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="section-title">SELECT YOUR MATCHUP</h2>
      <div className="persona-columns">
        <PersonaColumn
          title="🎤 HOST"
          personas={personas}
          selected={host}
          onSelect={handleHostSelect}
          max={1}
        />
        <PersonaColumn
          title="👊 ROASTER(S)"
          personas={personas}
          selected={roasters}
          onSelect={handleRoasterToggle}
          max={5}
        />
        <PersonaColumn
          title="🎯 ROASFEE"
          personas={personas}
          selected={roastee}
          onSelect={handleRoasteeSelect}
          max={1}
        />
      </div>
      
      <button 
        className="surprise-btn"
        onClick={() => {
          const shuffled = [...personas].sort(() => Math.random() - 0.5);
          onChange({
            host: shuffled[0].slug,
            roasters: shuffled.slice(1, 3).map(p => p.slug),
            roastee: shuffled[3].slug
          });
        }}
      >
        🎲 Surprise Me
      </button>
    </motion.div>
  );
}
