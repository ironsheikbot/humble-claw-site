import { motion } from 'framer-motion';

export default function GenerateButton({ onClick, disabled, loading }) {
  return (
    <motion.button
      className={`generate-btn ${disabled ? 'generate-btn-disabled' : ''} ${loading ? 'generate-btn-loading' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
    >
      {loading ? (
        <span className="generate-btn-loading-content">
          <span className="generate-spinner"></span>
          <span className="generate-loading-text">Summoning roasters...</span>
        </span>
      ) : (
        <span className="generate-btn-content">
          🔥 ROAST THEM
        </span>
      )}
    </motion.button>
  );
}
