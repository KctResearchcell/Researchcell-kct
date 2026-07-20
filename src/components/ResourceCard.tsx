import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';

interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  accentColor?: 'blue' | 'green' | 'yellow' | 'red' | 'neutral';
  onClick: () => void;
}

export default function ResourceCard({
  id,
  title,
  description,
  iconName,
  badge,
  accentColor = 'blue',
  onClick
}: ResourceCardProps) {
  // Dynamically resolve icon from list
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;

  // Map accents to styling matching Google's premium flat palette
  const colorMap = {
    blue: {
      text: 'text-[#1A73E8]',
      iconBg: 'bg-[#1A73E8]/5 text-[#1A73E8]',
      borderHover: 'hover:border-[#1A73E8]/40 hover:shadow-lg hover:shadow-blue-500/[0.04]',
      iconBorder: 'group-hover:border-[#1A73E8]/20'
    },
    green: {
      text: 'text-[#34A853]',
      iconBg: 'bg-[#34A853]/5 text-[#34A853]',
      borderHover: 'hover:border-[#34A853]/40 hover:shadow-lg hover:shadow-green-500/[0.04]',
      iconBorder: 'group-hover:border-[#34A853]/20'
    },
    yellow: {
      text: 'text-[#FBBC05]',
      iconBg: 'bg-[#FBBC05]/5 text-[#FBBC05]',
      borderHover: 'hover:border-[#FBBC05]/40 hover:shadow-lg hover:shadow-yellow-500/[0.04]',
      iconBorder: 'group-hover:border-[#FBBC05]/20'
    },
    red: {
      text: 'text-[#EA4335]',
      iconBg: 'bg-[#EA4335]/5 text-[#EA4335]',
      borderHover: 'hover:border-[#EA4335]/40 hover:shadow-lg hover:shadow-red-500/[0.04]',
      iconBorder: 'group-hover:border-[#EA4335]/20'
    },
    neutral: {
      text: 'text-gray-900',
      iconBg: 'bg-gray-50 text-gray-700',
      borderHover: 'hover:border-gray-300 hover:shadow-lg hover:shadow-gray-500/[0.04]',
      iconBorder: 'group-hover:border-gray-200'
    }
  };

  const colors = colorMap[accentColor] || colorMap.blue;

  return (
    <motion.div
      onClick={onClick}
      className={`group relative flex flex-row items-start gap-5 sm:gap-6 rounded-[28px] border border-[#DADCE0] bg-white p-6 sm:p-7 transition-all duration-300 cursor-pointer ${colors.borderHover}`}
      whileHover={{ y: -3 }}
      id={`card-${id}`}
    >
      {/* Icon Frame - exact replica of the spacious rounded design in screenshot 2 */}
      <div className={`h-14 w-14 sm:h-16 sm:w-16 rounded-[20px] sm:rounded-[24px] border border-gray-100 flex items-center justify-center bg-white flex-shrink-0 shadow-sm transition-all duration-300 ${colors.iconBg} ${colors.iconBorder}`}>
        <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 stroke-[1.75]" />
      </div>

      {/* Text Area */}
      <div className="space-y-1 sm:space-y-1.5 flex-1 select-none pr-1">
        <div className="flex items-center gap-2">
          <h3 className={`font-display text-[17px] sm:text-[19px] font-bold text-gray-900 leading-snug group-hover:${colors.text} transition-colors flex items-center gap-1`}>
            {title}
          </h3>
          {badge && (
            <span className={`rounded-full px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider ${colors.iconBg}`}>
              {badge}
            </span>
          )}
        </div>
        
        <p className="font-sans text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#5F6368] font-light">
          {description}
        </p>

        {/* Action slide-right indicator */}
        <div className="pt-1.5 flex items-center space-x-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 text-gray-400 group-hover:translate-x-1">
          <span className="font-sans text-[11px] uppercase tracking-wider">Explore Gateway</span>
          <Icons.ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </motion.div>
  );
}
