import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface CategoryToggleProps {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const CategoryToggle: React.FC<CategoryToggleProps> = ({ categories, selectedId, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedIndex = categories.findIndex(c => c.id === selectedId);

  // Auto-scroll selected item into view on mobile
  useEffect(() => {
    if (containerRef.current && selectedIndex !== -1) {
      const container = containerRef.current;
      const buttons = container.querySelectorAll('button');
      const selectedButton = buttons[selectedIndex];
      if (selectedButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = selectedButton.getBoundingClientRect();
        const scrollLeft = buttonRect.left - containerRect.left - (containerRect.width / 2) + (buttonRect.width / 2) + container.scrollLeft;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="flex justify-center w-full mb-3 xs:mb-4 sm:mb-5 px-3 xs:px-0">
      <div 
        ref={containerRef}
        className="
          relative flex w-full max-w-[280px] xs:max-w-sm sm:max-w-xl items-center 
          p-0.5 xs:p-1 sm:p-1.5 gap-0.5 xs:gap-0.5 sm:gap-1
          bg-gradient-to-b from-black/[0.02] to-black/[0.04] 
          dark:from-white/[0.03] dark:to-white/[0.05]
          rounded-xl sm:rounded-full 
          border border-black/[0.06] dark:border-white/[0.06]
          shadow-[inset_0_1px_2px_rgba(0,0,0,0.02),0_1px_0_rgba(255,255,255,0.6)]
          dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.02)]
          overflow-x-auto scrollbar-hide
          snap-x snap-mandatory
          backdrop-blur-sm
        " 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat, index) => {
          const isSelected = selectedId === cat.id;
          const isAdjacent = Math.abs(index - selectedIndex) === 1;
          
          return (
            <motion.button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              whileTap={{ scale: 0.96 }}
              className={`
                relative z-10 flex-1 min-w-[38px] xs:min-w-[44px] sm:min-w-[60px] 
                flex flex-col items-center justify-center 
                py-1.5 xs:py-2 sm:py-2.5 px-1 xs:px-1.5 sm:px-2
                rounded-lg sm:rounded-full 
                transition-all duration-300 ease-out
                select-none cursor-pointer group
                snap-center
                ${isSelected 
                  ? 'text-ink' 
                  : isAdjacent 
                    ? 'text-subtle/60 hover:text-subtle/80' 
                    : 'text-subtle/40 hover:text-subtle/70'
                }
              `}
            >
              {isSelected && (
                <motion.div
                  layoutId="category-indicator"
                  className="
                    absolute inset-0 
                    bg-gradient-to-b from-white to-white/95 
                    dark:from-white/[0.12] dark:to-white/[0.08]
                    shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] 
                    dark:shadow-[0_2px_8px_rgba(0,0,0,0.4),0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]
                    rounded-lg sm:rounded-full 
                    border border-black/[0.05] dark:border-white/[0.06]
                  "
                  initial={false}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30,
                    mass: 0.8
                  }}
                />
              )}

              <motion.div 
                className="relative z-20 mb-0.5 xs:mb-1"
                animate={{ 
                  scale: isSelected ? 1.05 : 1,
                  y: isSelected ? -1 : 0
                }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <cat.icon 
                  className={`
                    w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-[18px] sm:h-[18px]
                    transition-all duration-300
                    ${isSelected 
                      ? 'stroke-[2] drop-shadow-sm' 
                      : 'stroke-[1.5] group-hover:stroke-[1.75]'
                    }
                  `} 
                  aria-hidden="true"
                />
              </motion.div>

              <motion.span 
                className={`
                  relative z-20 
                  text-[7px] xs:text-[8px] sm:text-[10px] 
                  tracking-wide leading-none 
                  transition-all duration-300 
                  whitespace-nowrap
                  ${isSelected 
                    ? 'font-semibold opacity-100' 
                    : 'font-medium opacity-70 group-hover:opacity-90'
                  }
                `}
                animate={{ 
                  y: isSelected ? 0 : 1,
                  letterSpacing: isSelected ? '0.02em' : '0.01em'
                }}
                transition={{ duration: 0.3 }}
              >
                {cat.label}
              </motion.span>

              {/* Hover glow effect */}
              {!isSelected && (
                <div className="
                  absolute inset-0 rounded-lg sm:rounded-full 
                  bg-black/[0.02] dark:bg-white/[0.03]
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-200
                  pointer-events-none
                " />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  );
};

export default CategoryToggle;
