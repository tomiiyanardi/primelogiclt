import React from 'react';

export default function ContactCardHorizontal({ icon, title, value, link, color, bgColor }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 md:gap-5 p-3 md:p-4 rounded-[1rem] md:rounded-[1.2rem] border border-white/5 hover:border-white/20 transition-all duration-300 bg-[#0A192F]/40 backdrop-blur-md hover:bg-[#0A192F]/80">
      <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 ${bgColor} ${color} rounded-full flex items-center justify-center md:group-hover:scale-110 shadow-sm transition-transform duration-300 relative z-10 border border-white/10 group-hover:shadow-[0_0_15px_currentColor]`}>
        {icon}
      </div>
      <div className="text-left overflow-hidden relative z-10">
        <h3 className="text-sm md:text-base font-black text-white mb-0.5 group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
        <span className={`text-[9px] md:text-[10px] font-black ${color} uppercase tracking-widest block truncate group-hover:translate-x-1 transition-transform duration-300 delay-75`}>{value}</span>
      </div>
    </a>
  );
}