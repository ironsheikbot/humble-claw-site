import { motion } from 'framer-motion';

const LEVELS = [
  { value: 1, label: 'Kid-Friendly', color: '#4ade80' },
  { value: 2, label: 'Light Teasing', color: '#a3e635' },
  { value: 3, label: 'Moderate Burns', color: '#facc15' },
  { value: 4, label: 'Strong Burns', color: '#fb923c' },
  { value: 5, label: 'R-Rated', color: '#ef4444' }
];

export default function ProfanitySlider({ value, onChange }) {
  const currentLevel = LEVELS.find(l => l.value === value) || LEVELS[2];
  
  return (
    <motion.div 
      className="profanity-slider"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="profanity-header">
        <h3 className="profanity-label">PROFANITY LEVEL</h3>
        <div 
          className="profanity-value"
          style={{ color: currentLevel.color }}
        >
          {value}
        </div>
      </div>
      
      <div className="slider-container">
        <span className="slider-label-left">Kid-Friendly</span>
        <div className="slider-track">
          {[1, 2, 3, 4, 5].map(level => (
            <button
              key={level}
              className={`slider-dot ${value >= level ? 'slider-dot-active' : ''}`}
              style={{ 
                backgroundColor: value >= level ? LEVELS[level - 1].color : '#333'
              }}
              onClick={() => onChange(level)}
            />
          ))}
          <motion.div 
            className="slider-fill"
            initial={{ width: 0 }}
            animate={{ width: `${((value - 1) / 4) * 100}%` }}
            style={{ backgroundColor: currentLevel.color }}
          />
        </div>
        <span className="slider-label-right">R-Rated</span>
      </div>
      
      <div className="profanity-description" style={{ color: currentLevel.color }}>
        {currentLevel.label}
      </div>
      
      <div className="portrait-toggle">
        <label className="toggle-label">
          <input
            type="checkbox"
            className="toggle-checkbox"
            defaultChecked={true}
          />
          <span className="toggle-switch"></span>
          <span className="toggle-text">Generate character portraits</span>
        </label>
      </div>
    </motion.div>
  );
}
