import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface ProductKitAccordionProps {
  count: number;
  title?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function getKitPositionWord(count: number, language: string = 'ua'): string {
  if (language !== 'ua') {
    return count === 1 ? 'ITEM' : 'ITEMS';
  }
  const mod100 = Math.abs(count) % 100;
  const mod10 = Math.abs(count) % 10;
  if (mod100 >= 11 && mod100 <= 19) {
    return 'ПОЗИЦІЙ';
  }
  if (mod10 === 1) {
    return 'ПОЗИЦІЯ';
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return 'ПОЗИЦІЇ';
  }
  return 'ПОЗИЦІЙ';
}

export function ProductKitAccordion({
  count,
  title,
  isOpen: controlledIsOpen,
  onToggle,
  defaultOpen = false,
  className = "pt-2",
  children
}: ProductKitAccordionProps) {
  const { language } = useLanguage();
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const displayTitle = title || (language === 'ua' ? 'КОМПЛЕКТАЦІЯ' : 'DELIVERY SET');
  const badgeWord = getKitPositionWord(count, language);

  return (
    <div className={className}>
      <button 
        type="button"
        onClick={handleToggle}
        className="w-full flex items-center justify-between bg-white border border-metallic-silver/20 p-3 rounded-sm hover:border-primary-blue/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy">
            {displayTitle}
          </h5>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-primary-blue/10 text-primary-blue rounded-sm">
            {count} {badgeWord}
          </span>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-primary-blue transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 px-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
