import React from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

const whatsappUrl = 'https://wa.me/5492612533823?text=Hola%20Primelogic%20LT%2C%20quiero%20hablar%20sobre%20un%20proyecto.';

const WhatsAppButton = () => {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp a Primelogic LT"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-[#07111d] p-1.5 pr-2 text-white shadow-[0_12px_32px_rgba(7,17,29,0.28)] transition-all duration-300 hover:-translate-y-1 hover:pr-3 hover:shadow-[0_16px_38px_rgba(7,17,29,0.34)] active:pr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4 focus-visible:ring-offset-white sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-brand-blue/20 motion-safe:animate-pulse" aria-hidden="true" />
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
        <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110" aria-hidden="true" />
        <span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#07111d] bg-emerald-400" aria-hidden="true" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-left text-sm font-bold tracking-[-0.01em] opacity-0 transition-all duration-300 group-hover:max-w-48 group-hover:opacity-100 group-active:max-w-48 group-active:opacity-100 group-focus-visible:max-w-48 group-focus-visible:opacity-100">
        Hablemos de tu proyecto
      </span>
      <ArrowUpRight className="h-4 w-0 shrink-0 text-white/60 opacity-0 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100 group-active:h-4 group-active:w-4 group-active:opacity-100 group-focus-visible:h-4 group-focus-visible:w-4 group-focus-visible:opacity-100" aria-hidden="true" />
    </a>
  );
};

export default WhatsAppButton;