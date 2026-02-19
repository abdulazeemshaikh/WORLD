import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Check, LayoutGrid } from 'lucide-react';

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
          flex flex-wrap justify-center gap-1 xs:gap-1.5
          w-full max-w-xl
        "
      >
        {/* All Filter Button */}
        <motion.button
          onClick={onClearAll}
          whileTap={{ scale: 0.95 }}
          className={`
            relative flex items-center gap-1 xs:gap-1.5
            px-2 xs:px-2.5 py-1 xs:py-1.5
            rounded-full
            text-[10px] xs:text-[11px] font-medium
            transition-all duration-200 ease-out
            select-none cursor-pointer
            border
            ${!hasSelections 
              ? 'bg-ink text-paper border-ink dark:bg-white dark:text-black dark:border-white shadow-sm' 
              : 'bg-paper text-subtle border-black/[0.08] dark:border-white/[0.1] hover:border-black/[0.15] dark:hover:border-white/[0.2] hover:text-ink'
            }
          `}
        >
          <LayoutGrid 
            className={`
              w-2.5 h-2.5 xs:w-3 xs:h-3
              transition-all duration-200
              ${!hasSelections ? 'stroke-[2]' : 'stroke-[1.5]'}
            `}
            aria-hidden="true"
          />
          <span className="whitespace-nowrap">All</span>
          {!hasSelections && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <Check className="w-2.5 h-2.5 stroke-[2.5]" />
            </motion.div>
          )}
        </motion.button>

        {categories.map((cat) => {
          const isSelected = selectedIds.includes(cat.id);
          const Icon = cat.icon;
          
          return (
            <motion.button
              key={cat.id}
              onClick={() => onToggle(cat.id)}
              whileTap={{ scale: 0.95 }}
              className={`
                relative flex items-center gap-1 xs:gap-1.5
                px-2 xs:px-2.5 py-1 xs:py-1.5
                rounded-full
                text-[10px] xs:text-[11px] font-medium
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
                  w-2.5 h-2.5 xs:w-3 xs:h-3
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
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
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
