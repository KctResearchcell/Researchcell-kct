import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';

interface EcosystemBlockProps {
  title: string;
  description: string;
  iconName: string;
  onClick: () => void;
}

export default function EcosystemBlock({
  title,
  description,
  iconName,
  onClick
}: EcosystemBlockProps) {
  // Dynamically resolve icon from list
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;

  return (
    <motion.div
      onClick={onClick}
      className="group relative flex flex-col items-start cursor-pointer transition-all duration-300 ease-in-out select-none"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Horizontally aligned Row structure: [ Icon ] Title */}
      <div className="flex items-center gap-5 w-full mb-3">
        {/* Exact Google Research White Rounded Icon Container */}
        <div className="h-16 w-16 rounded-[20px] border border-[#E5E7EB] bg-white flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-in-out group-hover:border-[#4285F4] group-hover:shadow-[0_4px_20px_rgba(66,133,244,0.06)]">
          <IconComponent className="h-[26px] w-[26px] text-[#4285F4] stroke-[1.5]" />
        </div>
        
        {/* Title exactly as specified */}
        <h3 className="font-display text-[24px] font-medium text-[#202124] transition-colors duration-300 group-hover:text-[#4285F4]">
          {title}
        </h3>
      </div>

      {/* Description below Title */}
      <p className="font-sans text-[18px] font-normal leading-[1.6] text-[#5F6368] max-w-[320px] pl-[1px]">
        {description}
      </p>
    </motion.div>
  );
}
