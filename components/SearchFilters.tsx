import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, X, Check } from 'lucide-react';

export interface FilterCategory {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SearchFiltersProps {
  categories: FilterCategory[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onClearAll?: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  categories, 
  selectedIds, 
  onToggle,
  onClearAll 
}) => {
  const hasSelections = selectedIds.length > 0;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Filter Pills Container */}
      <div 
        className="
          flex flex-wrap justify-center gap-1.5 xs:gap-2
          w-full max-w-2xl
        "
      >
        {categories.map((cat) => {
          const isSelected = selectedIds.includes(cat.id);
          const Icon = cat.icon;
          
          return (
            <motion.button
              key={cat.id}
              onClick={() => onToggle(cat.id)}
              whileTap={{ scale: 0.95 }}
              className={`
                relative flex items-center gap-1.5 xs:gap-2
                px-2.5 xs:px-3 py-1.5 xs:py-2
                rounded-full
                text-[11px] xs:text-xs font-medium
                transition-all duration-200 ease-out
                select-none cursor-pointer
                border
                ${isSelected 
                  ? 'bg-ink text-paper border-ink dark:bg-white dark:text-black dark:border-white shadow-sm' 
                  : 'bg-paper text-subtle border-black/[0.08] dark:border-white/[0.1] hover:border-black/[0.15] dark:hover:border-white/[0.2] hover:text-ink'
                }
              `}
            >
              {/* Icon */}
              <Icon 
                className={`
                  w-3 h-3 xs:w-3.5 xs:h-3.5
                  transition-all duration-200
                  ${isSelected ? 'stroke-[2]' : 'stroke-[1.5]'}
                `}
                aria-hidden="true"
              />
              
              {/* Label */}
              <span className="whitespace-nowrap">
                {cat.label}
              </span>

              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </motion.div>
              )}
            </motion.button>
          );
        })}

        {/* Clear All Button */}
        {hasSelections && onClearAll && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={onClearAll}
            className="
              flex items-center gap-1
              px-2 py-1.5
              rounded-full
              text-[10px] xs:text-[11px] font-medium
              text-subtle/60 hover:text-subtle
              transition-colors duration-200
              select-none cursor-pointer
            "
          >
            <X className="w-3 h-3 stroke-[2]" />
            <span>Clear</span>
          </motion.button>
        )}
      </div>

      {/* Active filter count indicator */}
      {hasSelections && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-[10px] text-subtle/50 font-medium tracking-wide"
        >
          {selectedIds.length} filter{selectedIds.length !== 1 ? 's' : ''} active
        </motion.div>
      )}
    </div>
  );
};

export default SearchFilters;
