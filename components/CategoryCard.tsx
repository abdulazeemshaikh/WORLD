import React from 'react';
import { motion } from 'framer-motion';
import { CategoryCardProps } from '../types';

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, label, description, className = '' }) => {
  return (
    <div className={`
      group relative flex flex-col justify-center
      w-full h-full p-3 xs:p-4 sm:p-5
      bg-gradient-to-br from-surface via-surface to-black/[0.01]
      dark:from-surface dark:via-surface dark:to-white/[0.02]
      rounded-xl xs:rounded-2xl sm:rounded-[1.5rem]
      border border-black/[0.05] dark:border-white/[0.07]
      shadow-[0_4px_32px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.02)]
      dark:shadow-[0_4px_32px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.1)]
      transition-all duration-500 ease-out
      cursor-default
      overflow-hidden
      ${className}
    `}>

      {/* Ambient background decoration */}
      <div className="absolute -top-8 -right-8 w-24 xs:w-28 sm:w-32 h-24 xs:h-28 sm:h-32 
        bg-gradient-to-br from-ink/[0.02] via-ink/[0.01] to-transparent 
        dark:from-white/[0.03] dark:via-white/[0.01] dark:to-transparent
        rounded-full blur-2xl opacity-60 pointer-events-none" 
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent dark:via-white/[0.1]" />

      <div className="relative z-10 flex flex-col gap-2 xs:gap-2.5">
        {/* Icon container */}
        <motion.div 
          className="
            inline-flex self-start
            p-2 xs:p-2.5
            rounded-lg xs:rounded-xl
            bg-gradient-to-br from-black/[0.03] to-black/[0.05]
            dark:from-white/[0.06] dark:to-white/[0.08]
            border border-black/[0.03] dark:border-white/[0.05]
            shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_2px_4px_rgba(0,0,0,0.02)]
            dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_2px_4px_rgba(0,0,0,0.2)]
            text-ink
          "
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          {React.isValidElement(icon) 
            ? React.cloneElement(icon as React.ReactElement, { 
                className: "w-4 h-4 xs:w-5 xs:h-5 stroke-[1.5]" 
              }) 
            : icon
          }
        </motion.div>

        {/* Text content */}
        <div className="space-y-1 xs:space-y-1.5">
          <motion.h3 
            className="
              font-sans text-base xs:text-lg sm:text-xl 
              font-medium text-ink 
              tracking-[-0.02em] 
              leading-tight
            "
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            {label}
          </motion.h3>
          
          <motion.p 
            className="
              text-xs xs:text-sm sm:text-[13px]
              text-subtle/70 
              leading-relaxed 
              font-light
              pr-2 xs:pr-4 sm:pr-8
              line-clamp-2
            "
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Bottom corner accent */}
      <div className="absolute bottom-0 right-0 w-16 h-16 
        bg-gradient-to-tl from-black/[0.02] to-transparent 
        dark:from-white/[0.02] dark:to-transparent
        rounded-tl-full opacity-50 pointer-events-none" 
      />
    </div>
  );
};

export default CategoryCard;
